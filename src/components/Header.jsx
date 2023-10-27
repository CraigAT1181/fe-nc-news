import LoggedUser from "./LoggedUser";
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header>
      <LoggedUser />
      <h1 id="title">NC News</h1>
      <Link to={"/articles"}>
      <button id="home">Home</button>
      </Link>
    </header>
  );
}
