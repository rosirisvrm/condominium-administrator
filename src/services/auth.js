//  http request here 
export const login = (data) => {
    console.log('haciendo login');

    console.log('data ', data);

    // TO DO http request
    
    return {
        id: 1,
        name: 'Rosiris',
        lastname: 'Romero',
        identification: 26355711,
        role: {
            value: 2,
            label: 'Administrador'
        },
        email: 'rosirisvrm@gmail.com',
        phone: '04121761190',
        address: 'Manzana 12 - 9',
        photoURL: '/static/mock-images/avatars/avatar.jpg',
    }
};

export const logout = () => {
    console.log('haciendo logout');

    // TO DO http request

    return true;
};


