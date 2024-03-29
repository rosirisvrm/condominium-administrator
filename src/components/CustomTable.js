import { useState } from 'react';
import { filter } from 'lodash';
import PropTypes from 'prop-types';
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Stack
} from '@mui/material';
// components
import Scrollbar from './Scrollbar';
import SearchNotFound from './SearchNotFound';
import { Loader } from './Loader'
import { DownloadButton } from './DownloadButton'
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

CustomTable.propTypes = {
    tableHead: PropTypes.array,
    elementList: PropTypes.array,
    children: PropTypes.func,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    loading: PropTypes.bool,
    searchParam: PropTypes.string,
    download: PropTypes.func,
    loadingDownload: PropTypes.bool,
    bulkDelete: PropTypes.func,
    loadingBulkDelete: PropTypes.bool
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, searchParam) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_item) => _item[searchParam].toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function CustomTable({ 
  tableHead, 
  elementList = [],
  children, 
  selected, 
  setSelected, 
  loading, 
  searchParam,
  download,
  loadingDownload,
  bulkDelete,
  loadingBulkDelete
}) {

  const renderFunc = children

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = elementList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - elementList.length) : 0;

  const filteredElements = applySortFilter(elementList, getComparator(order, orderBy), filterName, searchParam);

  const isDataNotFound = filteredElements.length === 0;

  return (
    <>
      {loading ? 
        <Loader /> :
        <Card>
          <UserListToolbar 
            numSelected={selected.length} 
            filterName={filterName} 
            onFilterName={handleFilterByName}
            bulkDelete={bulkDelete}
            loadingBulkDelete={loadingBulkDelete}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={tableHead}
                  rowCount={elementList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredElements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => renderFunc(row))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isDataNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Stack direction="row" alignItems="center" justifyContent="space-between" m={2}>
            <DownloadButton text='Exportar' onClick={download} loading={loadingDownload} />

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={elementList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Card>
      }
    </>
  );
}

export { CustomTable };
