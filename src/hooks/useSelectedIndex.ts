import { useState } from "react";

export const useSelectedIndex = (initial = 0) => {
  // We could prevent under or over flowing with this hook, but perhaps other areas of the code want to under or overflow deliberately.
  // In this instance we will handle over or underflowing at the carousel itself, but another method could be to nest this hook into another one
  // perhaps called "useBoundSelectedIndex" or "useSelectedIndexWithLimits" and have that in turn make use of this hook.
  const [selectedIndex, setSelectedIndex] = useState(initial);

  const handleLeftMove = () => {
    setSelectedIndex((state) => {
      return state - 1;
    });
  };

  const handleRightMove = () => {
    setSelectedIndex((state) => {
      return state + 1;
    });
  };

  return {
    selectedIndex,
    onLeftMove: handleLeftMove,
    onRightMove: handleRightMove
  };
};
