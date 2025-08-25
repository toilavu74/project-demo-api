import { useContext, useState } from "react";
import Error from "../../error/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
const Login = () => {
  const { setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
    level: 0,
  });
  const handleInputs = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    //console.log(valueInput);
    setInput((state) => ({
      ...state,
      [nameInput]: valueInput,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errSubmit = {};
    let flag = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.email === "") {
      errSubmit.email = "Vui long nhap email";
      flag = false;
    } else if (!emailRegex.test(input.email)) {
      errSubmit.email = "Email ko dung dinh dang";
      flag = false;
    }
    if (input.password === "") {
      errSubmit.password = "Vui long nhap mat khau";
      flag = false;
    }
    if (!flag) {
      setErrors(errSubmit);
    } else {
      setErrors({});
      const data = {
        email: input.email,
        password: input.password,
        level: 0,
      };
      axios
        .post("http://localhost:3000/api/admin/user/login/", data)
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
            setErrors(res.data.errors);
          } else {
            console.log(res.data);
            const user = res.data.user;
            const local = JSON.stringify(user);
            localStorage.setItem("User", local);
            setUserLogin(user);
            navigate("/user/" + res.data.user.id);
          }
        })
        .catch((err) => {
          const errorData = err.response?.data?.errors;
          if (typeof errorData === "string") {
            setErrors({ general: errorData });
          } else {
            setErrors(errorData);
          }
          //console.log(err);
        });
    }
  };
  return (
    <>
      <div className="container mx-auto max-w-[500px] px-[15px]">
        <Error errors={errors} />
        <form className=" shadow-2xl p-[20px]" onSubmit={handleSubmit}>
          <h2 className=" font-bold uppercase mb-3 text-[20px]">Login</h2>
          <div className="mb-4">
            <input
              name="email"
              className=" w-[100%] h-[45px] border pl-3 focus-visible:outline-none"
              type="text"
              placeholder="Email..."
              onChange={handleInputs}
            />
          </div>
          <div className="mb-4">
            <input
              className=" w-[100%] h-[45px] border pl-3 focus-visible:outline-none"
              name="password"
              type="password"
              placeholder="Password..."
              onChange={handleInputs}
            />
          </div>
          <button className=" bg-emerald-950 px-4 py-2 text-white font-bold">
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
