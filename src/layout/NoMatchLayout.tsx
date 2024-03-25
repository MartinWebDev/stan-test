import React from 'react';

import "./NoMatchLayout.css";
import { Link } from 'react-router-dom';

// Totally original and unique 404 page that definitely can't be found anywhere else, especially not in nextjs...
// Joke aside, mine's actually better since you can navigate away with a link.
// Pretty useful if the idea is that this would be a TV. How anybody would get here is another story, but at least if they did they've got an easy out. 
export const NoMatchLayout = () => {
  return (
    <div className='no-match'>
      <div className='no-match-content'>
        <div className='no-match-404'>404</div>
        <div className='no-match-info'>
          <div>Page Not Found</div>
          <div><Link to="/">Return Home</Link></div>
        </div>
      </div>
    </div>
  );
};
