import React from 'react';
import { Routes, Route } from "react-router-dom";
import { StanLayout } from './layout/StanLayout';
import { StanShowsList } from './layout/StanShowsList';
import { StanShow } from './layout/StanShow';
import { NoMatchLayout } from './layout/NoMatchLayout';
import { ShowContextProvider } from './context/ShowContextProvider';

import './styles.css';

const App: React.FC = () => {
  return (
    <ShowContextProvider>
      <Routes>
        <Route path="/" element={<StanLayout />}>
          <Route index element={<StanShowsList />} />
          <Route path=":showId" element={<StanShow />} />
        </Route>
        <Route path="*" element={<NoMatchLayout />} />
      </Routes>
    </ShowContextProvider>
  );
};

export default App;
