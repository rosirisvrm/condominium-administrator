//  http request here 

export const getCoinOptions = () => ([
    { label: 'USD', value: 0 },
    { label: 'VES', value: 1 },
]);

export const getPaymentMethodOptions = () => ([
    { label: 'Transferencia Banco Banesco', value: 0 },
    { label: 'Transferencia Banco Mercantil', value: 1 },
    { label: 'Pago Móvil Banco BNC', value: 2 },
    { label: 'Pago Móvil Banco Provincial', value: 3 },
    { label: 'Efectivo', value: 4 },
]);