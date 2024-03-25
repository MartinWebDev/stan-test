import React from 'react';
import { Show } from '../../models/Show';
import "./ShowSlide.css";

interface IShowSlide {
  show: Show;
  selected?: boolean;
}

export const ShowSlide = ({ show, selected }: IShowSlide) => {
  return (
    // Here we see our first instance where a css library or two would come in handy. Specifically "classnames" as the "bind" function works really nicely for conditional styles like we have below.
    <div className={`show-slide ${selected ? 'selected' : ''}`}>
      <img src={show.image} />
    </div>
  );
};
