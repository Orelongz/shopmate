import chai from 'chai';
import chaiHttp from 'chai-http';
import generator from 'generate-password';
import app from '../app';
import { sequelize } from '../models';

const { should } = chai;
const cartId = generator.generate({ length: 32 });
let itemId;
let cartLength; // /api/carts/:cartId/items/:itemId

should();
chai.use(chaiHttp);

describe('Given that a user sends a', () => {
  before((done) => {
    sequelize.query('truncate shopping_cart').then(() => done());
  });

  after((done) => {
    sequelize.query('truncate shopping_cart').then(() => done());
  });

  describe('POST request to /api/carts', () => {
    it('should return 201 status code and adds a product to the cart', (done) => {
      chai.request(app)
        .post('/api/carts')
        .send({ productId: 3, cartId })
        .end((err, res) => {
          const { cart, totalPrice } = res.body;
          cartLength = cart.length;

          res.should.have.status(200);
          cart.should.be.a('array');
          totalPrice.should.be.a('string');
          done();
        });
    });
  });

  describe('GET request to /api/carts', () => {
    it('should return 200 status code and all products in the cart', (done) => {
      chai.request(app)
        .get(`/api/carts/${cartId}`)
        .end((err, res) => {
          const { cart, totalPrice } = res.body;
          itemId = cart[0].item_id;

          res.should.have.status(200);
          cart.should.be.a('array');
          totalPrice.should.be.a('string');
          done();
        });
    });
  });

  describe('PUT request to /api/carts', () => {
    it('should return 200 status code and all products in the cart', (done) => {
      chai.request(app)
        .put(`/api/carts/${cartId}`)
        .send({ itemId, quantity: 3 })
        .end((err, res) => {
          const { cart, totalPrice } = res.body;

          res.should.have.status(200);
          cart.should.be.a('array');
          totalPrice.should.be.a('string');
          done();
        });
    });
  });

  describe('PUT request to /api/carts/:cartId/items/:itemId', () => {
    it('should return 200 status code and all products in the cart', (done) => {
      chai.request(app)
        .delete(`/api/carts/${cartId}/items/${itemId}`)
        .end((err, res) => {
          const { cart, totalPrice } = res.body;

          res.should.have.status(200);
          cart.should.be.a('array');
          totalPrice.should.be.a('string');
          cart.length.should.equal(cartLength - 1);
          done();
        });
    });
  });

  describe('DELETE request to /api/carts', () => {
    it('should return 200 status code and empty cart', (done) => {
      chai.request(app)
        .delete(`/api/carts/${cartId}`)
        .end((err, res) => {
          const { cart, totalPrice } = res.body;

          res.should.have.status(200);
          cart.length.should.equal(0);
          cart.should.be.a('array');
          totalPrice.should.be.a('string');
          done();
        });
    });
  });
});
