import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessfull: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessfull,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NotesApi.Logout();
      onLogoutSuccessfull();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default NavBarLoggedInView;
