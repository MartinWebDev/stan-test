import React from 'react';
import { Outlet } from 'react-router-dom';

// Kind of sort of slightly really pointless at this time since there are only 2 pages and aside from a background colour there is no shared layout of any sort. 
// But this future proofs things in case some shared layout is ever needed, and its impact on performance will be practically unmeasuable, so it's not worth thinking about.
export const MainLayout = () => {
  return (
    <Outlet />
  );
};
