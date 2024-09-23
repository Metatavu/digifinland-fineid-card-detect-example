import { Link } from "react-router-dom";

/**
 * Component for not found page.
 */
const NotFound = () => {
  return (
    <div>
      <h2>Täällä ei ole mitään nähtävää</h2>
      <p>
        Palaa takaisin <Link to="/">kotisivulle</Link>
      </p>
    </div>
  );
};

export default NotFound;