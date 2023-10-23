import profile from "../../assets/profile-pic.webp";

export default function LoggedUser() {
  return (
    <div className="logged-user">
      <h3>Welcome Craig</h3>
      <img
        id="profilepic"
        src={profile}
        alt="A portrait of the user"
      />
    </div>
  );
}
