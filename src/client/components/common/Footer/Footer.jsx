import React from 'react';
import './Footer.scss';

export function Footer() {
  return (
    <footer>
      <div className="container d-flex">
        <div className="column">
          <p>Questions</p>
          <ul>
            <li>Help</li>
            <li>Track Order</li>
            <li>Return</li>
          </ul>
        </div>

        <div className="column">
          <p>Whats in store</p>
          <ul>
            <li>Women</li>
            <li>Men</li>
            <li>Products A-Z</li>
            <li>Buy Gift vouchers</li>
          </ul>
        </div>

        <div className="column">
          <p>Follow Us</p>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Youtube</li>
          </ul>
        </div>

        <div className="column">
          <p id="copyright">&copy; Shopmate</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
