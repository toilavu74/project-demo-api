const AuthLayout = (props) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {props.children}
    </div>
  );
};
export default AuthLayout;
