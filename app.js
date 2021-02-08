// $("#keyboard-upper-container").hide() 

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];

let sentI = 0;
let letterI = 0;

startTime = new Date();
errorCounter = 0;




$('#keyboard-upper-container').hide();
$('#sentence').append(sentences[sentI]);
$('#target-letter').append(sentences[sentI][letterI]);






$('body').keydown(function (e) {
    if (e.which === 16) {
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
        console.log('keypress');
    }
})

$('body').keyup(function (e) {
    $('.highlight').removeClass('highlight');
    if (e.which === 16) {
        $('#keyboard-lower-container').show();
        $('#keyboard-upper-container').hide();
        console.log('keyup');
    }
})

$('body').keypress(function (e) {

    highlightKey(e.which);
    moveBlock();
    if (sentI === sentences.length) {
        gameOver();
        return;
    }
    if (letterI === (sentences[sentI].length) - 1) {
        loadNewSentence();
    } else {
        checkRightOrWrong(e.which);
        adjustTarget();
    }
})

function checkRightOrWrong(key) {
    if (key === sentences[sentI].charCodeAt(letterI)) {
        let correct = $('<span class="glyphicon glyphicon-ok"></span>');
        $('#feedback').append(correct);
    } else {
        let incorrect = $('<span class="glyphicon glyphicon-remove"></span');
        errorCounter++;
        $('#feedback').append(incorrect);
    }
}

function adjustTarget() {
    letterI++;
    $('#target-letter').text(sentences[sentI][letterI]);
}

function moveBlock() {
    $('#yellow-block').css('left', '+=17.5px');
}

function highlightKey(key) {
    $('#' + key).addClass('highlight');
}


function loadNewSentence() {
    letterI = 0;
    sentI++;
    if (sentI === sentences.length) {
        return;
    }
    $('#sentence').text(sentences[sentI]);
    $('#target-letter').text(sentences[sentI][letterI])
    $('#yellow-block').css('left', '0px');
    $('#feedback').empty();
}

function gameOver() {
    let endTime = new Date();
    numberOfWords = 54;
    diff = Math.abs(startTime - endTime);
    minutes = Math.floor((diff/1000)/60);
    numberOfMistakes = errorCounter;
    let wpm = (numberOfWords / minutes - 2 * numberOfMistakes);
    alert('You typed ' + wpm + ' words per minute!');
    console.log(endTime.getSeconds());
    $('#prompt-container').prepend('<button onClick= "window.location.reload();">Play Again?</button>');
}






let charCount = 0