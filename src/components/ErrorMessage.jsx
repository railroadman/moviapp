// components/ErrorMessage.jsx
import React from 'react'
import '../css/ErrorMessage.css' // Подключаем стили

const ErrorMessage = ({ message }) => {
  return (
    <div className='error-message'>
      <h2>Oops! Something went wrong.</h2>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
