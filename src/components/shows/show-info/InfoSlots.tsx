import React from 'react';

import "./InfoSlots.css";

interface IInfoSlots {
  slots: string[];
}

// I did consider not including the wrapper here in case some view in future want to display this as a column rather than on a row, but really, it wouldn't, because of the pipes between slot.
// This design is too specific and so abstracting the wrapper out is needless.
export const InfoSlots = ({ slots }: IInfoSlots) => {
  return (
    <div className='info-slots'>
      {slots.map(slot => {
        return (
          <div>{slot}</div>
        );
      })}
    </div>
  );
};
