import InputLabel from '@mui/material/InputLabel';
import {  Select, MenuItem } from '@material-ui/core';
import { Controller } from "react-hook-form";
import FormHelperText from '@mui/material/FormHelperText';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

export function Dropdown(props: any) {
  const { name, label, control, error = false, allMembers } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = "" } }) => (
        <>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>

                <Select  id="demo-simple-select" value={value}  style={{ width: 170 }} onChange={onChange} error={error}>
          {
            [...allMembers, {id: 0, firstName: "Root (if no parent)", parentId: null}].map((member: any) => {
              return (
                member.level < 4 &&
                <MenuItem key={member.id} value={member.id}>{member.firstName}</MenuItem>
              )
            })
          }
        </Select>
        </>

        
        

      )}
    />

  );
}