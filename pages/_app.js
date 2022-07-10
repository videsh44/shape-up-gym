import Navbar from "../components/Navbar";
import "../styles/globals.css";

import { AuthUserProvider } from "../context/AuthUserContext";

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
