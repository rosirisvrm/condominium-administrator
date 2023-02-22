import { mockEmployees, mockEmployee } from '../_mock/employees';

export const getEmployees = ({ perPage = 24 }) => [...mockEmployees(perPage)];

export const getEmployee = (id) => ({ ...mockEmployee(id) });

export const postEmployee = (body) => {
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putEmployee = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}

export const deleteEmployee = (id) => {
    console.log('deleting ', id);

    return true;
}

export const downloadEmployee = () => {
    console.log('downloading');

    return true;
}