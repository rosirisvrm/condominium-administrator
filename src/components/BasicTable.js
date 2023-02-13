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

const TableContainerStyle = styled(TableContainer)(() => ({
    boxShadow: '0px 4px 4px 0px #00000040',
}));

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
    caption: PropTypes.string,
    mt: PropTypes.number
}

function BasicTable({ headers, elements, children, caption, mt = 4 }){

    const renderFunc = children

    return (
        <>
            <TableContainerStyle component={Paper} sx={{ mt }}>
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
            </TableContainerStyle>

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