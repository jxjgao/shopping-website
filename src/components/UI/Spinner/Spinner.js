import React from 'react';
import cx from 'classnames';

import classes from './Spinner.module.css'

const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner