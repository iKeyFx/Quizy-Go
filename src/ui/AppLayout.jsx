import styled from "styled-components";

import { useEffect, useState } from "react";

import GetStarted from "../features/authentication/Login";
import Header from "./Header";
import HomeSection1 from "../sections/HomeSection1";
import HomeSection2 from "../sections/HomeSection2";
import HomeSection3 from "../sections/HomeSection3";
import Footer from "./Footer";
import SplashScreen from "./SplashScreen";

const StyledAppLayout = styled.main`
  background-color: var(--color-white);
`;
function AppLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <Header />
          <main>
            <HomeSection1 />
            <HomeSection2 />
            <HomeSection3 />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default AppLayout;
