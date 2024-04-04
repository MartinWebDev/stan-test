import React from 'react';
import { SkeletonBlock } from '../ux/SkeletonBlock';

import styles from "./styles/ShowCarouselTile.module.css";

// There's definitely better ways to do this in order to reuse more code without duplication, but sharing the css is pretty effecient, just not as efficient as it *could* be.
export const ShowCarouselSkeletonTile = () => {
  return (
    <div className={styles.showTile}>
      <div className={styles.showTileInner}>
        <SkeletonBlock height="100%" width="100%" />
      </div>
    </div>
  );
};
