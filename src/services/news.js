import { mockNews, mockDetailNews  } from '../_mock/news';

export const getNewsList = ({ perPage = 24 } = {}) => [...mockNews(perPage)]

export const getNews = (id) => ({ ...mockDetailNews(id) });

export const postNews = (body) => {
    console.log('creating');
    console.log('body: ', body);

    return true;
}

export const putNews = (id, body) => {
    console.log('editing: ', id);
    console.log('body: ', body);

    return true;
}

export const deleteNews = (id) => {
    console.log('deleting ', id);

    return true;
}

export const downloadNews = () => {
    console.log('downloading');

    return true;
}