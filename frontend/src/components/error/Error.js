const Error = (props) => {
  const errors = props.errors;
  //console.log(errors);

  const renderError = () => {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return (
          <li className=" text-red-600 mb-2" key={index}>
            {errors[key]}
          </li>
        );
      });
    }
  };
  return (
    <>
      <ul>{renderError()}</ul>
    </>
  );
};
export default Error;
