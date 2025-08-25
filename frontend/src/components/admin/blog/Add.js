import { useState } from "react";
import Error from "../../error/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    content: "",
  });
  const handleInputs = (e) => {
    e.preventDefault();
    const nameInput = e.target.name;
    const valueInput = e.target.value;
    //console.log(valueInput);
    setInputs((state) => ({ ...state, [nameInput]: valueInput }));
  };

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setFile(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImage(previews);
  };

  const [errors, setErrors] = useState("");
  const handlSubmit = (e) => {
    e.preventDefault();
    let errSubmit = {};
    let flag = true;
    if (inputs.title === "") {
      errSubmit.title = "Vui long nhap tieu de";
      flag = false;
    } else if (inputs.title.length < 3) {
      errSubmit.title = "Tieu de phai nhieu hon 3 ki tu";
      flag = false;
    }
    if (inputs.description === "") {
      errSubmit.description = "Vui long nhap mo ta";
      flag = false;
    } else if (inputs.description.length < 3) {
      errSubmit.description = "Mo ta phai nhieu hon 3 ki tu";
      flag = false;
    }
    if (inputs.content === "") {
      errSubmit.content = "Vui long nhap noi dung";
      flag = false;
    } else if (inputs.content.length < 3) {
      errSubmit.content = "Noi dung phai nhieu hon 3 ki tu";
      flag = false;
    }
    if (file === "") {
      errSubmit.image = "Vui long chon hinh anh";
      flag = false;
    } else {
      let getSize = file[0]["size"];
      if (getSize > 1024 * 1024) {
        errSubmit.image = "Kich thuoc file qua lon";
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
        errSubmit.image = "Ten file ko hop le";
        flag = false;
      }
      //console.log(image);
    }
    if (!flag) {
      setErrors(errSubmit);
    } else {
      setErrors({});
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("content", inputs.content);
      file.forEach((f) => {
        formData.append("image", f);
      });
      axios
        .post("http://localhost:3000/api/admin/blog/add/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            console.log("Success");
            console.log(res.data);
            navigate("/blog/list");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const renderImage = () => {
    if (image.length > 0) {
      return image.map((key, index) => {
        return (
          <img
            key={index}
            width={"70"}
            height={"40"}
            className=" border mr-1 object-cover"
            src={key}
            alt=""
          />
        );
      });
    }
  };
  return (
    <div className="container mx-auto max-w-[500px] px-[15px]">
      <Error errors={errors} />
      <form
        method="POST"
        encType="multipart/form-data"
        className=" shadow-2xl p-[20px] relative z-10"
        onSubmit={handlSubmit}
      >
        <h2 className=" font-bold uppercase mb-3 text-[20px]">Create Blog</h2>
        <div className="mb-4">
          <input
            className=" w-[100%] h-[45px] border pl-3 focus-visible:outline-none"
            name="title"
            type="text"
            placeholder="Title..."
            onChange={handleInputs}
          />
        </div>
        <div className="mb-4">
          <input
            name="description"
            className=" w-[100%] h-[45px] border pl-3 focus-visible:outline-none"
            type="text"
            placeholder="Description..."
            onChange={handleInputs}
          />
        </div>

        <div className="mb-4">
          <textarea
            className=" pt-2 w-[100%] h-[100px] border pl-3 focus-visible:outline-none"
            name="content"
            placeholder="Content..."
            onChange={handleInputs}
          ></textarea>
        </div>

        <div className="mb-4">
          <input
            className=" w-[100%] h-[45px] focus-visible:outline-none"
            name="image"
            type="file"
            multiple
            onChange={handleFile}
          />
          <div className="flex gap-1">{renderImage()}</div>
        </div>
        <button className=" bg-emerald-950 px-4 py-1 text-white font-bold">
          add
        </button>
      </form>
    </div>
  );
};
export default Add;
