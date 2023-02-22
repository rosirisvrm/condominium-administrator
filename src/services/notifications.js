import { mockNotifications, mockNotification } from '../_mock/notifications';

export const getNotificationsList = ({ perPage = 24 } = {}) => [...mockNotifications(perPage)]

export const getNotification = (id) => ({ ...mockNotification(id) });

export const postNotification = (body) => {
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putNotification = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}

export const deleteNotification = (id) => {
    console.log('deleting id ', id);
    return true;
}

export const downloadNotification = () => {
    console.log('downloading');
    return true;
}