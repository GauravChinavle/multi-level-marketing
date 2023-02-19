import React from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

export const Input = (props: any) => {
    const { name, label, type, control, error = false } = props;    
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value = "" } }) => (
                <TextField onChange={onChange} value={value} label={label} type={type} error={!!error} helperText={error || null}/>    
            )}
        />
    );
};