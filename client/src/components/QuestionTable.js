import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarIcon from '@material-ui/icons/Star';

function createData(name,difficulty, submitted) {
    return { name, difficulty, submitted };
}

const rows = [
    createData('Q1', "easy", "true"),
    createData('Q2', "medium", "false"),
    createData('Q3', "easy", "false"),
    createData('Q4', "hard", "true"),
    createData('Q5', "medium", "false"),
];

export default function SimpleTable() {

    return (
        <TableContainer>
            <Table title="Question Type" style={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>Question Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right" icon={<StarIcon />}>{row.difficulty}</TableCell>
                            <TableCell align="right">{row.submitted}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
