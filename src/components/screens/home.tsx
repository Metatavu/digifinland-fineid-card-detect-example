import { Link } from "react-router-dom";

/**
 * Home component properties
 */
type Props = {
};

/**
 * Home component.
 */
const HomeScreen = ({ }: Props) => {
  return (
    <div>
      <Link 
        style={ {
          background: "#fff",
          color: "#003d6d",
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 200,
          paddingRight: 200,    
          fontSize: 22,
          textDecoration: "none",
        }}
        to="/demo"
      >
        Demosivulle
      </Link>
    </div>
  );
};

export default HomeScreen;