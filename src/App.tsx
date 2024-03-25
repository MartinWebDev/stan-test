import React from 'react';
import { Routes, Route } from "react-router-dom";
import { MainLayout } from './layout/MainLayout';
import { StanHome } from './layout/StanHome';
import { StanShow } from './layout/StanShow';
import { NoMatchLayout } from './layout/NoMatchLayout';
import { ShowContextProvider } from './context/ShowContextProvider';

import './styles.css';

const App: React.FC = () => {
  return (
    <ShowContextProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<StanHome />} />
          <Route path=":showId" element={<StanShow />} />
        </Route>
        <Route path="*" element={<NoMatchLayout />} />
      </Routes>
    </ShowContextProvider>
  );
};

export default App;
