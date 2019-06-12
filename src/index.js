import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import CalcForm from "./CalcForm";
import Weekdays from "./Weekdays";
import Products from "./Products";
import AddProduct from "./AddProduct";
import Store from "./storage/Store";
import data from "./data";
import "./styles.css";

const AddRecipies = props => {
  return <h3>Comp {props.match.path}</h3>;
};

function App() {
  return (
    <div className="App">
      <Store>
        <Router>
          <nav>
            <label>
              <header />
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/add-product">Add Product</Link>
                </li>
                <li>
                  <Link to="/add-recipies">Add Recipies</Link>
                </li>
              </ul>
            </label>
          </nav>
          <hr />
          <grid>
            <div col="2/4">
              <CalcForm />
            </div>
            <div col="1/4">
              <Weekdays />
            </div>
          </grid>
          <hr />
          <Route exact path="/" component={Products} />
          <Route path="/add-product" component={AddProduct} />
          <Route path="/add-recipies" component={AddRecipies} />
        </Router>
      </Store>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
