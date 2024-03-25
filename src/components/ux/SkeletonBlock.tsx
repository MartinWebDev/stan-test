import React from 'react';

interface ISkeletonBlock {
  width: number | string;
  height: number | string;
}

// TODO: There was nothing to specify any animation etc for the loading/skeleton view. We could be here all day talking about options, which to me is too much ambiguity to commit.
// So for now, it's just a grey box. Some kind of animation would definitely be nice though, to show the user *something* is happening.

// I deplore inline css, but in this instance...
// A far better way would obviously be to use something like styled-components where the width and height values can be passed,
// but given the app has made it this far without it, adding a whole library for one component would be silly.
// We've already maximised performance by using minimal additional libraries, adding one now would be counterproductive.
// And since width and height want to be fully dynamic, and the only other css here is background colour, inline is fine this one time.
// This block will always be returned as a block element. It's up to the consuming component to render it inline if it wishes. Flexbox is your friend!
export const SkeletonBlock = ({ height, width }: ISkeletonBlock) => {
  return (
    <div
      style={{
        width: typeof width === "string" ? width : `${width}px`,
        height: typeof height === "string" ? height : `${height}px`,
        backgroundColor: "#606060"
      }}
    >
    </div>
  );
};
