import { useState } from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// material
import { MenuItem, TextField, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { getCoinOptions, getRate } from '../services/customSettings';
// import { setCoinOptions, setRate } from '../slices/customSettings';

// ----------------------------------------------------------------------

const TextFieldStyle = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: 8
}))

// ----------------------------------------------------------------------

RateCoinIndicator.propTypes = {
    changeCoin: PropTypes.func
};

function RateCoinIndicator({ changeCoin }) {

    // const [rate, setRate] = useState(10.00)
    const [coin, setCoin] = useState('')

    const coinOptions = [
        { label: 'USD', value: 0, symbol: '$', description: 'Dólar americano' },
        { label: 'VES', value: 1, symbol: 'bs', description: 'Bolívar venezolano' },
    ]

//   const rate = useSelector(state => state.customSettings.rate)
//   console.log('rate ', rate);
//   const coin = useSelector(state => state.customSettings.coin)
//   console.log('coin ', coin);
//   const coinOptions = useSelector(state => state.customSettings.coinOptions)
//   console.log('coinOptions ', coinOptions);

//   const [loadingRate, setLoadingRate] = useState(false)

//   useEffect(() => {
//     setLoadingRate(true)
//     const fetchRate = async () => {
//         const res = await getRate();
//         console.log('recibiendo rate', res);
//         setRate(res)
//     }

//     const fetchCoinOptions = async () => {
//         const res = await getCoinOptions();
//         setCoinOptions(res)
//     }

//     fetchRate()
//     fetchCoinOptions()
//     setLoadingRate(false)
//   }, [])

    const onChange = (event) => {
        console.log('cambiando moneda')
        setCoin(event.target.value)
    
        const coinSelected = coinOptions.find(item => item.value === event.target.value)
        console.log('coinSelected ', coinSelected);
        changeCoin(coinSelected)
    }

    return (
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <TextFieldStyle select size='small' value={coin} onChange={onChange}>
                {coinOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextFieldStyle>
        </Stack>
    );
}

export { RateCoinIndicator };
