import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const Searchbox = props => {
  return (
    <TextField 
      {...props}
      InputProps={{
        endAdornment: 
          <InputAdornment position="end">
            <SearchIcon
              onClick={props.handleSearch}
              onMouseDown={props.handleSearch}
            />
          </InputAdornment>,
      }}
    />
  );
}

export default Searchbox;