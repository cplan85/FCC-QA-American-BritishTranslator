const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    translateAmericanToBritish(string) {

        const spanStart = '<span class="highlight">'
        const spanEnd = '</span>'

        function createFullSpan(term) {
            return spanStart + term + spanEnd
        }
        
        const timeFormat = /^\d{2}:\d{2}$/;
        const endCharacter = string[string.length-1];

       let words = prepareString(string, endCharacter);

       words.forEach((word, i) => {

        if (word === "i") {
            words[i] = capitalizeFirstLetter(word)
        }

        //adapt time format
        if (timeFormat.test(word)) {
            words[i] = createFullSpan( word.replace(':',".") )
        }
        if (americanToBritishSpelling[word]) {
            words[i] = createFullSpan( americanToBritishSpelling[word] )
        }
        if (americanOnly[word]){
            words[i] =  createFullSpan( americanOnly[word] )
        }
        //name titles
        if (americanToBritishTitles[word]) {
            words[i] =  createFullSpan( capitalizeFirstLetter( americanToBritishTitles[word] )  )
            words[i + 1] = capitalizeFirstLetter(words[i + 1])
        }

         //check if 3 word translation
         if (words[i+2] && americanOnly[ words[i] + ' ' + words[i + 1] + ' ' + words[i + 2] ]) {

            words[i] = createFullSpan( americanOnly[ words[i] + ' ' + words[i + 1] + ' ' + words[i + 2] ]  )

            words.splice(i+1,2);
        }
        
        //check if 2 word translation
        if (words[i+1] && americanOnly[ words[i] + ' ' + words[i + 1] ]) {

            words[i] = createFullSpan( americanOnly[ words[i] + ' ' + words[i + 1] ] )

            words.splice(i+1,1);
        }
       })

       let stringResult = words.join(' ') + endCharacter;

       return capitalizeFirstLetter(stringResult)

    }

    translateBritishToAmerican(string) {

        //all of this for dealing with uppercase words
        const simpleString = string.split(' ');
        let uppercaseWords = [];
        simpleString[simpleString.length - 1] = simpleString[simpleString.length - 1].replace(string[string.length-1], '');
        simpleString.forEach((word, i) => {
            if (i !== 0 && word[0] == word[0].toUpperCase() ) {
                uppercaseWords.push(word)
            }
        })

        //all of this for dealing with uppercase words
        
        

        const endCharacter = string[string.length-1];

        const timeFormat = /^\d{1,2}\.\d{2}$/;

       let words = prepareString(string, endCharacter);

       words.forEach((word, i) => {

        if (timeFormat.test(word)) {
            console.log(word, "MY WORD")
            words[i] = word.replace('.',":")
        }

        if (britishOnly[word]){
            words[i] = britishOnly[word]
        }

            //check if 3 word translation
        if (words[i+2] && britishOnly[ words[i] + ' ' + words[i + 1] + ' ' + words[i + 2] ]) {

                words[i] = britishOnly[ words[i] + ' ' + words[i + 1] + ' ' + words[i + 2] ] 
    
                words.splice(i+1,2);
        }

            //check if 2 word translation
        if (words[i+1] && britishOnly[ words[i] + ' ' + words[i + 1] ]) {

                words[i] = britishOnly[ words[i] + ' ' + words[i + 1] ]
    
                words.splice(i+1,1);
        }

        if (findKeyByValue(americanToBritishSpelling, word)) {
            words[i] = findKeyByValue(americanToBritishSpelling, word);
        }

        if (findKeyByValue(americanToBritishTitles, word)) {
            words[i] = capitalizeFirstLetter( findKeyByValue(americanToBritishTitles, word) )
            words[i + 1] = capitalizeFirstLetter(words[i + 1])
        }

        //handle uppercaseWords
        if(uppercaseWords.length > 0) {

            uppercaseWords.forEach(capitalizedWord => {
               if (capitalizedWord.toLowerCase() == word) {
                words[i] = capitalizeFirstLetter(words[i])
               }
            })
           }
        
       })

       let stringResult = words.join(' ') + endCharacter;

       return capitalizeFirstLetter(stringResult)

    }

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function findKeyByValue(obj, targetValue) {
  for (let key in obj) {
    if (obj[key] === targetValue) {
      return key;
    }
  }
  return null; // Return null if the value is not found
}

function prepareString(string, endCharacter) {
    let words = string.toLowerCase().split(' ');
    // this removes all periods, so i need to modify to be only last period
    words[words.length - 1] = words[words.length - 1].slice(0,-1);
    return words

}

module.exports = Translator;