import React from 'react'
import {Spinner} from 'react-bootstrap';

function ButtonSpinner() {
  return (
    <div className="button-spinner__container">
    <Spinner className="button-spinner__spinner" animation="border" role="status"></Spinner>
    </div>
  )
}

export default ButtonSpinner