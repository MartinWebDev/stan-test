import React from 'react';
// TODO: VSCode is unhappy about importing svgs at the moment, so some config is clearly missing from the setup of this project.
// Since it works nonetheless, this is low enough priotity to ignore at this time.
import stanLogo from '../../logo.svg';
import "./HeaderWithFilters.css";

interface IHeaderWithFilters { }

export const HeaderWithFilters = (props: IHeaderWithFilters) => {
  return (
    <>
      <img className='stan-logo' src={stanLogo} />
      {/* In real app, or if filter functionality was needing to be working, this would be at least one other component, if not a bunch of nested ones. But here, it's fine just hardcoded this way */}
      {/* Additionally, given the context of this component it would also make sense to pass the filter buttons in so it can be reused and more importantly dynamic. */}
      <div className='stan-home-filters'>
        <div className='stan-home-filter-button active'>Home</div>
        <div className='stan-home-filter-button'>TV Shows</div>
        <div className='stan-home-filter-button'>Movies</div>
      </div>
    </>
  );
};
