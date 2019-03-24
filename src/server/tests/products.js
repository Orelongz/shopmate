import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { should } = chai;

should();
chai.use(chaiHttp);

describe('Given that a user sends a', () => {
  describe('GET request to /api/products', () => {
    it('should return 200 status code and all products', (done) => {
      chai.request(app)
        .get('/api/products')
        .end((err, res) => {
          const { products, paginate } = res.body;

          res.should.have.status(200);
          products.should.be.a('array');
          paginate.should.be.an('object');
          done();
        });
    });
  });
});
