import React from 'react';
import { ShowsCarousel } from '../components/shows/ShowsCarousel';

import "./StanHome.css";
import { HeaderWithFilters } from '../components/header/HeaderWithFilters';

export const StanHome = () => {
  return (
    <div className='stan-home'>
      <div className='stan-home-header'>
        <HeaderWithFilters />
      </div>
      <div className='stan-home-shows'>
        <ShowsCarousel />
      </div>
    </div>
  );
};
