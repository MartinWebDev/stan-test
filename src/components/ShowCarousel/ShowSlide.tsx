import React from 'react';
import { Show } from '../../models/Show';
import "./ShowSlide.css";

interface IShowSlide {
  show: Show;
  selected?: boolean;
  // Considered using intersection observer for this, but it gets a little messy when we want to hide the end of the last item from the previous page but show the start of the first image of the next page.
  // So instead, keep it simple stupid, and determine if they are visible if they are the current page. We can then show the first of the next page by simply adding 1 to the current page size.
  shouldRenderImage?: boolean;
}

export const ShowSlide = ({ show, selected, shouldRenderImage }: IShowSlide) => {
  return (
    // Here we see our first instance where a css library or two would come in handy. Specifically "classnames" as the "bind" function works really nicely for conditional styles like we have below.
    <div className={`show-slide ${selected ? 'selected' : ''}`}>
      <img src={shouldRenderImage ? show.image : undefined} />
    </div>
  );
};
