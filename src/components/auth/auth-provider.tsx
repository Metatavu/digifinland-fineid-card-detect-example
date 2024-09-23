import { ReactNode, useCallback, useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import { useAtom, useSetAtom } from "jotai";
import { authAtom, userProfileAtom } from "../../atoms/auth";
import config from "../../config";
import { useSearchParams } from "react-router-dom";
import AuthSourceSelect from "./auth-source-select";
import WaitFineIdCard from "../card/wait-fineid-card";

/**
 * Authentication provider component properties
 */
type Props = {
  children: ReactNode;
};

/**
 * Keycloak instance
 */
const keycloak = new Keycloak(config.auth);

/**
 * Authentication provider component.
 * 
 * The component initializes authentication and refreshes token when it expires.
 */
const AuthenticationProvider = ({ children }: Props) => {
  const [ auth, setAuth ] = useAtom(authAtom);
  const setUserProfile = useSetAtom(userProfileAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const [waitingForCard, setWaitingForCard] = useState(false);

  const authSource = searchParams.get("authSource");

  /**
   * Returns identity provider hint. If authentication source is card, returns "card" otherwise undefined.
   * 
   * @returns identity provider hint
   */
  const getIdpHint = () => {
    if (authSource === "CARD") return "card";
    return undefined;
  }

  /**
   * Updates authentication data.
   * 
   * Method is called when user logs in or when token is refreshed.
   */
  const updateAuthData = useCallback(() => {
    if (!(keycloak.tokenParsed && keycloak.token)) return;

    setAuth({
      token: keycloak.tokenParsed,
      tokenRaw: keycloak.token,
      logout: () => keycloak.logout({ redirectUri: `${window.location.origin}` }),
    });

    setUserProfile(keycloak.profile);
  }, [setAuth, setUserProfile]);

  /**
   * Clears authentication data.
   * 
   * Method is called when user logs out.
   */
  const clearAuthData = useCallback(() => {
    setAuth(undefined);
    setUserProfile(undefined);
  }, [setAuth, setUserProfile]);

  /**
   * Initializes authentication.
   * 
   * Method is called when component mounts.
   */
  const initAuth = useCallback(async () => {
    try {
      keycloak.onTokenExpired = () => keycloak.updateToken(5);

      keycloak.onAuthRefreshError = () => keycloak.login();
      keycloak.onAuthRefreshSuccess = () => updateAuthData();

      keycloak.onAuthError = (error) => console.error(error);
      keycloak.onAuthSuccess = async () => {
        try {
          await keycloak.loadUserProfile();
        } catch (error) {
          console.error("Could not load user profile", error);
          throw error;
        }

        updateAuthData();
      };

      keycloak.onAuthLogout = () => {
        clearAuthData();
        keycloak.login();
      };

      await keycloak.init({
        onLoad: "check-sso",
        checkLoginIframe: false,
        scope: "openid profile email"
      });

      if (!keycloak.authenticated) {
        await keycloak.login({ 
          idpHint: getIdpHint() 
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [clearAuthData, updateAuthData]);

  /**
   * Initializes authentication when component mounts.
   */
  useEffect(() => {
    if (authSource && !waitingForCard) {
      if (keycloak.authenticated === undefined) initAuth();
    }
  }, [ authSource, waitingForCard ]);

  if (!authSource) {
    return (
      <AuthSourceSelect onAuthSourceChange={ (authSource) => { 
        setWaitingForCard(authSource == "CARD");
        setSearchParams({ authSource }) 
      }} />
    );
  }

  if (waitingForCard) {
    return (
      <WaitFineIdCard onCardDetected={() => {
        setWaitingForCard(false);
      }} />
    );
  }

  if (!auth) return null;

  return children;
};

export default AuthenticationProvider;