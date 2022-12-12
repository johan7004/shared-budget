import React from 'react'
import {Spinner} from 'react-bootstrap';
import './card-spinner.styles.css';

function CardSpinner() {
  return (
    <div className="card-spinner__container">
    <Spinner className="card-spinner__spinner" animation="border" role="status"></Spinner>
    </div>
  )
}

export default CardSpinner