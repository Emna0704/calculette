import React, { useReducer } from 'react';
import OperatorButton from './OperatorButton';
import NumberButton from './NumberButton';
import Display from './Display';
import '../css/Button.css'; 
import '../css/Display.css'; 
import '../css/Calculator.css'; 

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'NUMBER':
      if (state.overwrite) {
        return {
          ...state,
          currentInput: action.payload,
          overwrite: false,
        };
      }
      if (state.currentInput === '0' && action.payload === '0') {
        return state;
      }
      return {
        ...state,
        currentInput: `${state.currentInput || ''}${action.payload}`,
      };

    case 'OPERATION':
      if (state.currentInput == null && state.previousInput == null) {
        return state;
      }
      if (state.currentInput == null) {
        return {
          ...state,
          operation: action.payload,
        };
      }
      if (state.previousInput == null) {
        return {
          ...state,
          operation: action.payload,
          previousInput: state.currentInput,
          currentInput: null,
        };
      }
      return {
        ...state,
        previousInput: evaluate(state),
        operation: action.payload,
        currentInput: null,
      };

    case 'EVALUATE':
      if (state.currentInput == null || state.previousInput == null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousInput: null,
        operation: null,
        result: evaluate(state),
        currentInput: null,
      };

    case 'RESET':
      return {};

    default:
      return state;
  }
};

const evaluate = ({ currentInput, previousInput, operation }) => {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return '';
  let result = '';
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case 'x':
      result = prev * current;
      break;
    default:
      return '';
  }
  return result.toString();
};

const Calculator = () => {  
  const [state, dispatch] = useReducer(calculatorReducer, {
    currentInput: '', 
    previousInput: null, 
    operation: null, 
    overwrite: false, 
    result: null, 
  });


  const handleNumberClick = (number) => {
    dispatch({ type: 'NUMBER', payload: number });
  };


  const handleOperatorClick = (operator) => {
    dispatch({ type: 'OPERATION', payload: operator });
  };

  
  const handleEqualClick = () => {
    dispatch({ type: 'EVALUATE' });
  };

  const handleResetClick = () => {
    dispatch({ type: 'RESET' });
  };

  const { currentInput, result } = state;

  return (
    <div className="calculator">
      <Display value={currentInput || result || '0'} />
      
      <div className="number-buttons">
        {[...Array(10).keys()].map((num) => (
          <NumberButton key={num} number={num} onClick={handleNumberClick} />
        ))}
      </div>
      
      <div className="operator-buttons">
        <OperatorButton operator="+" onClick={handleOperatorClick} />
        <OperatorButton operator="-" onClick={handleOperatorClick} />
        <OperatorButton operator="x" onClick={handleOperatorClick} />
        <OperatorButton operator="=" onClick={handleEqualClick} />
        <OperatorButton operator="Reset" onClick={handleResetClick} />
      </div>
    </div>
  );
};

export default Calculator;  
