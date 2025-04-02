import { Link } from "react-router-dom";
import "./pnf.style.css";

const NotFound = () => {
  return (
    <div className="pnf__wrapper">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go To Home</Link>
    </div>
  );
};

export default NotFound;
