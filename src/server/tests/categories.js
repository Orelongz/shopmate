import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { should } = chai;

should();
chai.use(chaiHttp);

describe('Given that a user sends a', () => {
  describe('GET request to /api/departments/:id/categories', () => {
    it('should return 200 status code and all categories within a department', (done) => {
      chai.request(app)
        .get('/api/departments/2/categories')
        .end((err, res) => {
          const { categories } = res.body;

          res.should.have.status(200);
          categories.should.be.a('array');
          done();
        });
    });
  });
});
