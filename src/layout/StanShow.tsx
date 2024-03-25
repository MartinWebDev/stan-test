import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventListener } from 'usehooks-ts';
import { useShowContext } from '../context/ShowContextProvider';
import { useShowsService } from '../hooks/useShowsService';
import { HeaderWithFilters } from '../components/header/HeaderWithFilters';

import "./StanShow.css";
import { ShowType } from '../models/ShowType';
import { InfoSlots } from '../components/shows/show-info/InfoSlots';
import { SkeletonBlock } from '../components/ux/SkeletonBlock';
import { Show } from '../models/Show';

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
  // const show = shows.find(x => x.id === Number(showId))!;
  const show = shows.find(x => x.id === Number(showId));

  // Slight abstraction of certain components to here for now, refactor into their own files if time.
  const getSlots = (showData: Show) => {
    const infoSlots = [
      showData.rating,
      showData.year.toString(),
      // Movies don't have seasons, so omit this value for those.
      ...(showData.type === ShowType.SERIES) ? [`${showData.seasons} seasons`] : [],
      showData.genre,
      showData.language
    ];
    return <InfoSlots slots={infoSlots} />;
  }

  // It actually feels slightly weird not abstracting this stuff away into more components and nested it all down, and all that usual react loveliness.
  // But as performance was one of the considerations of this app, and since any new component adds at least a little overhead compared to just straight html,
  // it is slightly better this way, and only abstract away where it's completely neccessary.
  // As such, instead of abstracting the layout away and having templates for the data vs skeleton views, I've done it all inline in this instance.
  return (
    <div className='stan-show'>
      <div className='stan-show-header'>
        <HeaderWithFilters />
      </div>

      {error && (<div>An unknown error occurred. Please try again later.</div>)}

      <div className='stan-show-content'>
        <div className='stan-show-image'>
          {loading ? <SkeletonBlock width="20vw" height="50vh" /> : <img src={show!.image} />}
        </div>

        <div className='stan-show-info'>
          <div className='stan-show-info-header'>
            <div className='stan-show-info-header-title'>
              {loading ? <SkeletonBlock width={300} height={64} /> : show!.title}
            </div>
            <div className='stan-show-info-header-details'>
              {loading ? <SkeletonBlock width={500} height={32} /> : getSlots(show!)}
            </div>
          </div>
          <div className='stan-show-info-description'>
            {loading ? <SkeletonBlock width={700} height={200} /> : show!.description}
          </div>
        </div>
      </div>
    </div>
  );
};
