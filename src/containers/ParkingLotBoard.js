import React from 'react';
import ParkingContent from './ParkingContent/ParkingContent';
import classes from './ParkingLotBoard.module.css';

const ParkingLotBoard = () => {
  return (
    <div className={classes.parkingHeader} id="asd">
      <div className={classes.title}>
        <h1>PARKING LOT</h1>
        <hr />
      </div>
      <div className={classes.content}>
        <ParkingContent />
      </div>
    </div>
  );
}

export default ParkingLotBoard;