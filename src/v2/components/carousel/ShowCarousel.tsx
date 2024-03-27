import React, { useEffect, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { Carousel } from './Carousel';
import { ShowCarouselTile } from './ShowCarouselTile';
import { useSelectedIndex } from '../../../hooks/useSelectedIndex';
import { Show } from '../../../models/Show';

import styles from "./styles/ShowCarousel.module.css";
import { useNavigate } from 'react-router-dom';

interface IShowCarousel {
  shows: Show[];
}

// ShowCarousel implements a more generic carousel component internally which handles the visual representation.
// This component handles the logic and decides how far that child component should be scrolled.
export const ShowCarousel = ({ shows }: IShowCarousel) => {
  const [scrollAmount, setScrollAmount] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const { selectedIndex, onLeftMove, onRightMove } = useSelectedIndex();

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === "ArrowRight" && selectedIndex < shows.length - 1) {
      onRightMove();
    }
    if (e.code === "ArrowLeft" && selectedIndex > 0) {
      onLeftMove();
    }
    if (e.code === "Enter") {
      const showId = shows[selectedIndex].id;
      const navigateTo = `/${showId.toString()}`;
      console.log('goto', navigateTo);
      useNavigate()(navigateTo);
    }
  };
  useEventListener('keydown', handleKeyPress);

  useEffect(() => {
    // Recalculate scroll position to keep highlight left)
    // Scroll left by tile width = selected index
    // Get single tile width. Now width due to box-sizing is solved, we can just divide
    const tileWidth = carouselWidth / shows.length;
    setScrollAmount(tileWidth * selectedIndex);
  }, [selectedIndex, carouselWidth]);

  // Alternative to this method of calculating tile width would be to use a forwardRef on the tile itself,
  // but that gets messy since we'd have to push the ref only to one tile in the array below. This is just cleaner.
  const handleCarouselWidthChange = (width: number) => {
    setCarouselWidth(width);
  };

  return (
    <div id="carousel-wrapper" className={styles.carouselWrapper}>
      <Carousel scrollBasis='pixels' scrollAmount={scrollAmount} onWidthChange={handleCarouselWidthChange}>
        {
          shows.map((show, idx) => {
            return (
              <ShowCarouselTile key={show.id} show={show} active={idx == selectedIndex} />
            );
          })
        }
      </Carousel>
    </div>
  );
};
