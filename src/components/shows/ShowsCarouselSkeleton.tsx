import React from 'react';

import "./ShowsCarouselSkeleton.css";
import { SkeletonBlock } from '../ux/SkeletonBlock';

export const ShowsCarouselSkeleton = () => {
  return (
    <>
      {Array(6).fill(0).map((_, idx) => {
        return (
          <div key={idx} className='carousel-skeleton-slide'>
            <SkeletonBlock width="100%" height="100%" />
          </div>
        );
      })}
    </>
  );
};
