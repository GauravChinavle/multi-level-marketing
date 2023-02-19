import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useEffect } from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const errorMessage: any = {
    "error": "This is an error message!",
    "warning": "This is a warning message!",
    "info": "This is an information message!",
    "success": "This is a success message!",
}
export default function Snackbars(props: any) {
    useEffect(() => {
        handleClick()
    }, [])
    const { severity, open = false, setOpen } = props;

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        severity &&
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} sx={{ width: '100%' }} severity={severity}>{errorMessage[severity]}</Alert>
            </Snackbar>
        </Stack>

    );
}