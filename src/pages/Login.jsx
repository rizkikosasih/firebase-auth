import { Alert, Button, Card, CardBody, Input } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const messageError = { 'auth/invalid-credential': 'Email or Password wrong' };

  useEffect(() => {
    const btnShowPassword = document.querySelector('.show-password');
    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    btnShowPassword.addEventListener('click', handleShowPassword);

    return () => {
      btnShowPassword.removeEventListener('click', handleShowPassword);
    };
  }, [showPassword, loginError]);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/home');
        console.log(user.uid);
      })
      .catch((error) => {
        setEmail('');
        setPassword('');
        emailRef.current.focus();
        setLoginError(error.code);
      });
  };

  return (
    <div className="max-container">
      <div className="centered-content">
        <Card className="w-[320px]">
          <CardBody>
            <h3 className="text-center">Login Page</h3>

            <div className="w-1">&nbsp;</div>

            {loginError && (
              <Alert
                open={true}
                onClose={() => setLoginError(null)}
                color="red"
                variant="gradient"
                className="font-semibold text-sm mb-4">
                {messageError[loginError]}
              </Alert>
            )}

            <form className="flex flex-col gap-6" onSubmit={onLogin}>
              <Input
                name="email"
                color="blue"
                label="Email"
                type="email"
                size="lg"
                autoFocus
                required
                value={email}
                inputRef={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                icon={<MdOutlineAlternateEmail />}
              />

              <Input
                name="password"
                color="blue"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                size="lg"
                required
                value={password}
                inputRef={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
                icon={
                  showPassword ? (
                    <FiEye className="cursor-pointer show-password" />
                  ) : (
                    <FiEyeOff className="cursor-pointer show-password" />
                  )
                }
              />

              <Button variant="gradient" color="blue" type="submit">
                Signin
              </Button>
            </form>

            <p className="my-2">
              Not have account?
              <NavLink to={'/register'} className="text-blue-gradient">
                Signup
              </NavLink>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
