import { Link, Outlet } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useAtom } from "jotai";
import { authAtom } from "../../atoms/auth";

/**
 * Basic layout component.
 */
const BasicLayout = () => {
  const [ auth ] = useAtom(authAtom);

  return (
    <div style={{
      backgroundColor: "#003d6d",
      color: "white",
      fontFamily: "Arial, sans-serif",
      minWidth: "100vw",
      minHeight: "100vh",
      margin: 0,
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{
        flex: 1,
        flexGrow: 0,
        display: "flex",
      }}>
        {auth ? (
          <div style={{ 
            flex: 1,
            textAlign: "left",
            paddingTop: 20,
            paddingLeft: 20
          }}>
            <a 
              style={{
                color: "white",
                cursor: "pointer",
                fontWeight: "bold"
                
              }}
              onClick={() => {
                auth.logout()
              }}
            >
              Kirjaudu ulos
            </a>
          </div>
        ) : null}
        
        <Link
          style={{
            flex: 1,
            textAlign: "right",
          }}
          to="/" 
        >
          <div 
            style={{
              flex: 1,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: 200,
              height: 64,
              display: "inline-block"
            }}
          ></div>
        </Link>
        </div>
      <div style={{
        flex: 1,
        display: "flex",
        alignSelf: "center",
        marginTop: 100
      }}>
        <Outlet />
      </div>
    </div>
  );
};

export default BasicLayout;