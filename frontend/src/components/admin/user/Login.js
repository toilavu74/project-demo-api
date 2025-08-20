const Login = () => {
  return (
    <>
      <div className="container mx-auto max-w-[500px]">
        <form className="">
          <div className=" mb-4">
            <input
              name="email"
              className=" w-[100%] h-[45px] border pl-3"
              type="text"
              placeholder="Email..."
            />
          </div>
          <div className=" mb-4">
            <input
              className=" w-[100%] h-[45px] border pl-3"
              name="password"
              type="password"
              placeholder="Password..."
            />
          </div>
          <button className=" bg-emerald-950 px-4 py-2 text-white font-bold">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
