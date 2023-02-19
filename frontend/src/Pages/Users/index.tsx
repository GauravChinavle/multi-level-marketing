import * as React from 'react';
import { Button } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Snackbars } from "../../utils/components"
import { useNavigate } from "react-router-dom";

export default function BasicTable() {
    const [allMembers, setAllMembers] = useState([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllMembers();
    }, [])

    useEffect(() => {
        if (allMembers && allMembers[0]) {
            const keys = Object.keys(allMembers[0]);
            setHeaders(keys)
        }
    }, [allMembers])


    const getAllMembers = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/members/getAll`);
            setAllMembers(data.data);

        } catch (error) {
            console.error("Error occured while getting members list", error);
        }
    }

    async function handleEdit(id: string) {
        navigate(`/registration?id=${id}`);
    }

    async function handleDelete (member: any) {
        try {      
            const { data } = await axios.post(`http://localhost:3001/members/deleteMember`,member);
            data.success ?  setSeverity("success") : setSeverity("error")
            setOpen(true)
            getAllMembers();
        } catch (error) {
            console.error("Error occured while getting members list", error);
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                           headers?.map((header, index) => {
                                return (
                                    (header != "password") &&
                                    <TableCell key={index}>{header}</TableCell>
                                )
                            })
                        }
                        {
                            headers.length ?
                           
                                <>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                                </>
                            :
                            "No users"
                         
                        }
                        
                    </TableRow>            
                </TableHead>
                <TableBody>
                    {allMembers.map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {
                            headers?.map((header, index) => {
                                return (
                                   (header != "password") &&
                                    <TableCell key={index} component="th" scope="row">{row[header] || "Root"}</TableCell>
                                )
                            })
                        }
                            {/* <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.firstName}
                            </TableCell> */}
                            {/* <TableCell>{row.parentId || "Root"}</TableCell> */}
                            <TableCell><Button onClick={()=>handleEdit(row.id)}>Edit</Button></TableCell>
                            <TableCell><Button onClick={()=>handleDelete(row)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Snackbars severity={severity} open={open} setOpen={setOpen}/>
        </TableContainer>
    );
}