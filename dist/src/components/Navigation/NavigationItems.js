import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined';
import Home from '@material-ui/icons/HomeOutlined';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >
            <Home style={{fontSize: "30px",
                            paddingBottom: "5px"}}/>
        </NavigationItem>
        <NavigationItem link="/cart">
            <ShoppingCart />
        </NavigationItem>
    </ul>
);

export default navigationItems;