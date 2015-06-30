var request = require('supertest-as-promised');
var api = require('../server.js');
var expect = require('chai').expect;

request = request(api);

describe('Test de Planetas', function() {

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
      .then(function getPlanetas(res) {

        return request.get('/planetas')
          .set('Accept', 'application/json')
          .send()
          .expect(200)
          .expect('Content-Type', /application\/json/)
        }, done)
      .then(function assertion(res) {
        var planeta
        var body = res.body;
        console.log('body', body);

        //Planeta existe
        expect(body).to.have.property('planetas');
        planetas = body.planetas;

        //Propiedades
        expect(planetas).not.to.be.empty;
        done();
      }, done);

    });
  });

  // TDD PUT
  describe('PUT /planetas/:id', function() {
      it('deberia actualizar un planeta existente', function (done) {
        var data = {
          "planeta": {
            "nombre": "Mercurio",
          }
        };

        request
        .post('/planetas')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then(function putPlaneta(res) {

          var update = {
          "planeta": {
            "nombre": "Venus",
          }
        };

        id = res.body.planeta.id;

        return request.put('/planetas/' + id)
                 .set('Accept', 'application/json')
                 .send(update)
                 .expect(200)
                 .expect('Content-Type', /application\/json/);
        }, done)
        .then(function assertions(res) {
          var planeta;
          var body = res.body;
          console.log('GET body', body);
          // Planeta existe
          expect(body).to.have.property('planeta');
          planeta = body.planeta;

          // Propiedades
          expect(planeta).to.have.property('id', id);
          expect(planeta).to.have.property('nombre', 'Venus');

          done();
        }, done);

      });
    });

    // TDD DELETE
    describe('DELETE /planetas/:id', function() {
        it('deberia eliminar un planeta existente', function (done) {
          var id;
          var data = {
            "planeta": {
              "nombre": "Mercurio",
            }
          };

          request
          .post('/planetas')
          .set('Accept', 'application/json')
          .send(data)
          .expect(201)
          .expect('Content-Type', /application\/json/)
          .then(function deletePlaneta(res) {

          id = res.body.planeta.id;

          return request.delete('/planetas/' + id)
                   .set('Accept', 'application/json')
                   .send()
                   .expect(200)
                   .expect('Content-Type', /application\/json/);
          }, done)
          .then(function assertions(res) {
            var body = res.body;
            console.log('GET body', body);
            // Planeta no existe
            expect(body).to.have.property('planetas');
            planetas = body.planetas;

            expect(planetas).to.not.have.property(id);

            done();
          }, done);

        });
      });
});
