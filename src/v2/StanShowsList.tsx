import React from 'react';
import { UnknownError } from './UnknownError';
import { ShowCarousel } from './components/carousel/ShowCarousel';
import { useShowsService } from '../hooks/useShowsService';
import { useShowContext } from '../context/ShowContextProvider';

import styles from "./styles/StanShowsList.module.css";

interface IStanShowsList { }

export const StanShowsList = (props: IStanShowsList) => {
  const showContext = useShowContext();
  const { shows, error, loading } = useShowsService(showContext);

  if (error) {
    return <UnknownError />;
  }

  return (
    <div className={styles.carousel}>
      <ShowCarousel shows={shows} />
    </div>
  );
};
