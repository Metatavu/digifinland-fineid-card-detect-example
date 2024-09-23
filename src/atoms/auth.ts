import { atom } from "jotai";
import { KeycloakProfile, KeycloakTokenParsed } from "keycloak-js";

/**
 * Auth type
 */
export type Auth = {
  tokenRaw: string;
  logout: () => void;
  token: KeycloakTokenParsed;
};

/**
 * Auth source type
 */
export type AuthSource = "USERNAME" | "CARD";

/**
 * Auth atom
 * 
 * This atom is used to store the authentication information of the user.
 */
export const authAtom = atom<Auth | undefined>(undefined);

/**
 * User profile atom
 * 
 * This atom is used to store the user profile information.
 */
export const userProfileAtom = atom<KeycloakProfile | undefined>(undefined);