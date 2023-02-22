import { mockProviders, mockProvider } from '../_mock/providers';

export const getProviders = ({ perPage = 24 }) => [...mockProviders(perPage)];

export const getProvider = (id) => ({ ...mockProvider(id) });

export const postProvider = (body) => {
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putProvider = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}

export const deleteProvider = (id) => {
    console.log('deleting', id);

    return true;
}

export const downloadProvider = () => {
    console.log('downloading');

    return true;
}