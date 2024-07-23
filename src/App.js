import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("0");

  function handleClick(e) {
    const button = e.target.value;

    // Prevent multiple initial zeroes
    if (value === "0" && button !== ".") {
      setValue(button);
    } else {
      setValue(value + button);
    }
  }

function handleDecimal() {
    // Split the current value by operators and check the last segment for a decimal
    const segments = value.split(/[\+\-\*\/]/);
    const lastSegment = segments[segments.length - 1];

    // Only add a decimal if the last segment doesn't already contain one
    if (!lastSegment.includes(".")) {
      setValue(value + ".");
    }
  }

function handleOperation(op) {
    const lastChar = value.slice(-1);
    const secondLastChar = value.slice(-2, -1);

    // Handle consecutive operators
    if (["+", "*", "/"].includes(lastChar)) {
      setValue(value.slice(0, -1) + op);
    } else if (lastChar === "-" && ["+", "*", "/"].includes(op)) {
      setValue(value.slice(0, -1) + op);
    } else if (["+", "*", "/"].includes(secondLastChar) && lastChar === "-" && op === "-") {
      // If we already have an operator followed by a negative sign, do nothing
    } else if (["+", "*", "/", "-"].includes(lastChar) && op === "-") {
      setValue(value + op);
    } else {
      setValue(value + op);
    }
  }

  function handleEvaluate() {
    try {
      // Evaluate the expression safely
      const result = new Function('return ' + value)();
      setValue(String(result));
    } catch {
      setValue("Error");
    }
  }
  
  return (
    <div className="calculator">
      <input id="display" type="text" value={value} readOnly />
      <div className="buttons-group">
        <button id="clear" className="btn" value="AC" onClick={() => setValue("0")}>
          AC
        </button>
        <button id="delete" className="btn" value="DE" onClick={() => setValue(value.slice(0, -1) || "0")}>
          DE
        </button>
        <button id="invert" className="btn" value="+-" onClick={() => setValue(String(parseFloat(value) * -1))}>
          +/-
        </button>
        <button id="divide" className="btn" value="/" onClick={() => handleOperation("/")}>
          /
        </button>
      </div>
      <div className="buttons-group">
        <button id="seven" className="btn" value="7" onClick={handleClick}>
          7
        </button>
        <button id="eight" className="btn" value="8" onClick={handleClick}>
          8
        </button>
        <button id="nine" className="btn" value="9" onClick={handleClick}>
          9
        </button>
        <button id="multiply" className="btn" value="*" onClick={() => handleOperation("*")}>
          *
        </button>
      </div>
      <div className="buttons-group">
        <button id="four" className="btn" value="4" onClick={handleClick}>
          4
        </button>
        <button id="five" className="btn" value="5" onClick={handleClick}>
          5
        </button>
        <button id="six" className="btn" value="6" onClick={handleClick}>
          6
        </button>
        <button id="subtract" className="btn" value="-" onClick={() => handleOperation("-")}>
          -
        </button>
      </div>
      <div className="buttons-group">
        <button id="one" className="btn" value="1" onClick={handleClick}>
          1
        </button>
        <button id="two" className="btn" value="2" onClick={handleClick}>
          2
        </button>
        <button id="three" className="btn" value="3" onClick={handleClick}>
          3
        </button>
        <button id="add" className="btn" value="+" onClick={() => handleOperation("+")}>
          +
        </button>
      </div>
      <div className="buttons-group">
        <button id="zero" className="btn" value="0" onClick={handleClick}>
          0
        </button>
        <button id="decimal" className="btn" value="." onClick={handleDecimal}>
          .
        </button>
        <button id="equals" className="btn" value="=" onClick={handleEvaluate}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;
