import { PropTypes } from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DownloadButton } from './DownloadButton';

// ----------------------------------------------------------------------

const LabelStyle = styled('span')(() => ({
    marginBottom: 8,
}));
  
const BoxStyle = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    flexDirection: 'column'
}));

// ----------------------------------------------------------------------

DownloadFile.propTypes = {
    label: PropTypes.string,
    download: PropTypes.func,
}

function DownloadFile({ label = 'Archivo', download }){

    return(
        <>
            <LabelStyle>{label}</LabelStyle>
            <BoxStyle>
                <DownloadButton onClick={download} text='Descargar' />
            </BoxStyle>
        </>
    );
}

export { DownloadFile };