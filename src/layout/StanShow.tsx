import React from 'react';
import { useParams } from 'react-router-dom';
import { useShowContext } from '../context/ShowContextProvider';
import { useShowsService } from '../hooks/useShowsService';

type StandShowParams = {
  showId: string;
}

export const StanShow = () => {
  const { showId } = useParams<StandShowParams>();
  const showContext = useShowContext();
  const { shows, error, loading } = useShowsService(showContext);

  return (
    <h1>{showId}</h1>
  );
};
