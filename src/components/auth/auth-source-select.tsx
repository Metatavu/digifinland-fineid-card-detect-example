import { AuthSource } from "../../atoms/auth";

/**
 * Authentication source select component properties
 */
type Props = {
  onAuthSourceChange: (authSource: AuthSource) => void;
};

/**
 * Authentication source select component.
 * 
 * The component is used to select the authentication source.
 */
const AuthSourceSelect = ({ onAuthSourceChange }: Props) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
    }}>
      <h1 style={{ 
        alignSelf: "center", 
      }}>Kirjaudu sisään</h1>

      <div style={{
        flex: 1,
        display: "flex",
        alignSelf: "center",
      }}>

        <div
          style={ {
            background: "#fff",
            color: "#003d6d",
            paddingTop: 100,
            paddingBottom: 100,
            paddingLeft: 200,
            paddingRight: 200,    
            flex: 1,
            maxWidth: 200,
            maxHeight: 120,
            margin: 50,
            fontSize: 22,
            textAlign: "center",
            borderRadius: 5,
            cursor: "pointer",
          } }
        >
          Kirjaudu varmennekortilla

          <a
            onClick={ () => onAuthSourceChange("CARD") }
            style={{
              display:"block",
              color: "#fff",
              background: "#003d6d",
              borderRadius: 20,
              marginTop: 20,
              padding: 10,
              fontSize: 18,
            }}
          >
            Kirjaudu
          </a>
        </div>

        <div 
          style={ {
            background: "#fff",
            color: "#003d6d",
            paddingTop: 100,
            paddingBottom: 100,
            paddingLeft: 200,
            paddingRight: 200,    
            flex: 1,
            maxWidth: 200,
            maxHeight: 120,
            margin: 50,
            fontSize: 20,
            textAlign: "center",
            borderRadius: 5,
            cursor: "pointer",
          } }
        >
          Kirjaudu käyttäjätunnuksilla

          <a
            onClick={ () => onAuthSourceChange("USERNAME") }
            style={{
              display:"block",
              color: "#fff",
              background: "#003d6d",
              borderRadius: 20,
              marginTop: 20,
              padding: 10,
              fontSize: 18
            }}
          >
            Kirjaudu
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthSourceSelect;