import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CustomTable = props => {
  const classes = useStyles();
  
  if (!props?.parkingTable.length) {
    return (
      <div style={{textAlign: 'center', fontSize: 50}}>
        <span style={{fontSize: 35}}>Park Here!</span>
        <EmojiPeopleIcon fontSize="inherit"/>
      </div>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Slot No.</TableCell>
            <TableCell align="center">Plate Number</TableCell>
            <TableCell align="center">Colour</TableCell>
            <TableCell align="center">Clear Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.parkingTable?.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.plateNumber}</TableCell>
              <TableCell align="center">{row.color}</TableCell>
              <TableCell align="center"><ClearIcon style={{ color: 'red', cursor: 'pointer'}} onClick={() => props.clearOutHandler(row.id)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;