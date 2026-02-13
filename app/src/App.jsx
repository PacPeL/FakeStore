import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/components/layout/Layout";
import Home from "./app/pages/Home";
import Cart from "./app/pages/Cart";
import Profile from "./app/pages/Profile";
import Admin from "./app/pages/Admin";





function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
