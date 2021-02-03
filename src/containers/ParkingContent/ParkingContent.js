import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Textbox from '../../components/Textbox';
import Searchbox from '../../components/Searchbox';
import CustomButton from '../../components/Button';
import CustomTable from '../List/List';

const generateParkingLotModel = (startingNumber, plateNumber, color) => 
  ({id: startingNumber, plateNumber: plateNumber, color: color, isAvailable: true});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  table: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(12),
    textAlign: 'left',
  }
}));

const ParkingContent = props => {
  const classes = useStyles();
  const [parkSize, setParkSize] = useState(null);
  const [parkingTable, setParkingTable] = useState([]);
  const [searchableParkingTable, setSearchableParkingTable] = useState([]);
  const [parkSizeError, setParkSizeError] = useState(null);
  const [plateNumber, setPlateNumber] = useState('');
  const [plateNumberError, setPlateNumberError] = useState(null);
  const [color, setColor] = useState('');
  const [colorError, setColorError] = useState(null);
  const [available, setAvailable] = useState(0);
  const [search, setSearch] = useState('');

  const clearOutHandler = ID => {
    const clone = JSON.parse(JSON.stringify(parkingTable)); // deep clone
    const slotIndex = clone.findIndex(slot => slot.id === ID);
    clone[slotIndex].plateNumber = '';
    clone[slotIndex].color = '';
    clone[slotIndex].isAvailable = true;
    setParkingTable(clone);
    setSearchableParkingTable(clone);
    setSearch('');
    const result = clone.filter(i => i.isAvailable).length;
    setAvailable(result);
  }

  const parkHandler = () => {
    if (plateNumber && color) {
      const plateNumberExists = parkingTable.findIndex(slot => slot.plateNumber.toLowerCase() === plateNumber.toLocaleLowerCase());
      if (plateNumberExists > -1) {
        setPlateNumberError('Car already parked!');
        return;
      }
      const availableSlotIndex = parkingTable.findIndex(slot => slot.isAvailable);
      const clone = JSON.parse(JSON.stringify(parkingTable)); // deep clone
      if (availableSlotIndex > -1) {
        clone[availableSlotIndex].plateNumber = plateNumber;
        clone[availableSlotIndex].color = color;
        clone[availableSlotIndex].isAvailable = false;
        setParkingTable(clone);
        setSearchableParkingTable(clone);
        const result = clone.filter(i => i.isAvailable).length;
        setAvailable(result);
      } else {
        setAvailable(0);
      }
      setColor('');
      setPlateNumber('');
      setPlateNumberError(null);
      setColorError(null);
    } else {
      if (!plateNumber) setPlateNumberError('No plate number');
      if (!color) setColorError('No car color');
    }
  }

  const parkingTableHandler = () => {
    if (parkSize) {
      const array = [];
      for (let i = 1; i <= parkSize; i++) {
        array.push(generateParkingLotModel(i, '', ''));
      }
      setParkingTable(array);
      setSearchableParkingTable(array);
      setAvailable(parkSize);
    } else {
      setParkingTable([]);
      setSearchableParkingTable([]);
      setAvailable(0);
    }
    setColorError(null);
    setPlateNumberError(null);
  }

  const searchHandler = value => {
    if (value) {
      const filtered = parkingTable
        .filter(item => item?.plateNumber?.toLowerCase()?.includes(value) 
          || item?.color?.toLowerCase()?.includes(value));
      setSearchableParkingTable(filtered);
    } else {
      setSearchableParkingTable(parkingTable);
    }
    setSearch(value);
  }


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Textbox 
              fullWidth 
              label="Create parking lot"
              onChange={event => {
                const value = event?.target.value;
                if (isEmpty(value)) {
                  setParkSizeError(null);
                  setParkSize(null);
                }
                if (value) {
                  const isRealNumber = !isNaN(value);
                  if (isRealNumber) {
                    const num = Number(value);
                    const isInt = Number.isInteger(num);
                    if (isInt) {
                      setParkSize(num);
                      setParkSizeError(null);
                    } else {
                      setParkSizeError('Not an integer');
                    }
                  } else {
                    setParkSizeError('Not a number');
                  }
                }
              }}
              error={!!parkSizeError}
              helperText={parkSizeError}
            />
            <CustomButton
              style={{marginTop: 20}}
              color="primary"
              fullWidth
              variant="contained"
              onClick={parkingTableHandler}
            >
              Create Parking Lot
            </CustomButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} />
      </Grid>
      <Paper className={classes.table}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            <Textbox 
              fullWidth 
              label="Plate Number"
              onChange={event => setPlateNumber(event?.target?.value)}
              value={plateNumber}
              error={!!plateNumberError}
              helperText={plateNumberError}
              disabled={!available}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Textbox 
              fullWidth 
              label="Colour"
              onChange={event => setColor(event?.target?.value)}
              value={color}
              error={!!colorError}
              helperText={colorError}
              disabled={!parkSize}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <CustomButton
              fullWidth
              color="primary"
              variant="contained"
              onClick={parkHandler}
              disabled={!parkSize}
            >
              Park
            </CustomButton>
          </Grid>
          <Grid item xs={12} sm={6} />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}><h4>Available slot: {available}</h4></Grid>
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={4}>
            <Searchbox 
              fullWidth 
              label="Search . . ."
              onChange={event => searchHandler(event?.target?.value)}
              value={search}
              disabled={!parkSize}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{paddingTop: 60}}>
          <Grid item xs={12}>
            <CustomTable 
              parkingTable={parkingTable?.filter(item => !item?.isAvailable)}
              searchableParkingTable={searchableParkingTable?.filter(item => !item?.isAvailable)}
              clearOutHandler={clearOutHandler} 
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ParkingContent;