import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderWithFilters } from '../components/header/HeaderWithFilters';

// VSCode doesn't like style module imports, likely due to the missing tsconfig file. But webpack imports it all file so for now I'm not too worried, but would be fairly high on my todo list.
import styles from './styles/StanLayout.module.css';

interface IStanLayout { }

export const StanLayout = (props: IStanLayout) => {
  return (
    <div>
      <div className={styles.stanHomeHeader}>
        <HeaderWithFilters />
      </div>
      <Outlet />
    </div>
  );
};
