import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
function App(props) {
  const [userLogin, setUserLogin] = useState("");
  useEffect(() => {
    let getLocal = localStorage.getItem("User");
    if (getLocal) {
      getLocal = JSON.parse(getLocal);
      setUserLogin(getLocal);
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={{ userLogin, setUserLogin }}>
        <Header />
        <div className="container mx-auto">{props.children}</div>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
