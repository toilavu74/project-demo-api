import axios from "axios";
import { useEffect, useState } from "react";
import Error from "../../error/Error";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    address: "",
    id_country: "",
    level: 0,
  });
  const handleInputs = (e) => {
    e.preventDefault();
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  };

  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState("");
  const handleFile = (e) => {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setFile(file);
      setAvatar(e.target.result);
    };
    reader.readAsDataURL(file[0]);
  };

  const [country, setCountry] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/country/list")
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          console.log(res.data);
          setCountry(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderCountry = () => {
    if (Object.keys(country).length > 0) {
      return Object.keys(country).map((key, index) => {
        return (
          <option key={index} value={country[key].id}>
            {country[key].name}
          </option>
        );
      });
    }
  };

  const [errors, setErrors] = useState("");
  const handlSubmit = (e) => {
    e.preventDefault();
    const errSubmit = {};
    let flag = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputs.email === "") {
      errSubmit.email = "Vui long nhap email";
      flag = false;
    } else if (!emailRegex.test(inputs.email)) {
      errSubmit.email = "Email ko dung dinh dang";
      flag = false;
    }
    if (inputs.name === "") {
      errSubmit.name = "Vui long nhap name";
      flag = false;
    }
    if (inputs.password === "") {
      errSubmit.password = "Vui long nhap mat khau";
      flag = false;
    }
    if (inputs.phone === "") {
      errSubmit.phone = "Vui long nhap so dien thoai";
      flag = false;
    }
    if (inputs.id_country === "") {
      errSubmit.id_country = "Vui long chon quoc gia";
      flag = false;
    }
    if (file === "") {
      errSubmit.avatar = "Vui long upload hinh anh";
      flag = false;
    } else {
      let getSize = file[0]["size"];
      if (getSize > 1024 * 1024) {
        errSubmit.avatar = "Kich thuoc file qua lon";
        flag = false;
      }
      const arrDuoiFile = ["png", "jpg", "jpeg", "PNG", "JPG"];
      //console.log(arrDuoiFile);
      let getName = file[0]["name"];
      const parts = getName.split(".");
      //console.log(getName);
      const extension = parts[parts.length - 1];
      //console.log(extension);
      if (!arrDuoiFile.includes(extension)) {
        errSubmit.avatar = "Ten file ko hop le";
        flag = false;
      }
    }
    if (!flag) {
      setErrors(errSubmit);
    } else {
      setErrors({});
      console.log(inputs);
      console.log(file[0]);
      const data = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        address: inputs.address,
        id_country: inputs.id_country,
        avatar: file[0],
        level: 0,
      };
      axios
        .post("http://localhost:3000/api/admin/user/register", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            console.log("Dang ki thanh cong");
            console.log(res);
            navigate("/login");
          }
        })
        .catch((err) => {
          const errorData = err.response.data.email;
          if (typeof errorData === "string") {
            setErrors({ general: errorData });
          } else {
            setErrors(errorData);
          }
          //setErrors(err.response.data.email);
        });
    }
  };
  return (
    <>
      <div className="container mx-auto max-w-[500px] px-[15px]">
        <Error errors={errors} />
        <form
          method="POST"
          onSubmit={handlSubmit}
          encType="multipart/form-data"
          className=" shadow-2xl p-[20px] relative z-10"
        >
          <h2 className=" font-bold uppercase mb-3 text-[20px]">Register</h2>
          <div className="mb-4">
            <input
              className=" w-[100%] h-[45px] border pl-3 focus-visible:outline-none"
              name="name"
              type="text"
              placeholder="Name..."
              onChange={handleInputs}
            />
          </div>
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
          <div className="mb-4">
            <input
              className=" w-[100%] h-[45px] border pl-3 focus-visible:outline-none"
              name="phone"
              type="tel"
              placeholder="Phone..."
              onChange={handleInputs}
            />
          </div>
          <div className="mb-4">
            <input
              className=" w-[100%] h-[45px] border pl-3 focus-visible:outline-none"
              name="address"
              type="text"
              placeholder="Address..."
              onChange={handleInputs}
            />
          </div>
          <div className="mb-4">
            <select
              name="id_country"
              className=" w-[100%] h-[45px] border pl-3 focus-visible:outline-none"
              onChange={handleInputs}
            >
              <option value="">Country</option>
              {renderCountry()}
            </select>
          </div>
          <div className="mb-4">
            <input
              className=" w-[100%] h-[45px] focus-visible:outline-none"
              name="avatar"
              type="file"
              onChange={handleFile}
            />
            {avatar && (
              <img
                alt="Avatar preview"
                src={avatar}
                className=" rounded-none w-[70px]"
              />
            )}
          </div>
          <button className=" bg-emerald-950 px-4 py-2 text-white font-bold">
            Register
          </button>
        </form>
      </div>
    </>
  );
};
export default Register;
