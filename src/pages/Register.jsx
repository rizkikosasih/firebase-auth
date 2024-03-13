import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Alert, Button, Card, CardBody, Input } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FiEyeOff, FiEye } from 'react-icons/fi';

const Register = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const errorMessage = { 'auth/email-already-in-use': 'Email Already Exists' };

  useEffect(() => {
    const btnShowPassword = document.querySelector('.show-password');
    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    btnShowPassword.addEventListener('click', handleShowPassword);

    return () => {
      btnShowPassword.removeEventListener('click', handleShowPassword);
    };
  }, [showPassword, registerError]);

  const onRegister = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/login');
      })
      .catch((error) => {
        setEmail('');
        setPassword('');
        emailRef.current.focus();
        setRegisterError(error.code);
      });
  };

  return (
    <div className="max-container">
      <div className="centered-content">
        <Card className="w-[320px]">
          <CardBody>
            <h3 className="text-center">Register Page</h3>

            <div className="w-1">&nbsp;</div>

            {registerError && (
              <Alert
                open={true}
                onClose={() => setRegisterError(null)}
                color="red"
                variant="gradient"
                className="font-semibold text-sm mb-4">
                {errorMessage[registerError]}
              </Alert>
            )}

            <form className="flex flex-col gap-6" onSubmit={onRegister}>
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
                Signup
              </Button>
            </form>

            <p className="my-2">
              Already have an account?
              <NavLink to={'/login'} className="text-blue-gradient">
                Signin
              </NavLink>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;
