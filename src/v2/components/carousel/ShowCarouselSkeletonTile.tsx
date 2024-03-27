import React from 'react';
import { SkeletonBlock } from '../../../components/ux/SkeletonBlock';

import styles from "./styles/ShowCarouselTile.module.css";

export const ShowCarouselSkeletonTile = () => {
  return (
    <div className={styles.showTile}>
      <div className={styles.showTileInner}>
        <SkeletonBlock height="100%" width="100%" />
      </div>
    </div>
  );
};
