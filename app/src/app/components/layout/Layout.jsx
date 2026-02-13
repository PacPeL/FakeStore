import Drawer from "./Drawer";
import Header from "../Header";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Drawer />
      <Header />
      <main className="content">{children}</main>
    </>
  );
};

export default Layout;
