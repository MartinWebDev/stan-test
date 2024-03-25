import React from 'react';
import { ShowsCarousel } from '../components/shows/ShowsCarousel';
// TODO: VSCode is unhappy about importing svgs at the moment, so some config is clearly missing from the setup of this project.
// Since it works nonetheless, this is low enough priotity to ignore at this time.
import stanLogo from '../logo.svg';
import "./StanHome.css";

export const StanHome = () => {
  return (
    <div className='stan-home'>
      <div className='stan-home-header'>
        <img className='stan-logo' src={stanLogo} />
        {/* In real app, or if filter functionality was needing to be working, this would be at least one other component, if not a bunch of nested ones. But here, it's fine just hardcoded this way */}
        <div className='stan-home-filters'>
          <div className='stan-home-filter-button active'>Home</div>
          <div className='stan-home-filter-button'>TV Shows</div>
          <div className='stan-home-filter-button'>Movies</div>
        </div>
      </div>
      <div className='stan-home-shows'>
        <ShowsCarousel />
      </div>
    </div>
  );
};
