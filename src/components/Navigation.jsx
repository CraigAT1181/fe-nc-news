import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <Link to="/articles">Articles</Link> |{" "}
      <Link to="Users">Users</Link>
    </nav>
  );
}
