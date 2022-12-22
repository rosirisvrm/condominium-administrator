import { PropTypes } from 'prop-types';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const TableCaption = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: theme.spacing(3),
    fontSize: '0.75rem',
}));

// ----------------------------------------------------------------------

BasicTable.propTypes = {
    headers: PropTypes.array,
    elements: PropTypes.array,
    children: PropTypes.func,
    caption: PropTypes.string
}

function BasicTable({ headers, elements, children, caption }){

    const renderFunc = children

    return (
        <>
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

            {caption && 
                <TableCaption>
                    <Typography variant="span">
                        {caption}
                    </Typography>
                </TableCaption>
            }
        </>
    );
}

export { BasicTable };