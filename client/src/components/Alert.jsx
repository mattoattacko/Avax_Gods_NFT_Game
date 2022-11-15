import React from 'react'

import { AlertIcon } from '../assets'
import styles from '../styles'

//'type' is success info or error
const Alert = ({ type, message }) => {
  return (
    <div className={`${styles.alertContainer} ${styles.flexCenter}`}>
      <div className={`${styles.alertWrapper} ${styles[type]}`}>
        {/* styles[type] will show styles for info, error or success depending on which it is */}
          <AlertIcon type={type} /> {message}
      </div>
    </div>
  )
}

export default Alert