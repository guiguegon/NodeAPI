var request = require('supertest');
var api = require('../server.js');
var expect = require('chai').expect;

request = request(api);

describe('TEST de Planetas', function() {

  describe('POST /planetas', function() {

    before(function(done) {
      console.log('before');
      done();
    });

    it('Debería crear un planeta', function(done) {
      var data = {
        "planeta": {
          "nombre" : "Mercurio",
        }
      };
      request
      .post('/planetas')
      .set('Accept', 'application/json')
      .send(data)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .end(function(err, res) {
          var planeta;

          var body = res.body;
          console.log('body', body);

          //Planeta existe
          expect(body).to.have.property('planeta');
          planeta = body.planeta;

          //Propiedades
          expect(planeta).to.have.property('nombre', 'Mercurio');
          expect(planeta).to.have.property('id');
          done(err);
      });

    });

    after(function(done) {
      console.log('after');
      done();
    });

  });

  describe('GET /planetas', function() {
    it('Debería devolver un planeta', function(done) {
      var data = {
        "planeta": {
          "nombre" : "Mercurio",
        }
      };

      request
      .post('/planetas')
      .set('Accept', 'application/json')
      .send(data)
      .end(function(err, res) {
        if(err) {
          done(err);
        }

        request
        .get('/planetas')
        .set('Accept', 'application/json')
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {
          var planeta;

          var body = res.body;
          console.log('body', body);

          //Planeta existe
          expect(body).to.have.property('planetas');
          planetas = body.planetas;

          //Propiedades
          expect(planetas).not.to.be.empty;
          done(err);
      });
    });

    });
  });
});
