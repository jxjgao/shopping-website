import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/home" >Home</NavigationItem>
        <NavigationItem link="/cart">Cart</NavigationItem>
    </ul>
);

export default navigationItems;