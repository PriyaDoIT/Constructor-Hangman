var Letter = function (letter) {
    this.letter = letter
    this.display = false

    // function that controls blank space or display letter
    this.letterRender = function () {
        if (this.display === false) {
            return ' _ ';
        } else {
            return this.letter
        }
     if (this.letter == ' '){
        this.display = true;
        return ' '
    }
    }
}

module.exports = Letter