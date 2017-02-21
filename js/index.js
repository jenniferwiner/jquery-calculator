$(document).ready(function() {

  let operandFirst = "";
  let operandSec = "";
  let clickedOperator = false;
  let operator = "";
  let total = "";


  function clear() {
    operandFirst = "";
    operandSec = "";
    clickedOperator = false;
    operator = "";
    total = "";
  }

  // for when press = but want to continue operations
  // e.g., 4 + 3 = 7 + 1 = 8...
  function clearButContinue() {
    operandSec = "";
    clickedOperator = false;
    operator = "";
    operandFirst = total;
  }

  let operators = {
    '+': function(a, b) {
      return a + b
    },
    '-': function(a, b) {
      return a - b
    },
    '÷': function(a, b) {
      return a / b
    },
    'x': function(a, b) {
      return a * b
    }
  }

  // rounding!
  function roundTo(number, decimals) {
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  $("span").click(function() {

    // create first operand. Must be more than 1 digit
    if (!$(event.target).hasClass("operator") && !clickedOperator && operandFirst.length < 10) {
      operandFirst += event.target.innerText
      $("#screen").text(operandFirst);
    }

    // operator
    if ($(event.target).hasClass("operator") && $(event.target).attr("id") === undefined && !clickedOperator && operandFirst !== "") {
      clickedOperator = true;
      operator = event.target.innerText;
      $("#screen").text(operandFirst + operator);
    }

    // second operand
    if (!$(event.target).hasClass("operator") && clickedOperator) {
      operandSec += event.target.innerText;
      $("#screen").text(operandFirst + operator + operandSec);
    }

    // equals

    if ($(event.target).hasClass("operator") && $(event.target).attr("id") === "equals") {
      if (operator === "÷" && operandSec === "0") {
        $("#screen").text("ERROR");
        clear();
      }
      else {
        let unroundedTotal = operators[operator](parseFloat(operandFirst), parseFloat(operandSec));
        total = roundTo(unroundedTotal, 10);
        clearButContinue();
        $("#screen").text(total);
      }
    }

    // clear it!
    if ($(event.target).hasClass("operator") && $(event.target).attr("id") === "clear") {
      clear();
      $("#screen").text("");
    }
  });


})
