import React from 'react';
import styles from './styles/UnknownError.module.css';

export const UnknownError = () => {
  return (
    <div className={styles.error}>An unknown error occurred. Please try again later.</div>
  );
};
