const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    test('Translation with text and locale fields: POST request to /api/translate', function (done) {
        const stringInput = 'I apologize';
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            "text": stringInput,
            "locale": "american-to-british"
          })
          .end(function (err, res) {
            assert.equal(res.type,'application/json');
            assert.equal(res.body.text, stringInput);
            done();
          });
      });

      test('Translation with text and invalid locale field: POST request to /api/translate', function (done) {
        const stringInput = 'I apologize';
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            "text": stringInput,
            "locale": "american-to-canadian"
          })
          .end(function (err, res) {
            assert.equal(res.type,'application/json');
            assert.equal(res.body.error, "Invalid value for locale field");
            done();
          });
      });

      test('Translation with missing text field: POST request to /api/translate', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            "locale": "american-to-canadian"
          })
          .end(function (err, res) {
            assert.equal(res.type,'application/json');
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
          });
      });

      test('Translation with missing locale field: POST request to /api/translate', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            "text": "example",
          })
          .end(function (err, res) {
            assert.equal(res.type,'application/json');
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
          });
      });

      test('Translation with empty text: POST request to /api/translate', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            "text": "",
            "locale": "american-to-canadian"
          })
          .end(function (err, res) {
            assert.equal(res.type,'application/json');
            assert.equal(res.body.error, 'No text to translate');
            done();
          });
      });

      test('Translation with text that needs no translation: POST request to /api/translate', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/translate')
          .send({
            "text": "I am American",
            "locale": "american-to-british"
          })
          .end(function (err, res) {
            assert.equal(res.type,'application/json');
            assert.equal(res.body.translation, "Everything looks good to me!");
            done();
          });
      });

});
