//  http request here 
export const login = (data) => {
    console.log('haciendo login');

    console.log('data ', data);

    // TO DO http request
    
    return {
        name: 'Rosiris',
        lastname: 'Romero',
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


