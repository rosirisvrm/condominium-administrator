import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, TextField, IconButton, TableCell, TableRow, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import { OutlinedButton } from './OutlinedButton';
import { BasicTable } from './BasicTable';
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const LabelStyle = styled('span')(() => ({
    marginBottom: 8,
}));

// ----------------------------------------------------------------------

UsersSelector.propTypes = {
    checkedRole: PropTypes.bool,
    users: PropTypes.array,
    roles: PropTypes.array,
    setUsers: PropTypes.func,
    setRoles: PropTypes.func,
    usersOptions: PropTypes.array,
    rolesOptions: PropTypes.array
}

function UsersSelector({ 
    checkedRole = false, 
    users = [], 
    roles = [], 
    setUsers, 
    setRoles, 
    usersOptions, 
    rolesOptions 
}){

    const headersUsers = ['Usuario', 'Dirección', ''];
    const headersRoles = ['Rol', 'Cantidad de usuarios', ''];
    const [autocomplete, setAutocomplete] = React.useState(null);

    const addUser = () => {
        const newUsers = [... users, autocomplete]
        setUsers(newUsers)
        setAutocomplete(null)
      }
    
      const deleteUser = (index) => {
        const newUsers = [... users]
        newUsers.splice(index, 1)
        setUsers(newUsers)
      }
    
      const addRole = () => {
        const newRoles = [... roles, autocomplete]
        setRoles(newRoles)
        setAutocomplete(null)
      }
    
      const deleteRole = (index) => {
        const newRoles = [... roles]
        newRoles.splice(index, 1)
        setRoles(newRoles)
      }

    return(
        <>
            {!checkedRole ?
                <>
                    <Grid container item spacing={3}>
                        <Grid item xs={12} sm={9} container direction="column">
                            <LabelStyle>Buscar usuarios</LabelStyle>
                            <Autocomplete
                                id="users-selection-autocomplete"
                                value={autocomplete}
                                onChange={(event, newValue) => {
                                    setAutocomplete(newValue);
                                }}
                                options={usersOptions}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder='Ingrese el nombre del usuario a buscar' />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} container direction="row" justifyContent="center" alignItems="flex-end">
                            <OutlinedButton 
                                size='small'
                                defaultPadding
                                onClick={addUser} 
                                disabled={(!autocomplete)}
                            >
                                Añadir
                            </OutlinedButton>
                        </Grid>
                    </Grid>

                    {users.length > 0 &&
                        <BasicTable 
                            headers={headersUsers} 
                            elements={users} 
                            caption={`La notificación será enviada a un total de 
                                ${users.length} ${users.length === 1 ? 'usuario' : 'usuarios'}
                            `}
                        >
                            {(row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>
                                <IconButton onClick={() => deleteUser(index)} sx={{ p: 0 }}>
                                    <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                                </IconButton>
                                </TableCell>
                            </TableRow>
                            )}
                        </BasicTable>                      
                    }
                </> 
                :
                <>
                    <Grid container item spacing={3}>
                        <Grid item xs={12} sm={9} container direction="column">
                            <LabelStyle>Seleccionar rol</LabelStyle>
                            <Autocomplete
                                id="users-selection-autocomplete"
                                value={autocomplete}
                                onChange={(event, newValue) => {
                                    setAutocomplete(newValue);
                                }}
                                options={rolesOptions}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder='Seleccione el rol' />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={3} container direction="row" justifyContent="center" alignItems="flex-end">
                            <OutlinedButton 
                                size='small'
                                defaultPadding
                                onClick={addRole} 
                                disabled={(!autocomplete)}
                            >
                            Añadir
                            </OutlinedButton>
                        </Grid>
                    </Grid>

                    {roles.length > 0 && 
                        <BasicTable 
                            headers={headersRoles} 
                            elements={roles}
                        >
                            {(row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>
                                <IconButton onClick={() => deleteRole(index)} sx={{ p: 0 }}>
                                    <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                                </IconButton>
                                </TableCell>
                            </TableRow>
                            )}
                        </BasicTable>
                    }
                </> 
            }
        </>
    );
}

export { UsersSelector };