import React from 'react';
import { Routes, Route } from "react-router-dom";
import { MainLayout } from './layout/MainLayout';
import { StanHome } from './layout/StanHome';
import { StanShow } from './layout/StanShow';
import { NoMatchLayout } from './layout/NoMatchLayout';
import { ShowContextProvider } from './context/ShowContextProvider';

// V2
import { StanLayout as StanV2Layout } from "./v2/StanLayout";
import { StanShowsList } from './v2/StanShowsList';
import { StanShowsDetail } from './v2/StanShowsDetail';

import './styles.css';

const App: React.FC = () => {
  return (
    <ShowContextProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<StanHome />} />

          <Route path="v2" element={<StanV2Layout />}>
            <Route index element={<StanShowsList />} />
            <Route path=":showId" element={<StanShowsDetail />} />
          </Route>

          <Route path=":showId" element={<StanShow />} />
        </Route>
        <Route path="*" element={<NoMatchLayout />} />
      </Routes>
    </ShowContextProvider>
  );
};

export default App;
