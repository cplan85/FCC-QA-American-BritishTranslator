'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  app.route('/api/translate')
    .post((req, res) => {
      console.log("post request")
      const text = req.body.text
      const locale = req.body.locale

      if(text == "") {
        res.json({ error: 'No text to translate' })
        return
      }
      if ( (!locale && text ) || (locale && !text ) ) {
        res.json({ error: 'Required field(s) missing' })
      }

      let translation;

      if (locale === "american-to-british") {
        translation = translator.translateAmericanToBritish(text)
      } else if(locale === "british-to-american") {
        translation = translator.translateBritishToAmerican(text)
      } else {
        res.json({ error: 'Invalid value for locale field' })
      }

      if (!translation.includes('<span class="highlight">')) {
        res.json({text: text, translation: "Everything looks good to me!"})
      }
      let jsonResponse = {text , translation };
      console.log(jsonResponse)
      res.json(jsonResponse)
    });
};
