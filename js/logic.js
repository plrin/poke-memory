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
  }

  // bind events
  function bindEvents() {
    DOM.$generateButton.on("click", generateMemory);
    DOM.$addKey.on("click", addToInput);
    DOM.$resetButton.on("click", resetInputField);
    DOM.$compareButton.on("click", compareInput);
  }


  // extend this function with user input, to select the number of puzzles
  function generateMemory() {
    // if(numberOfPuzzles == "undefined") {
    //   numberOfPuzzles = 5;
    // }

    var min = 0
      , max = 5
      , puzzleArray = []
      , numberOfPuzzles = 4;

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