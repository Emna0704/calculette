import React from 'react';
import '../css/Button.css';

export default function OperatorButton({ operator, onClick }) {
  const buttonClass = operator === 'Reset' ? '  reset-button' : 'button operator-button';

  return (
    <button className={buttonClass} onClick={() => onClick(operator)}>
      {operator}
    </button>
  );
}
