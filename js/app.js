/*
 * Create a list that holds all of your cards
 */
const lookup =["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/**
* @description Shuffles an array
* @param {array} array - the array that needs to be shuffled
* @@returns {array} - The shuffled array
*/
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

/**
* @description Initialized the game
*/
function initialize(){
    resetCard();
    var shuffledArray = shuffle(lookup);
    var cards = $("li.card");
    shuffledArray.forEach((value,index)=>{
        $(cards[index]).children(".fa").addClass(value);
    }, this);

}

/**
* @description clear any existing class on card
*/
function resetCard(){
    var cards = $("li.card");
    for(var i =0; i<cards.length;i++){
        $(cards[i]).children(".fa").removeClass(function(index, className) {
            //return $( this ).prev().attr( "class" );
            $( this ).removeClass(className);
            $( this ).addClass("fa");
          })

          $(cards[i]).removeClass("match").removeClass("matchfail").removeClass("show").removeClass("open");
    }
}

/**
* @description check the status of the game
*/
function checkGame(){
    var open_cards = $("li.card.open.show");
    if(open_cards.length==2){
        var openCardClass = $(open_cards[0]).children(".fa").attr('class').replace("fa", "").trim();
        if($(open_cards[1]).children(".fa").hasClass(openCardClass)){
            $(open_cards[0]).removeClass("matchfail").removeClass("show").removeClass("open").addClass("match");
            $(open_cards[1]).removeClass("matchfail").removeClass("show").removeClass("open").addClass("match");
        }
        else{
            $(open_cards[0]).addClass("matchfail");
            $(open_cards[1]).addClass("matchfail");
            setTimeout(()=>{
                $(open_cards[0]).removeClass("matchfail").removeClass("show").removeClass("open");
                $(open_cards[1]).removeClass("matchfail").removeClass("show").removeClass("open");
            },350);
        }
    }
}

/**
* @description jQuery document ready function
*/
$(()=>{
    $("ul.deck").hide();
    $(".restart").click((e)=>{
        $("ul.deck").hide();
        $(".info-panel").slideUp(1000);
        initialize();
        setTimeout(()=>{
            $("ul.deck").slideDown(1000);
        },1000);
    });

    //Wiring click on tile to open/close tile
    $("li.card").click((e)=>{
        if($(e.target).hasClass("match"))return;
        $(e.target).toggleClass("show").toggleClass("open");
        checkGame();
    });

    //Wiring click on tile icon to open/close tile
    $("li.card>i.fa").click((e)=>{
        if($(e.target).parent().hasClass("match"))return;
        $(e.target).parent().toggleClass("show").toggleClass("open");
        checkGame();
    });
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

