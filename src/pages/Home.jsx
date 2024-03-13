import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Alert, Button, Card, CardBody } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log('uid', uid);
      } else {
        // User is signed out
        navigate('/');
        console.log('user is logged out');
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-container">
      <div className="centered-content">
        <Card className="w-[320px]">
          <CardBody>
            <h3 className="text-center">Home</h3>
            <div className="w-1">&nbsp;</div>
            <Alert color="cyan" variant="gradient" className="font-semibold">
              Welcome to homepage.
            </Alert>

            <div className="flex flex-col mt-4">
              <Button
                color="red"
                variant="gradient"
                className="w-full"
                onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Home;
