import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Webfooter from "./components/Webfooter";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import 'boxicons'
import Search from "./components/Search";
import Webstate  from "./context/Webstate";
import Allproducts from "./components/Allproducts";
import Product from "./components/Product";
import Addproduct from "./components/Addproduct";
import Editproduct from "./components/Editproduct";
import Detailedproduct from "./components/Detailedproduct";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <Webstate>
      <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/search">
          <Search/>
        </Route>
        <Route exact path="/allproducts">
          <Allproducts/>
        </Route>
        <Route exact path="/products">
          <Product/>
        </Route>
        <Route exact path="/addproduct">
          <Addproduct/>
        </Route>
        <Route exact path="/editproduct">
          <Editproduct/>
        </Route>
        <Route exact path="/productdetail">
          <Detailedproduct/>
        </Route>
        <Route exact path="/cart">
          <Cart/>
        </Route>
      </Switch>
      <Webfooter/>
      </Router>
      </Webstate>
    </div>
  );
}

export default App;
