import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { sequelize } from '../models';

const { assert, should } = chai;
let authtoken1;

should();
chai.use(chaiHttp);

const validUser = {
  name: 'Drew Leeds',
  email: 'drew@yahoo.com',
  password: 'drewsecret'
};

const inValidUser = {
  name: 'Drew Leeds',
  password: 'drewsecrets'
};


describe('Given that a user sends a', () => {
  before((done) => {
    sequelize.query('truncate customer').then(() => done());
  });

  after((done) => {
    sequelize.query('truncate customer').then(() => done());
  });

  describe('POST request to /api/auth/signup', () => {
    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/auth/signup')
        .type('form')
        .send(validUser)
        .end((err, res) => {
          const { email, token } = res.body.customer;

          res.should.have.status(201);
          assert.isNotNull(
            email,
            'Email should be available'
          );
          assert.isNotNull(
            token,
            'Token should be available'
          );
          done();
        });
    });

    it('should return 400 status code when email is not present', (done) => {
      chai.request(app)
        .post('/api/auth/signup')
        .type('form')
        .send(inValidUser)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.errors.email,
            'Email must not be empty',
          );
          done();
        });
    });
  });

  describe('POST request to /api/auth/login', () => {
    it('should return 200 status code and log the user into his/her account', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .type('form')
        .send({
          email: validUser.email,
          password: validUser.password
        })
        .end((err, res) => {
          const {
            email, token
          } = res.body.customer;
          authtoken1 = token;

          res.should.have.status(200);
          assert.isNotNull(
            email,
            'Email should be available'
          );
          assert.isNotNull(
            token,
            'Token should be available'
          );
          done();
        });
    });

    it('should return 400 status code if any input field is empty', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .type('form')
        .send({
          email: validUser.email,
          password: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 status code when password does not match the given email', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .type('form')
        .send({
          email: validUser.email,
          password: inValidUser.password
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.strictEqual(
            res.body.error,
            'Wrong email or password',
            'Password does not match the email in database'
          );
          done();
        });
    });
  });

  describe('GET request to /api/user', () => {
    it('should return 200 status code and retrieve user details', (done) => {
      chai.request(app)
        .get('/api/auth/user')
        .set('authorization', authtoken1)
        .end((err, res) => {
          const { name } = res.body.customer;

          res.should.have.status(200);
          assert.isNotNull(
            name,
            'Name is retrived'
          );
          done();
        });
    });

    it('should return 401 status code when token is invalid', (done) => {
      chai.request(app)
        .get('/api/auth/user')
        .set('authorization', 'somerandomtoken')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
