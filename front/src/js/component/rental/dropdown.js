import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function SelectAutoWidth() {
    const [place, setplace] = React.useState('');
  
    const handleChange = (event) => {
      setplace(event.target.value);
    };
  
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="selecter">장소선택</InputLabel>
          <Select
            labelId="selecter"
            id="demo-simple-select-autowidth"
            value={place}
            onChange={handleChange}
            autoWidth
            label="Age"
          >
            <MenuItem value="">
              <em>장소선택</em>
            </MenuItem>
            <MenuItem value={"stage"}>무대(홀)</MenuItem>
            <MenuItem value={"practice"}>리허설실</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }