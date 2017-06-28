var PokeApp = (function() {
  'use strict';
  // placeholder for cached DOM elements
  var DOM = {}
    , curPuzzle = [];

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$generateButton = $("#generate");
    // DOM.$numberOfPuzzlesInput = $(".")
    DOM.$addKey = $(".keyboard__add-key");
    DOM.$solutionInput = $(".solution__input");
    DOM.$resetButton = $(".keyboard__reset");
    DOM.$compareButton = $(".keyboard__compare");
    DOM.$replayButton = $(".start__replay");
    DOM.$resetButton = $(".start__reset");
  }

  // bind events
  function bindEvents() {
    DOM.$generateButton.on("click", _onStartButton);
    DOM.$addKey.on("click", addToInput);
    DOM.$resetButton.on("click", _onResetButton);
    DOM.$compareButton.on("click", compareInput);
    DOM.$replayButton.on("click", _onReplayButton);
  }

  // set element click function
  function _onStartButton() {
    if(DOM.$generateButton.data("state") == "start") {
      generateMemory();
      setCheckButton();
    }
    else {
      compareInput();
    }
  }

  function _onReplayButton() {
    replayPuzzle();
  }

  function _onResetButton() {
    generateMemory();
  }


  // functions

  function resetPuzzle() {
    generateMemory();
  }

  function setCheckButton() {
    var curState = DOM.$generateButton.data("state");

    if(curState == "start") {
      DOM.$generateButton.data("state", "replay").text("Check");
    }
  }

  function replayPuzzle() {
    console.log(curPuzzle);
  }


  // extend this function with user input, to select the number of puzzles
  function generateMemory() {
    // if(numberOfPuzzles == "undefined") {
    //   numberOfPuzzles = 5;
    // }

    var min = 0
      , max = 5
      , puzzleArray = []
      , numberOfPuzzles = 3;

    for (var i = 0; i < numberOfPuzzles; i++) {
      puzzleArray.push( Math.floor(Math.random() * (max - min + 1)) + min );
    }
    

    console.log(puzzleArray);

    curPuzzle = puzzleArray;
  }

  function addToInput() {
    var dataNumber = $(this).data("number")
      , value = DOM.$solutionInput.val() + dataNumber + " ";

    DOM.$solutionInput.val(value);

  }

  function getInput() {
    return DOM.$solutionInput.val();
  }

  function resetInputField(argument) {
    DOM.$solutionInput.val("");
  }

  function compareInput() {
    console.log("cur: " + curPuzzle);
    console.log("input: " + getInput());
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