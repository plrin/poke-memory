var PokeApp = (function() {
  'use strict';
  // placeholder for cached DOM elements
  var DOM = {}
    , curPuzzle = []
    , userInput = [];

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$generateButton = $("#generate");
    DOM.$resetButton = $(".keyboard__reset");
    DOM.$replayButton = $(".start__replay");
    DOM.$resetButton = $(".start__reset");
    DOM.$dragKey = $(".drag-zone__sound-key");
    DOM.$boxOne = $("#drop-zone__box-one");
    DOM.$boxTwo = $("#drop-zone__box-two");
    DOM.$boxThree = $("#drop-zone__box-three");
    DOM.$dropbox = $(".drop-zone__box");
    DOM.$resultBox = $(".result-box");
    DOM.$resultText = $(".result-box__text");
    DOM.$resultClose = $(".result-box__close");
  }

  // bind events
  function bindEvents() {
    DOM.$generateButton.on("click", _onStartButton);
    DOM.$resetButton.on("click", _onResetButton);
    DOM.$replayButton.on("click", _onReplayButton);
    DOM.$dragKey.on("click", _onDragKey);
    DOM.$resultClose.on("click", _onResultClose);
  }

  // set element click function
  function _onStartButton() {
    if(DOM.$generateButton.data("state") == "start") {
      generateMemory();
      setCheckButton();
    }
    else {
      showResult();
    }
  }

  function _onReplayButton() {
    replayPuzzle();
  }

  function _onResetButton() {
    resetGame();
    animateToOrigin();
  }

  function _onDragKey() {
    var $this = $(this);
    var curState = DOM.$generateButton.data("state");
    // only allow animation, when game is started
    if(curState == "check") {
      animateToDropbox($this);
      setDragboxState();
      addToInput($this);
    }
  }

  function _onResultClose() {
    DOM.$resultBox.hide();
  }


  // functions

  function showResult() {

    DOM.$resultText.removeClass("right wrong");

    if(compareInput()) {
      DOM.$resultText.addClass("right").text("ITZ REIT :))))");
    } else {
      DOM.$resultText.addClass("wrong").text("WONG :((((");
    }

    DOM.$resultBox.show();

  }

  function resetGame() {

    var curState = DOM.$generateButton.data("state");

    if(curState == "check") {
      DOM.$generateButton.data("state", "start").text("Start");
    }

    curPuzzle = [];
    userInput = [];
  }

  function setCheckButton() {
    var curState = DOM.$generateButton.data("state");

    if(curState == "start") {
      DOM.$generateButton.data("state", "check").text("Check");
    }
  }

  function replayPuzzle() {
    console.log(curPuzzle);
  }


  // extend this function with user input, to select the number of puzzles
  function generateMemory() {
    var min = 1
      , max = 5
      , numberOfPuzzles = 3;
    
    while( curPuzzle.length < numberOfPuzzles) {
      var tmp = Math.floor(Math.random() * (max - min + 1)) + min;

      if(!curPuzzle.includes(tmp)) {
        curPuzzle.push(tmp);
      }
    }

    console.log(curPuzzle);
  }

  function addToInput($el) {
    var dataNumber = $el.data("number");

    // check validation
    // no same input, no more than 3 inputs allowed

    if( userInput.length <= 3 && 
        !userInput.includes(dataNumber) ) {
      userInput.push(dataNumber);
    }
  }

  function resetInputField(argument) {
    DOM.$solutionInput.val("");
  }

  function compareInput() {
    console.log("cur: " + curPuzzle);
    console.log("input: " + userInput);

    var l = curPuzzle.length
      , res = false;

    if(curPuzzle.length === userInput.length) {
      
      for (var i = curPuzzle.length - 1; i >= 0; i--) {
        if (curPuzzle[i] === userInput[i]) {
          res = true;
        } else {
          break;
        }
      }
    }

    console.log("result: " + res);

    return res;
  }

  function setDragboxState() {
    if(!DOM.$boxOne.hasClass("check")) {
      DOM.$boxOne.addClass("check");
    }
    else if(!DOM.$boxTwo.hasClass("check")) {
      DOM.$boxTwo.addClass("check");
    }
    else if(!DOM.$boxThree.hasClass("check")) {
      DOM.$boxThree.addClass("check");
    }
  }

  // ---------------
  // animation functions and stuff
  // ---------------

  function getDropPosition($el) {

    var $curBox = null
      , x = null
      , y = null
      , marginOffset = 10;

    if(!DOM.$boxOne.hasClass("check")) {
      $curBox = DOM.$boxOne;
    }
    else if(!DOM.$boxTwo.hasClass("check")) {
      $curBox = DOM.$boxTwo;
    }
    else if(!DOM.$boxThree.hasClass("check")) {
      $curBox = DOM.$boxThree;
    }

    if($curBox != null) {
      x = $curBox.offset().left + marginOffset;
      y = $curBox.offset().top + marginOffset;
    } else {
      // stay at origin
      x = getDragPosition($el).x;
      y = getDragPosition($el).y;
    }
    
    return {"x": x, "y": y};
  }

  function getDragPosition($el) {
    var x = $el.offset().left
    , y = $el.offset().top;

    return {"x": x, "y": y};
  }

  function calculateTransformDistance(startX, startY, endX, endY) {

    var distX = endX - startX
      , distY = endY - startY;

    return {"x": distX, "y": distY};
  }

  function animateToDropbox($el) {

    var res = calculateTransformDistance(
              getDragPosition($el).x, 
              getDragPosition($el).y, 
              getDropPosition($el).x, 
              getDropPosition($el).y);

    var x = res.x
      , y = res.y;
    
    TweenMax.to($el.get(), 1, { x: x, y: y, ease:Power1.easeIn });
  }

  function animateToOrigin() {
    DOM.$dropbox.removeClass("check");

    TweenMax.to(DOM.$dragKey.get(), 1, { x: 0, y: 0, ease:Power1.easeInOut });
  }




  /* =================== public methods ================== */
  // main init method
  function init() {
    cacheDom();
    bindEvents();
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());