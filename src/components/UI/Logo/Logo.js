import React from 'react';

import deerLogo from '../../assests/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={deerLogo} alt="Mydeer" />
    </div>
);

export default logo;