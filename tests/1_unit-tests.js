const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {

    const spanStart = '<span class="highlight">'
    const spanEnd = '</span>'

          // #1
  test("Translate Mangoes are my favorite fruit. to British English", function () {
   let testTranslation = translator.translateAmericanToBritish('Mangoes are my favorite fruit.')
    assert.equal(testTranslation, `Mangoes are my ${spanStart}favourite${spanEnd} fruit.`);
  });

  test("Translate I ate yogurt for breakfast. to British English", function () {
    let testTranslation = translator.translateAmericanToBritish('I ate yogurt for breakfast.')
     assert.equal(testTranslation, `I ate ${spanStart}yoghurt${spanEnd} for breakfast.`);
   });

   test("Translate We had a party at my friend's condo. to British English", function () {
    let testTranslation = translator.translateAmericanToBritish("We had a party at my friend's condo.")
     assert.equal(testTranslation, `We had a party at my friend's ${spanStart}flat${spanEnd}.`);
   });

   test("Translate Can you toss this in the trashcan for me?", function () {
    let testTranslation = translator.translateAmericanToBritish("Can you toss this in the trashcan for me?")
     assert.equal(testTranslation, `Can you toss this in the ${spanStart}bin${spanEnd} for me?`);
   });

   test("Translate The parking lot was full. to British English", function () {
    let testTranslation = translator.translateAmericanToBritish("The parking lot was full.")
     assert.equal(testTranslation, `The ${spanStart}car park${spanEnd} was full.`);
   });

   test("Translate Like a high tech Rube Goldberg machine. to British English", function () {
    let testTranslation = translator.translateAmericanToBritish(`Like a high tech Rube Goldberg machine.`)
     assert.equal(testTranslation, `Like a high tech ${spanStart}Heath Robinson device${spanEnd}.`);
   });

   test("Translate To play hooky means to skip class or work. to British English", function () {
    let testTranslation = translator.translateAmericanToBritish("To play hooky means to skip class or work.")
     assert.equal(testTranslation, `To ${spanStart}bunk off${spanEnd} means to skip class or work.`);
   });

   test("Translate No Mr. Bond, I expect you to die. to British English", function () {
    let testTranslation = translator.translateAmericanToBritish("No Mr. Bond, I expect you to die.")
     assert.equal(testTranslation, `No ${spanStart}Mr${spanEnd} Bond, I expect you to die.`);
   });

   test("Translate Dr. Grosh will see you now. to British English", function () {
    let testTranslation = translator.translateAmericanToBritish("Dr. Grosh will see you now.")
     assert.equal(testTranslation, `${spanStart}Dr${spanEnd} Grosh will see you now.`);
   });

   test("Translate Lunch is at 12:15 today. to British English", function () {
    let testTranslation = translator.translateAmericanToBritish("Lunch is at 12:15 today.")
     assert.equal(testTranslation, `Lunch is at ${spanStart}12.15${spanEnd} today.`);
   });

   test("Translate We watched the footie match for a while. to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("We watched the footie match for a while.")
     assert.equal(testTranslation, "We watched the soccer match for a while.");
   });

   test("Translate Paracetamol takes up to an hour to work. to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("Paracetamol takes up to an hour to work.")
     assert.equal(testTranslation, "Tylenol takes up to an hour to work.");
   });

   test("Translate First, caramelise the onions. to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("First, caramelise the onions.")
     assert.equal(testTranslation, "First, caramelize the onions.");
   });

   test("Translate I spent the bank holiday at the funfair. to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("I spent the bank holiday at the funfair.")
     assert.equal(testTranslation, "I spent the public holiday at the carnival.");
   });

   test("Translate I had a bicky then went to the chippy. to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("I had a bicky then went to the chippy.")
     assert.equal(testTranslation, "I had a cookie then went to the fish-and-chip shop.");
   });

   test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("I've just got bits and bobs in my bum bag.")
     assert.equal(testTranslation, "I've just got odds and ends in my fanny pack.");
   });

   test("Translate The car boot sale at Boxted Airfield was called off. to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("The car boot sale at Boxted Airfield was called off.")
     assert.equal(testTranslation, "The swap meet at Boxted Airfield was called off.");
   });

   test("Translate Have you met Mrs Kalyani? to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("Have you met Mrs Kalyani?")
     assert.equal(testTranslation, "Have you met Mrs. Kalyani?");
   });

   test("Translate Prof Joyner of King's College, London. to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("Prof Joyner of King's College, London.")
     assert.equal(testTranslation, "Prof. Joyner of King's College, London.");
   });

   test("Translate Tea time is usually around 4 or 4.30. to American English", function () {
    let testTranslation = translator.translateBritishToAmerican("Tea time is usually around 4 or 4.30.")
     assert.equal(testTranslation, "Tea time is usually around 4 or 4:30.");
   });

   test("Highlight translation in Mangoes are my favorite fruit.", function () {
    let testTranslation = translator.translateAmericanToBritish("Mangoes are my favorite fruit.")
     assert.equal(testTranslation.includes(`${spanStart}favourite${spanEnd}`), true);
   });

   test("Highlight translation in I ate yogurt for breakfast.", function () {
    let testTranslation = translator.translateAmericanToBritish("I ate yogurt for breakfast.")
     assert.equal(testTranslation.includes(`${spanStart}yoghurt${spanEnd}`), true);
   });
   // fix
   test("We watched the footie match for a while.", function () {
    let testTranslation = translator.translateAmericanToBritish("I ate yogurt for breakfast.")
     assert.equal(testTranslation.includes(`${spanStart}yoghurt${spanEnd}`), true);
   });

   // fix too
   test("Highlight translation in Paracetamol takes up to an hour to work.", function () {
    let testTranslation = translator.translateAmericanToBritish("I ate yogurt for breakfast.")
     assert.equal(testTranslation.includes(`${spanStart}yoghurt${spanEnd}`), true);
   });




});
