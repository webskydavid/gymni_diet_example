import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Diet from './components/pages/Diet';
import AddProduct from './components/pages/AddProduct';
import AddRecipes from './components/pages/AddRecipes';
import Store from './storage/Store';
import './styles.css';

const App = () => {
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
                  <Link to="/add-recipes">Add Recipes</Link>
                </li>
              </ul>
            </label>
          </nav>
          <hr />
          <Route exact path="/" component={Diet} />
          <Route path="/add-product" component={AddProduct} />
          <Route path="/add-recipes" component={AddRecipes} />
        </Router>
      </Store>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
