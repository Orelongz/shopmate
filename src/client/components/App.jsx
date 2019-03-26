import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './common/Navbar/NavBar';
import Footer from './common/Footer/Footer';
import NotFound from './common/NotFound';
import HomePage from './Homepage/HomePage';
import ProductPage from './Productpage/ProductPage';
import CartPage from './CartPage/CartPage';
import Auth from './Auth/Auth';
import GuestRoute from './common/GuestRoute';

function App() {
  return (
    <Router>
      <div className="body">
        <main>
          <NavBar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/cart" component={CartPage} />
            <GuestRoute path="/signup" exact component={Auth} />
            <GuestRoute path="/login" exact component={Auth} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
