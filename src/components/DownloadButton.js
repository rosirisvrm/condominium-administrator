import { PropTypes } from 'prop-types';
import { OutlinedButton } from './OutlinedButton';
import Iconify from './Iconify';

// ----------------------------------------------------------------------

DownloadButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    loading: PropTypes.bool
}

function DownloadButton({ text = 'Descargar', onClick, icon = 'material-symbols:sim-card-download', loading }){

    return(
        <OutlinedButton 
            size='small' 
            onClick={onClick} 
            customPadding='3px 12px'
            loading={loading}
        >
            <Iconify 
                icon={icon}
                width={20} 
                height={20}
                sx={{
                    marginRight: 1,
                }}
            /> 
            {text}
        </OutlinedButton>
    );
}

export { DownloadButton };