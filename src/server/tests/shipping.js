import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { should } = chai;

should();
chai.use(chaiHttp);

describe('Given that a user sends a', () => {
  describe('GET request to /api/shipping', () => {
    it('should return 200 status code and all shipping details', (done) => {
      chai.request(app)
        .get('/api/shipping')
        .end((err, res) => {
          const { shipping } = res.body;

          res.should.have.status(200);
          shipping.should.be.a('array');
          done();
        });
    });
  });
});
