// TODO: Just realised I've nested some files incorrectly here, it's low priority at this point, but needs addressing!

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useEventListener, useMediaQuery, useResizeObserver } from "usehooks-ts";
import { useShowContext } from '../../context/ShowContextProvider';
import { useShowsService } from '../../hooks/useShowsService';
import { useSelectedIndex } from '../../hooks/useSelectedIndex';

import "./ShowsCarousel.css";
import { ShowSlide } from '../ShowCarousel/ShowSlide';

// An unchanging value in terms of component state, but really shouldn't be here, should be in a config file where it's universally accessible by the rest of the app.
const slidesVisible = 5;

// TODO: Component is getting busy, look to moving some logic around into other files, hooks, services, components, whatever else suits.
export const ShowsCarousel = () => {
  const navigate = useNavigate();
  const showContext = useShowContext();
  const { shows, error, loading } = useShowsService(showContext);
  const { selectedIndex, onLeftMove, onRightMove } = useSelectedIndex();
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const { width: carouselWidth = 0 } = useResizeObserver({
    ref: carouselContentRef,
  });
  // Another example of where a css library in some form would be useful, so we can share such breakpoint variables between css and javascript files.
  const isLargeScreen = useMediaQuery("(min-height: 1080px)");

  const handleKeyPress = (e: KeyboardEvent) => {
    // TODO: Magic string alert... kind of. It's pretty obvious what this is, and it's extremely unlikely to ever change, but ideally should still map all codes (we care about) in a file somewhere for use around the whole app, just in case.
    if (e.code === "ArrowRight" && selectedIndex < shows.length - 1) {
      onRightMove();
    }
    if (e.code === "ArrowLeft" && selectedIndex > 0) {
      onLeftMove();
    }
    if (e.code === "Enter") {
      // Get id for this index, navigate there.
      const showId = shows[selectedIndex].id;
      const navigateTo = `/${showId.toString()}`;
      navigate(navigateTo);
    }
  };
  // Keydown event used since keypress event doesn't support arrow keys.
  useEventListener('keydown', handleKeyPress);

  // Handle "page" scroll offset using a useEffect function. Every time the index changes, recalculate if we should scroll to a new page, and do so if needs be.
  useEffect(() => {
    requestAnimationFrame(() => {
      if (carouselContentRef.current) {
        const pageIndex = Math.floor(selectedIndex / slidesVisible);
        // Uh-oh Magic Number alert, again a full css library would be great for shared values like this.
        const pageIndexOffsetPadding = isLargeScreen ? 128 : 64;
        // First page needs no additional offset as it has the css padding, but all other pages do so as to display the first item of that page where the first item was.
        const pageIndexOffset = pageIndex === 0 ? 0 : ((pageIndexOffsetPadding * 2) + (pageIndexOffsetPadding / 2)) * pageIndex;
        carouselContentRef.current.scrollLeft = carouselWidth * pageIndex - pageIndexOffset;
      }
    });
  }, [selectedIndex]);

  // TODO: Loading skeleton view here...

  return (
    <div className='show-carousel' ref={carouselContentRef}>
      <div className='show-carousel-content'>
        <div className='show-carousel-content-inner'>
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
              const pageIndex = Math.floor(selectedIndex / slidesVisible);
              const shouldRenderImage = idx >= pageIndex * slidesVisible && idx <= pageIndex * slidesVisible + slidesVisible;
              return (
                <ShowSlide
                  key={show.id}
                  show={show}
                  selected={idx === selectedIndex}
                  {...{ shouldRenderImage }}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
};
