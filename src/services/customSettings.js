import { faker } from '@faker-js/faker';

//  http request here 

export const getCoinOptions = () => ([
    { label: 'USD', value: 0, symbol: '$', description: 'Dólar americano' },
    { label: 'VES', value: 1, symbol: 'bs', description: 'Bolívar venezolano' },
]);

export const getRate = () => ({
    label: 'Tasa Oficial BCV',
    value: 10.00,
});

export const getPaymentMethodOptions = () => ([
    { label: 'Transferencia Banco Banesco', value: 0 },
    { label: 'Transferencia Banco Mercantil', value: 1 },
    { label: 'Pago Móvil Banco BNC', value: 2 },
    { label: 'Pago Móvil Banco Provincial', value: 3 },
    { label: 'Efectivo', value: 4 },
]);

export const getPaymentMethodTypeOptions = () => ([
    { label: 'Transferencia', value: 0 },
    { label: 'Pago Móvil', value: 1 },
    { label: 'Efectivo', value: 2 },
]);

export const getBankOptions = () => ([
    {
        value: "0156",
        label: "100%BANCO"
    },
    {
        value: "0196",
        label: "ABN AMRO BANK"
    },
    {
        value: "0172",
        label: "BANCAMIGA BANCO MICROFINANCIERO, C.A."
    },
    {
        value: "0171",
        label: "BANCO ACTIVO BANCO COMERCIAL, C.A."
    },
    {
        value: "0166",
        label: "BANCO AGRICOLA"
    },
    {
        value: "0175",
        label: "BANCO BICENTENARIO"
    },
    {
        value: "0128",
        label: "BANCO CARONI, C.A. BANCO UNIVERSAL"
    },
    {
        value: "0164",
        label: "BANCO DE DESARROLLO DEL MICROEMPRESARIO"
    },
    {
        value: "0102",
        label: "BANCO DE VENEZUELA S.A.C.A. BANCO UNIVERSAL"
    },
    {
        value: "0114",
        label: "BANCARIBE C.A. BANCO UNIVERSAL"
    },
    {
        value: "0149",
        label: "BANCO DEL PUEBLO SOBERANO C.A."
    },
    {
        value: "0163",
        label: "BANCO DEL TESORO"
    },
    {
        value: "0176",
        label: "BANCO ESPIRITO SANTO, S.A."
    },
    {
        value: "0115",
        label: "BANCO EXTERIOR C.A."
    },
    {
        value: "0003",
        label: "BANCO INDUSTRIAL DE VENEZUELA."
    },
    {
        value: "0173",
        label: "BANCO INTERNACIONAL DE DESARROLLO, C.A."
    },
    {
        value: "0105",
        label: "BANCO MERCANTIL C.A."
    },
    {
        value: "0191",
        label: "BANCO NACIONAL DE CREDITO"
    },
    {
        value: "0116",
        label: "BANCO OCCIDENTAL DE DESCUENTO."
    },
    {
        value: "0138",
        label: "BANCO PLAZA"
    },
    {
        value: "0108",
        label: "BANCO PROVINCIAL BBVA"
    },
    {
        value: "0104",
        label: "BANCO VENEZOLANO DE CREDITO S.A."
    },
    {
        value: "0168",
        label: "BANCRECER S.A. BANCO DE DESARROLLO"
    },
    {
        value: "0134",
        label: "BANESCO BANCO UNIVERSAL"
    },  
    {
        value: "0177",
        label: "BANFANB"
    },
    {
        value: "0146",
        label: "BANGENTE"
    },
    {
        value: "0174",
        label: "BANPLUS BANCO COMERCIAL C.A"
    },
    {
        value: "0190",
        label: "CITIBANK."
    },
    {
        value: "0121",
        label: "CORP BANCA."
    },
    {
        value: "0157",
        label: "DELSUR BANCO UNIVERSAL"
    },
    {
        value: "0151",
        label: "BFC BANCO FONDO COMÚN C.A. BANCO UNIVERSAL"
    },
    {
        value: "0601",
        label: "INSTITUTO MUNICIPAL DE CRÉDITO POPULAR"
    },
    {
        value: "0169",
        label: "MIBANCO BANCO DE DESARROLLO, C.A."
    },
    {
        value: "0137",
        label: "SOFITASA"
    }
]);

export const getIdentificationTypeOptions = () => ([
    { label: 'V', value: 0 },
    { label: 'J', value: 1 },
    { label: 'E', value: 2 },
]);

export const getGeneralInfo = () => ({
    id: faker.datatype.uuid(),
    logo: `/static/logo.svg`,
    condominiumName: faker.company.companyName(),
    feeAmount: faker.finance.amount(),
    address: faker.address.cityName() + faker.address.streetAddress(),
    phone: faker.phone.number('+58 412 ### ####'),
    email: `${faker.random.word()}@${faker.random.word()}.com`,
    description: faker.lorem.paragraph(),
    dueDate: faker.date.future(),
    administrator: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        identification: faker.random.numeric(8),
        address: faker.address.cityName() + faker.address.streetAddress(),
        phone: faker.phone.number('+58 412 ### ####'),
        email: `${faker.random.word()}@${faker.random.word()}.com`,
    },
    condoBoard: [...Array(3)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        identification: faker.random.numeric(8),
        address: faker.address.cityName() + faker.address.streetAddress(),
        phone: faker.phone.number('+58 412 ### ####'),
        email: `${faker.random.word()}@${faker.random.word()}.com`,
    }))
});

export const putGeneralInfo = (id, body) => {
    console.log('editando');
    console.log('id: ', id);
    console.log('body: ', body);

    return true;
}