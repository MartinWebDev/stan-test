import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useResizeObserver } from 'usehooks-ts';

import styles from './styles/Carousel.module.css';

interface ICarousel extends PropsWithChildren {
  scrollAmount: number;
  scrollBasis: 'pixels' | 'percentage';
  onWidthChange: (newWidth: number) => void;
}

export const Carousel = ({ scrollAmount, scrollBasis, onWidthChange, children }: ICarousel) => {
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const { width: carouselWidth = 0 } = useResizeObserver({ ref: carouselContentRef });

  useEffect(() => {
    requestAnimationFrame(() => {
      if (carouselContainerRef.current && carouselContentRef.current) {
        const amountInPx = scrollBasis === 'pixels' ? scrollAmount : carouselWidth / 100 * scrollAmount;
        carouselContainerRef.current.scrollLeft = amountInPx;
        // Report width back to container in case width changes which is needed to quickly calculate scroll amount
        onWidthChange(carouselWidth);
      }
    });
  }, [scrollAmount, scrollBasis, carouselWidth]);

  return (
    <div id="carousel-main" className={styles.carousel} ref={carouselContainerRef}>
      <div id="carousel-content" className={styles.carouselInner} ref={carouselContentRef}>
        <div id="carousel-content-inner" className={styles.carouselContent} >{children}</div>
      </div>
    </div>
  );
};
