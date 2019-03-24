import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { should } = chai;

should();
chai.use(chaiHttp);

describe('Given that a user sends a', () => {
  describe('GET request to /api/departments', () => {
    it('should return 200 status code and all departments', (done) => {
      chai.request(app)
        .get('/api/departments')
        .end((err, res) => {
          const { departments } = res.body;

          res.should.have.status(200);
          departments.should.be.a('array');
          done();
        });
    });
  });
});
