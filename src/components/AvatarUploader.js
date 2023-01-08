import React from 'react';
import { PropTypes } from 'prop-types';
import { Avatar, IconButton, Tooltip } from '@mui/material';
// components
import Iconify from './Iconify';

AvatarUploader.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    tooltipText: PropTypes.string,
    setImage: PropTypes.func,
    icon: PropTypes.string
}

function AvatarUploader({ url, name, tooltipText, setImage, icon = "fluent:camera-add-48-filled" }){
    return (
        <div style={{ position: 'relative' }}>
            <Tooltip title={tooltipText}>
                <IconButton 
                    aria-label="upload picture" 
                    component="label" 
                    sx={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1 }}
                >
                    <input 
                        hidden
                        accept="image/*" 
                        type="file"
                        onChange={(event) => {
                            setImage(event.target.files[0])
                        }}
                    />
                    <Iconify icon={icon} width={30} height={30} />
                </IconButton>
            </Tooltip>
            <Avatar
                alt={name}
                src={url}
                sx={{ width: 140, height: 140 }}
            />
      </div>
    );
}

export { AvatarUploader };