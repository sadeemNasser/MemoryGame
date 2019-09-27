let openedCards = [];
let matchedCards = [];
let modal = document.getElementById("popup-box")
let closeicon = document.getElementById("close");
let isFirstClick = true;
let liveTimer;
let totalSeconds = 0;
let moves = 0;
const cardsContainer = document.querySelector(".deck");
const starsContainer = document.getElementById("stars");
const movesContainer = document.querySelector(".moves");
const star = `<li><i class="fa fa-star"></i></li>`;
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];


function init() {
    shuffle(icons);
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);
        starsContainer.innerHTML = star + star + star;
        movesContainer.innerHTML = 0;

        click(card);
    }
}

function click(card) {

    card.addEventListener("click", function() {
        if(isFirstClick) {
            startTimer();
            isFirstClick = false;
        }
        const currentCard = this;
        const previousCard = openedCards[0];
        if(openedCards.length === 1) {
            card.classList.add("open", "show", "disable");
            openedCards.push(this);
            compare(currentCard, previousCard);
        } else {
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
        
    });
}

function compare(currentCard, previousCard) {

    if(currentCard.innerHTML === previousCard.innerHTML) {                
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matchedCards.push(currentCard, previousCard);
        openedCards = [];
        isOver();
    } else {
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
        }, 500);
        openedCards = [];
    }
    addMove();
}




function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    rating();
}


function rating() {

    if( moves < 10) {
        stars = star + star + star;
    } else if( moves < 15) {
        stars = star + star;
    } else {
        stars = star;
    }
    starsContainer.innerHTML = stars;

}



 function startTimer() {
    liveTimer = setInterval(function() {
        totalSeconds++;
    }, 1000);
}

function stopTimer() {
    clearInterval(liveTimer);
}



function reset() {
    cardsContainer.innerHTML = "";
    init();
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
}
function isOver() {
    if(matchedCards.length === 16) {
        modal.classList.add("show");
        document.getElementById("final-move").innerHTML = moves;
        document.getElementById("star-rating").innerHTML = stars;
        document.getElementById("total-time").innerHTML = totalSeconds +' seconds';
        stopTimer();
        closeModal();
    }
}
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
    });
}

function playAgain(){

    modal.classList.remove("show");
    reset();
}

init();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

