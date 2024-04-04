import React from 'react';
import classnames from 'classnames/bind';
import { Show } from '../../models/Show';

import styles from "./styles/ShowCarouselTile.module.css";
import { useIntersectionObserver } from 'usehooks-ts';
const cn = classnames.bind(styles);

interface IShowCarouselTile {
  show: Show;
  active: boolean;
}

// These tiles have a fairly high amount of knowledge of the world around them. This is somewhat necessary in order to ensure 5 tiles are always visible
// (and a 6th slipping off the screen) since each tile needs to take up exactly 20 % of the viewable area.
export const ShowCarouselTile = ({ show, active = false }: IShowCarouselTile) => {
  // TODO: Test performance on this! One observer is nothing really, but dozens? Could be an issue.
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div className={styles.showTile} ref={ref}>
      <div className={cn([styles.showTileInner, { active }])}>
        {isIntersecting && <img src={show.image} />}
      </div>
    </div>
  );
};
