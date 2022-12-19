import { PropTypes } from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

BasicTable.propTypes = {
    headers: PropTypes.array,
    elements: PropTypes.array,
    children: PropTypes.func,
}

function BasicTable({ headers, elements, children }){

    const renderFunc = children

    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>  
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                  {elements.map((row, index) => renderFunc(row, index))} 
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export { BasicTable };