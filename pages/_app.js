import Navbar from '../components/Navbar';
import { AuthUserProvider } from '../context/AuthUserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthUserProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthUserProvider>
    </>
  );
}

export default MyApp;
