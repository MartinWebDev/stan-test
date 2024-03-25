import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventListener } from 'usehooks-ts';
import { useShowContext } from '../context/ShowContextProvider';
import { useShowsService } from '../hooks/useShowsService';
import { HeaderWithFilters } from '../components/header/HeaderWithFilters';

import "./StanShow.css";
import { ShowType } from '../models/ShowType';
import { InfoSlots } from '../components/shows/show-info/InfoSlots';

type StandShowParams = {
  showId: string;
}

export const StanShow = () => {
  const { showId = "" } = useParams<StandShowParams>();
  const navigate = useNavigate();
  const showContext = useShowContext();
  const { shows, error, loading } = useShowsService(showContext);

  console.log({ shows, error, loading });

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === "Backspace") {
      navigate("/");
    }
  };
  useEventListener('keydown', handleKeyPress);

  // If we are loading, we will show the loading screen and return out before we hit any null issues, so it's ok to give this a definite assignment.
  const show = shows.find(x => x.id === Number(showId))!;

  if (loading) {
    return (<h2>Loading...</h2>);
  }

  const infoSlots = [
    show.rating,
    show.year.toString(),
    // Movies don't have seasons, so omit this value for those.
    ...(show.type === ShowType.SERIES) ? [`${show.seasons} seasons`] : [],
    show.genre,
    show.language
  ];

  return (
    <div className='stan-show'>
      <div className='stan-show-header'>
        <HeaderWithFilters />
      </div>
      {error && (<div>An unknown error occurred. Please try again later.</div>)}
      <div className='stan-show-content'>
        <div className='stan-show-image'><img src={show.image} /></div>
        <div className='stan-show-info'>
          <div className='stan-show-info-header'>
            <div className='stan-show-info-header-title'>{show.title}</div>
            <div className='stan-show-info-header-details'>
              <InfoSlots slots={infoSlots} />
            </div>
          </div>
          <div className='stan-show-info-description'>{show.description}</div>
        </div>
      </div>
    </div>
  );
};
