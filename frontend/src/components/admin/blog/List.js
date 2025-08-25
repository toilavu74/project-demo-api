import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const List = () => {
  const [blog, setBlog] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/blog/list").then((res) => {
      if (res.data.errors) {
        console.log(res.data.errors);
      } else {
        console.log(res.data);
        setBlog(res.data);
      }
    });
  }, []);

  const renderBlog = () => {
    if (blog.length > 0) {
      return blog.map((key, value) => {
        const image = JSON.parse(key.image);
        //console.log(image[0]);
        const url = "http://localhost:3000/uploads/blog/";
        return (
          <tr
            key={value}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {key.id}
            </th>
            <td className="px-6 py-4">
              <img
                className=" border"
                alt=""
                width={"100"}
                height={"70"}
                src={url + image[0]}
              />
            </td>
            <td className="px-6 py-4">{key.title} </td>
            <td className="px-6 py-4">{key.description} </td>
            <td className="px-6 py-4">{key.content} </td>
            <td className="px-6 py-4">
              <Link className="pr-2 underline" to={"/blog/edit/" + key.id}>
                Edit
              </Link>
              <Link
                className=" underline"
                onClick={() => {
                  deleteBlog(key.id);
                }}
              >
                Delete
              </Link>
            </td>
          </tr>
        );
      });
    }
  };
  const deleteBlog = (id) => {
    axios
      .delete("http://localhost:3000/api/admin/blog/delete/" + id)
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          console.log("Deleted");
          axios
            .get("http://localhost:3000/api/admin/blog/list/")
            .then((res) => {
              if (res.data.errors) {
                console.log(res.data.errors);
              } else {
                const data = res.data;
                setBlog(data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };
  return (
    <>
      <div className=" w-[900px] mx-auto">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{renderBlog()}</tbody>
          </table>
          <Link
            to={"/blog/add"}
            className=" inline-block mt-[20px] bg-emerald-950 px-4 py-2 text-white font-semibold text-[14px] uppercase "
          >
            Add Blog
          </Link>
        </div>
      </div>
    </>
  );
};
export default List;
