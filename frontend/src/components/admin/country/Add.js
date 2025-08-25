import { useState } from "react";
import Error from "../../error/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
  });
  const handleInput = (e) => {
    e.preventDefault();
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    setInput((state) => ({ ...state, [nameInput]: valueInput }));
  };
  const [errors, setErrors] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let errSubmit = {};
    let flag = true;
    if (input.name === "") {
      errSubmit.name = "Vui long nhap name";
      flag = false;
    } else if (input.name.length < 2) {
      errSubmit.name = "Name phai nhieu hon 1 ki tu";
      flag = false;
    }
    if (!flag) {
      //console.log(errors);
      setErrors(errSubmit);
    } else {
      setErrors({});
      const data = {
        name: input.name,
      };
      axios
        .post("http://localhost:3000/api/admin/country/add", data)
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            console.log("Success");
            console.log(res);
            navigate("/country/list");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container mx-auto max-w-[500px] px-[15px]">
      <Error errors={errors} />
      <form className=" shadow-2xl p-[20px]" onSubmit={handleSubmit}>
        <h2 className=" font-bold uppercase mb-3 text-[20px]">
          Create Country
        </h2>
        <div className="mb-4">
          <input
            name="name"
            className=" w-[100%] h-[45px] border pl-3 focus-visible:outline-none"
            type="text"
            placeholder="Name..."
            onChange={handleInput}
          />
        </div>
        <button className=" bg-emerald-950 px-4 py-1 text-white font-bold">
          Add
        </button>
      </form>
    </div>
  );
};
export default Add;
