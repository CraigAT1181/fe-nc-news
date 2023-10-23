import LoggedUser from "./LoggedUser";

export default function Header() {
  return (
    <header>
      <LoggedUser />
      <h1>NC News</h1>
    </header>
  );
}
