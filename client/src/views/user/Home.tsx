import React, { useState, useEffect } from "react";
import { Banner, Footer, Services, Steps } from "../../components";
import { HashLoader } from "react-spinners";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color="#c084fc" />
        </div>
      ) : (
        <main className="bg-gradient-to-r from-yellow-200 to-white overflow-hidden">
          <Banner />
          <Services />
          <Steps />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Home;
