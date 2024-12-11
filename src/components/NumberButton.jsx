import React from 'react';
import '../css/Button.css';

export default function NumberButton({ number, onClick }) {
  return (
    <button className="button number-button" onClick={() => onClick(number)}>
      {number}
    </button>
  );
}
