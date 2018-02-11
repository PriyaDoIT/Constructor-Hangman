var inquirer = require('inquirer')
var isLetter = require('is-letter')
var Word = require('./word.js')
var wordBank = ['APPLE','PEAR','WATERMELON', 'MANGO', 'BANANA','KIWI']
var guessesRemaining = 7
var guessedLetters = []
var currentWord

startGame()

function startGame() {
    if (guessedLetters.length > 0) {
        guessedLetters = []
    }

    inquirer.prompt([
        {
            name: 'play',
            type: 'confirm',
            message: 'Ready to play Hangman?'
        }
    ]).then(function (answer) {
        if (answer.play) {
            console.log('')            
            console.log(`You get 7 guesses to guess the correct fruit.`)
            newGame()
        } else {
            console.log('Exit the terminal')
        }
    })
}

function newGame() {
    if (guessesRemaining === 7) {
        // pick random word from the wordBank array
        var randNum = Math.floor(Math.random() * wordBank.length)
        currentWord = new Word(wordBank[randNum])
        currentWord.getLetters()

        // Display word as blank
        console.log('')
        console.log(currentWord.wordRender())
        console.log('')
        promptUser()
    } else {
        resetGuessesRemaining()
        newGame()
    }
}

function resetGuessesRemaining() {
    guessesRemaining = 7
}

function promptUser() {
    inquirer.prompt([
        {
            name: 'chosenLetter',
            type: 'input',
            message: 'Choose a letter',
            validate: function(value) {
                if (isLetter(value)) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]).then(function(letter) {

        // turn letter into uppper case and store in variable
        var letterReturned = (letter.chosenLetter).toUpperCase()

        // check to see if you guessed that letter already and set boolean to false
        var guessedAlready = false
        for (var i = 0; i < guessedLetters.length; i++) {
            if(letterReturned === guessedLetters[i]) {
                guessedAlready = true
            }
        }

        if (guessedAlready === false) {
            // push letter into array
            guessedLetters.push(letterReturned)

            // variable to check if letter was in the word
            var found = currentWord.checkIfLetterFound(letterReturned)

            if (found === 0) {
                console.log('INCORRECT!')
                guessesRemaining--
                console.log('')
                console.log(currentWord.wordRender())
                console.log('')
                console.log('Letters guessed: ' + guessedLetters)
                console.log('Guesses reamaining: ' + guessesRemaining)
            } else {
                console.log('CORRECT!!')

                if (currentWord.checkWord() === true) {
                    console.log('')
                    console.log(currentWord.wordRender())
                    console.log('')
                    console.log('----- YOU WIN -----')
                    startGame()
                } else {
                    console.log('Guesses remaining: ' + guessesRemaining)
                    console.log('')
                    console.log(currentWord.wordRender())
                    console.log('')
                    console.log('Letters guessed: ' + guessedLetters)
                }
            }

            // if guessesRemaining and the current word isn't found prompt the user
            if (guessesRemaining > 0 && currentWord.wordFound === false) {
                promptUser();
            } else if (guessesRemaining === 0) { 
                console.log('')                
                console.log('----- GAME OVER -----')
                console.log('')
                console.log('The correct word was: ' + currentWord.word)
                console.log('')                
            }
        } else { 
            console.log("You've guessed that letter already, try again.")
            promptUser();
        }
    })
}
