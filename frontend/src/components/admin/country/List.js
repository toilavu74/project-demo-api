import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  //const { userLogin } = useContext(UserContext);
  const [country, setCountry] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/country/list")
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          const data = res.data;
          console.log(data);
          setCountry(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteCountry = (id) => {
    axios
      .delete("http://localhost:3000/api/admin/country/delete/" + id)
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          console.log("Deleted");
          axios
            .get("http://localhost:3000/api/admin/country/list")
            .then((res) => {
              if (res.data.errors) {
                console.log(res.data.errors);
              } else {
                const data = res.data;
                setCountry(data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => console.log(err));
  };

  const renderListCountry = () => {
    if (Object.keys(country).length > 0) {
      return Object.keys(country).map((key, index) => {
        return (
          <tr
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {country[key].id}
            </th>
            <td className="px-6 py-4"> {country[key].name}</td>
            <td className="px-6 py-4">
              <Link
                className="pr-2 underline"
                to={"/country/edit/" + country[key].id}
              >
                Edit
              </Link>
              <Link
                className=" underline"
                onClick={() => {
                  deleteCountry(country[key].id);
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
  return (
    <>
      <div className=" w-[700px] mx-auto">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{renderListCountry()}</tbody>
          </table>
          <Link
            to={"/country/add"}
            className=" inline-block mt-[20px] bg-emerald-950 px-4 py-2 text-white font-semibold text-[14px] uppercase "
          >
            Add Country
          </Link>
        </div>
      </div>
    </>
  );
};
export default List;
