import { Link } from "react-router-dom";
import LoggedUser from "./LoggedUser";

export default function Header() {

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <header>
      <LoggedUser />
      <h1>
        <Link style={linkStyle} to={`/home`}>NC News</Link>
      </h1>
    </header>
  );
}
