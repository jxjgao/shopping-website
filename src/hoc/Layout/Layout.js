import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Toolbar/Toolbar';

class Layout extends Component {
    // state = {
    //     showSideDrawer: true
    // }

    // sideDrawerClosedHandler = () => {
    //     this.setState({showSideDrawer: false});
    // }

    // sideDrawerToggleHandler = () => {
    //     this.setState((prevState) => {
    //         return {showSideDrawer: !prevState.showSideDrawer};
    //     });
    // }

    render () {
        return(
            <Aux>
                {/* <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/> */}
                {/* <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/> */}
                <Toolbar/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }  
}
    

export default Layout;