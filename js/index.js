$(document).ready(function() {

  function clear() {
    operandFirst = "";
    operandSec = "";
    clickedOperator = false;
    operator = "";
    total = ""
  }

  //call clear to create my variables
  clear();

  //for when press = but want to continue operations
  //e.g., 4 + 3 = 7 + 1 = 8...
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


  $("span").click(function() {

    //create first operand. Must be more than 1 digit
    if (!$(event.target).hasClass("operator") && !clickedOperator) {
      operandFirst += event.target.innerText
      $("#screen").text(operandFirst);
    }

    //operator //.not("operator").not(#equals, #c)
    if ($(event.target).hasClass("operator") && $(event.target).attr("id") === undefined) {
      clickedOperator = true;
      operator = event.target.innerText;
      $("#screen").text(operandFirst + operator);

    }

    //second operand
    if (!$(event.target).hasClass("operator") && clickedOperator) {
      operandSec += event.target.innerText;
      $("#screen").text(operandFirst + operator + operandSec);
    }

    //equals

    if ($(event.target).hasClass("operator") && $(event.target).attr("id") === "equals") {
      if (operator === "÷" && operandSec === "0") {
        $("#screen").text("ERROR");
        clear();

      } else {
        total = operators[operator](parseFloat(operandFirst), parseFloat(operandSec));
        clearButContinue();
        $("#screen").text(total);
      }
    }

    //clear it!
    if ($(event.target).hasClass("operator") && $(event.target).attr("id") === "clear") {
      clear();
      $("#screen").text("");
    }

    //check for errors!
  })


});
