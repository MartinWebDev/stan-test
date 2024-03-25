import React from 'react';
import { useShowContext } from '../../context/ShowContextProvider';
import { useShowsService } from '../../hooks/useShowsService';
import { useSelectedIndex } from '../../hooks/useSelectedIndex';

import "./ShowsCarousel.css";
import { ShowSlide } from '../ShowCarousel/ShowSlide';

export const ShowsCarousel = () => {
  const showContext = useShowContext();
  const { shows, error, loading } = useShowsService(showContext);
  const { selectedIndex, onLeftMove, onRightMove } = useSelectedIndex();

  console.log({ shows, error, loading });

  return (
    <div className='show-carousel'>
      <div className='show-carousel-content'>
        {/*
        Note: Even my own opinion is divided on whether or not to make this a component. In the app as is now it's literally just a single line of html, so why create the react overhead? But do we want to future proof it?
        I'd say the best approach here is to leave it as is for now, but the moment we wanted to add more to it, move it out to its own component. Does that ever happen in practice though?
        Honestly... Sometimes, as long as a good coding standards document is in place and followed.
        */}
        {error && (<div>An unknown error occurred. Please try again later.</div>)}

        {/*
        Since this won't do anything under error conditions given an empty array, I feel comfortable to keep it inline without an "else" check on the error state. 
        In practice only one will ever be visible (with this current project requirements at least). If however there to be a method of refetching the data, or there was any way that data fetching could
        occur while existing data was in memory, we'd want a way to hide this existing data under those error conditions. Or at least, maybe. Maybe we still allow the user to browse data they already fetched. 
        Long story short, there isn't enough information at this time to make that decision and would need to go under discussion with the wider team (BAs and the like).
        */}
        {
          shows.map((show, idx) => {
            return (
              <ShowSlide key={show.id} show={show} selected={idx === selectedIndex} />
            );
          })
        }
      </div>
    </div>
  );
};
