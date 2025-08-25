import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(UserContext);
  const handleLogout = () => {
    if (userLogin) {
      localStorage.clear();
      setUserLogin(null);
      navigate("/login");
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };
  // const button = userLogin ? (
  //   <button onClick={handleLogout}> {userLogin.name}Logout</button>
  // ) : (
  //   <button onClick={handleLogin}>Login</button>
  // );
  return (
    <>
      <div className="header">
        <div className="menu bg-slate-600 py-3 mb-[50px]">
          <div className="container mx-auto flex items-center justify-between">
            <div className="logo">
              <img
                src={process.env.PUBLIC_URL + "/logo192.png"}
                width="50"
                alt=""
              />
            </div>
            <ul className="flex gap-3">
              <li>
                <Link className="text-white" to="/dashboard">
                  Home
                </Link>
              </li>
              {userLogin && (
                <li>
                  <Link className="text-white" to={"/user/" + userLogin.id}>
                    Profile
                  </Link>
                </li>
              )}
              {userLogin && (
                <li>
                  <Link className="text-white" to="/blog/list">
                    Blog
                  </Link>
                </li>
              )}
              {userLogin && (
                <li>
                  <Link className="text-white" to="/country/list">
                    Country
                  </Link>
                </li>
              )}
            </ul>
            <div className="flex items-center gap-3">
              {userLogin && (
                <span className="text-white">Hello, {userLogin.name}</span>
              )}
              {userLogin ? (
                <button className="text-white" onClick={handleLogout}>
                  Logout{" "}
                </button>
              ) : (
                <>
                  <Link className="text-white" to="/login">
                    Login
                  </Link>
                  <Link className="text-white" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <h1 className="text-center uppercase text-[30px] font-bold mb-[50px]">
            Wellcome API Admin
          </h1>
        </div>
      </div>
    </>
  );
};
export default Header;
