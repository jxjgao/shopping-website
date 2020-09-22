import React, {Component} from 'react';
import ReactNotification from 'react-notifications-component'
import 'animate.css/animate.compat.css';
import 'react-notifications-component/dist/theme.css';


import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render () {
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/> 
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <Toolbar/>
                <ReactNotification />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }  
}
    

export default Layout;