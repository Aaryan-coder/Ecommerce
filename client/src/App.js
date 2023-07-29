import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App=() => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
    <Routes>
    <Route path = "/" element = {<Home/>}/>
    <Route path = "/products/:category" element = {<ProductList/>}/>
    <Route path = "/product/:id" element = {<Product/>}/>
    <Route path = "/cart" element = {<Cart/>}/>
    <Route path = "/success" element = {<Success/>}/>
    <Route path = "/login" element = {user?<Home/>:<Login/>}/>
    <Route path = "/register" element = {<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
