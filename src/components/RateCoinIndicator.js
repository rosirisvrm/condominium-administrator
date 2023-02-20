import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material
import { MenuItem, TextField, Stack, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { getCoinOptions, getRate } from '../services/customSettings';
import { setCoinOptions, setCoin as setCoinRedux, setRate } from '../slices/customSettings';

// ----------------------------------------------------------------------

const TextFieldStyle = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: 8
}))

const BoxStyle = styled(Box)(({ theme }) => ({
    border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
    backgroundColor: theme.palette.common.white,
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 400,
    color: theme.palette.text.primary,
    padding: '8.5px 14px',
}))

// ----------------------------------------------------------------------

function RateCoinIndicator() {

    const rate = useSelector(state => state.customSettings.rate)
    const coinOptions = useSelector(state => state.customSettings.coinOptions)
    const coinRedux = useSelector(state => state.customSettings.coin)

    const [coin, setCoin] = useState(coinRedux ? coinRedux.value : '')

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchRate = async () => {
            const res = await getRate();
            dispatch(setRate(res))
        }
        fetchRate()

        const fetchCoinOptions = async () => {
            const res = await getCoinOptions();
            dispatch(setCoinOptions(res))
        }
        fetchCoinOptions()
    }, [dispatch])

    useEffect(() => {
        setCoin(coinRedux ? coinRedux.value : '')
    }, [coinRedux])

    const onChangeCoin = (event) => {
        setCoin(event.target.value)
        const coinSelected = coinOptions.find(item => item.value === event.target.value)
        dispatch(setCoinRedux(coinSelected))
    }

    return (
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <BoxStyle sx={{ mr: 2 }}>
                {`${rate.label} ${rate.value}`}
            </BoxStyle>

            <TextFieldStyle 
                select 
                size='small' 
                value={coin} 
                onChange={onChangeCoin}
            >
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
