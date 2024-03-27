import React from 'react';
import classnames from 'classnames/bind';
import { Show } from '../../../models/Show';

import styles from "./styles/ShowCarouselTile.module.css";
const cn = classnames.bind(styles);

interface IShowCarouselTile {
  show: Show;
  active: boolean;
}

// These tiles have a fairly high amount of knowledge of the world around them. This is somewhat necessary in order to ensure 5 tiles are always visible
// (and a 6th slipping off the screen) since each tile needs to take up exactly 20 % of the viewable area.
export const ShowCarouselTile = ({ show, active = false }: IShowCarouselTile) => {
  return (
    <div className={styles.showTile}>
      <div className={cn([styles.showTileInner, { active }])}>
        <img src={show.image} />
      </div>
    </div>
  );
};
