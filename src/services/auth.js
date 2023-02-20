export const login = (data) => {
    console.log('login');

    console.log('data ', data);

    // TO DO http request
    
    return {
        id: 1,
        name: 'Rosiris',
        lastname: 'Romero',
        identification: 87786433,
        role: {
            value: 2,
            label: 'Administrador'
        },
        email: 'rosirisvrm@gmail.com',
        phone: 1254126,
        address: 'Pzo',
        photoURL: '/static/mock-images/avatars/avatar_default.jpg',
    }
};

export const logout = () => {
    console.log('haciendo logout');

    // TO DO http request

    return true;
};
