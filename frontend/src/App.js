import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
function App(props) {
  return (
    <>
      <Header />
      <div className="container mx-auto">{props.children}</div>
      <Footer />
    </>
  );
}

export default App;
