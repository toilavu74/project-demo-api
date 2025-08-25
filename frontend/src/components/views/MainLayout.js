import Sidebar from "../layout/Sidebar";

const MainLayout = (props) => {
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 p-4 bg-gray-50">{props.children}</div>
  </div>;
};
export default MainLayout;
