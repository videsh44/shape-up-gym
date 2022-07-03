import { useState } from 'react';
import { useAuth } from '../context/AuthUserContext';
import { auth } from '../firebase/config';
import ErrorToast from './ErrorToast';

const LoginForm = ({ closeModal }) => {
  const { signInWithEmailAndPasswordFunc } = useAuth();
  const [errorToastState, setErrorToastState] = useState(null);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = state;

  const onHandleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
    try {
      const res = await signInWithEmailAndPasswordFunc(auth, email, password);
      console.log('res', res);
      closeModal();
    } catch (error) {
      console.log('error', error);
      let temp_error = {
        color: 'red',
        primaryText: 'Validation Error',
        secondaryText: '',
        description: 'Invalid Credentials',
      };
      setErrorToastState(temp_error);
    }
  };

  const closeToastError = () => {
    setErrorToastState(null);
  };

  return (
    <>
      {errorToastState && (
        <ErrorToast
          primaryText={errorToastState.primaryText}
          secondaryText={errorToastState.secondaryText}
          description={errorToastState.description}
          color={errorToastState.color}
          closeToastError={closeToastError}
        />
      )}
      <div className=" flex bg-gray-bg1">
        <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
          <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
            Log in to your account 🔐
          </h1>

          {/* <form onSubmit={handleFormSubmit}> */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={onHandleChange}
              value={email}
              type="email"
              name="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={onHandleChange}
              type="password"
              value={password}
              name="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Your Password"
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              onClick={handleFormSubmit}
              className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              Login
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
