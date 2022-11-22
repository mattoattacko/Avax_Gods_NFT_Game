import React from 'react';

import styles from '../styles';

//regex for all characters A-Z, a-z, 0-9, and space
const regex = /^[A-Za-z0-9]+$/;

//these values are being passed from Home
const CustomInput = ({ label, placeholder, value, handleValueChange }) => {
  return (
    <>
      <label htmlFor='name' className={styles.label}>
        {label}
      </label>

      {/* regex.test(e.target.value) means did it pass our test of being a character or number */}
      <input 
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if(e.target.value === '' || regex.test(e.target.value)) handleValueChange(e.target.value)
        }}
        className={styles.input} //w/o this styling, the input field is a long white text box
      />
    </>
  )
}

export default CustomInput
