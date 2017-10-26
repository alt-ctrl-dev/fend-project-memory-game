//Variables
var moves, hasPlayed, myTimer, timer;
var moveText, starsUI, starsUIArray = [], timerUI;
/*
 * Create an array of card faces
 */
const lookup = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

/**
 * @description Shuffles an array
 * @param {array} array - the array that needs to be shuffled
 * @@returns {array} - The shuffled array
 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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
function initialize() {
    resetCard();

    timer=0;
    for (var index = 0; index < starsUIArray.length; index++) {
        starsUIArray[index].appendTo(starsUI);
    }
    starsUIArray = [];

    hasPlayed = false;
    timerUI.text("00:00");
    moves = 0;
    moveText.text(moves);

    if(myTimer) clearInterval(myTimer);
    myTimer = setInterval(timer_Tick, 1000);
}

/**
 * @description clear any existing class on card
 */
function resetCard() {
    var cards = $("li.card");
    for (var i = 0; i < cards.length; i++) {
        $(cards[i]).children(".fa").removeClass(function (index, className) {
            //return $( this ).prev().attr( "class" );
            $(this).removeClass(className);
            $(this).addClass("fa");
        })

        $(cards[i]).removeClass("match").removeClass("matchfail").removeClass("show").removeClass("open");
    }
    var shuffledArray = shuffle(lookup);
    var cards = $("li.card");
    shuffledArray.forEach((value, index) => {
        $(cards[index]).children(".fa").addClass(value);
    }, this);
}

/**
 * @description check the status of the game
 */
function checkGame() {
    var open_cards = $("li.card.open.show");
    if (open_cards.length == 2) {
        var openCardClass = $(open_cards[0]).children(".fa").attr('class').replace("fa", "").trim();
        if ($(open_cards[1]).children(".fa").hasClass(openCardClass)) {
            $(open_cards[0]).removeClass("matchfail").removeClass("show").removeClass("open").addClass("match");
            $(open_cards[1]).removeClass("matchfail").removeClass("show").removeClass("open").addClass("match");
        } else {
            $(open_cards[0]).addClass("matchfail");
            $(open_cards[1]).addClass("matchfail");
            setTimeout(() => {
                $(open_cards[0]).removeClass("matchfail").removeClass("show").removeClass("open");
                $(open_cards[1]).removeClass("matchfail").removeClass("show").removeClass("open");
            }, 350);
        }
        moves++;
        hasPlayed = true;
    }
    updateUI();
}

/**
 * @description Updates all UI Elements
 */
function updateUI() {
    moveText.text(moves);
    if (hasPlayed) {
        if (moves == 24)
            starsUIArray.push(starsUI.children().first().detach());
        else if (moves == 18)
            starsUIArray.push(starsUI.children().first().detach());
        else if (moves == 12)
            starsUIArray.push(starsUI.children().first().detach());
        hasPlayed = false;
    }
}

/**
 * @description Callback for timer tick
 */
function timer_Tick() {
    timer++;
    timerUI.text(formatSeconds(timer));
}

/**
 * @description Formats a number to MM:SS
 * @param {numnber} seconds - the number that needs to be formatted
 * @returns {string} - In the format MM:SS
 */
function formatSeconds(seconds) {
    let secs = seconds % 60;
    let mins = Math.floor(seconds / 60);
    return ((mins<9?("0"+mins):mins)+":"+(secs<9?("0"+secs):secs))
}



/**
 * @description jQuery document ready function
 */
$(() => {
    moveText = $("span.moves");
    starsUI = $("ul.stars");
    timerUI = $("span.time");
    $("ul.deck").hide();
    $(".restart").click((e) => {
        $("ul.deck").hide();
        $(".info-panel").slideUp(1000);
        initialize();
        setTimeout(() => {
            $("ul.deck").slideDown(1000);
        }, 1000);
    });

    //Wiring click on tile to open/close tile
    $("li.card").click((e) => {
        if($(e.currentTarget).hasClass("match"))return;
        $(e.currentTarget).addClass("show").addClass("open");
        checkGame();
    });

    // //Wiring click on tile icon to open/close tile
    // $("li.card>i.fa").click((e)=>{
    //     //if($(e.target).parent().hasClass("match") || $(e.target).parent().hasClass("open"))e.preventDefault();
    //     $(e.target).parent().addClass("show").addClass("open");
    //     checkGame();
    // });
});