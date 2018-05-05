process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../server';

const should = chai.should()

chai.use(chaiHTTP);

describe('/GET view estates', () => {

    it('Deberia traer todos las propiedades', (done) =>{

        chai.request(server).get('/api/v1/estates/view').end(
            (err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            }
        )
    })

})


describe('/POST user', () => {
    it('debe crear un nuevo usuario', (done) => {
      let user = {
	
        first_name: "Edwin",
        lastname: "salgado",
        email:"edwin11111@gmail.com",
        password: "edwin2018",
        phone_number: "55101722112"
    }
      chai.request(server)
          .post('/api/v1/users/signup')
          .send(user)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
            done();
          });
    });

});


