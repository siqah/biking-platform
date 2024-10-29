import { useAuth } from '../context/AuthContext';
import { Button, Container } from '@mui/material';

function Profile() {
  const { currentUser, logout } = useAuth();

  return (
    <Container>
      <h2>Profile</h2>
      <p>Email: {currentUser?.email}</p>
      <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
    </Container>
  );
}

export default Profile;
