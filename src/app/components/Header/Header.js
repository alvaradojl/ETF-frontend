import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "./../../actions/AuthActions"; 
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu'; 
import Menu, { MenuItem } from 'material-ui/Menu';
import Badge from 'material-ui/Badge';
import FolderIcon from 'material-ui-icons/Folder';
import NotificationsIcon from "material-ui-icons/Notifications";
import WhatshotIcon from "material-ui-icons/Whatshot";
import PublicIcon from "material-ui-icons/Public";
import SyncProblemIcon from "material-ui-icons/SyncProblem";
import CallMadeIcon from "material-ui-icons/CallMade";
import CallReceivedIcon from "material-ui-icons/CallReceived";
import {themePalette} from "./../../styles/MaterialUi/themePalette";
import deepOrange from "material-ui/colors/deepOrange";
import AssignmentIcon from 'material-ui-icons/Assignment';
import Avatar from 'material-ui/Avatar';
import SideMenu from "./../SideMenu/SideMenu";
import Drawer from 'material-ui/Drawer'; 
import {styleSheet} from './styleSheet';


class Header extends React.Component {

    constructor(props){
        super(props);
        this.state= { 
            notificationopen:false,
            anchorEl: undefined,
            notificationcount:3,
            notificationcolor:"accent"
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

handleClick = event => {
    this.setState({ notificationopen: true, anchorEl: event.currentTarget });
};

handleRequestClose = () => {
    this.setState({ notificationopen: false, notificationcount:false, notificationcolor:undefined });
};
 

toggleMenu(){
    let newStatus = !(this.state.open);
   
    this.setState({open:newStatus});
}

    onClick(e){ 

        this.props.logout();
        this.context.router.history.push("/"); 
    }
 
    render(){
        const classes = this.props.classes;
        const { isAuthenticated } = this.props.auth;
  
        const userLinks = (
         
              <div>
            <Button color="contrast" className={classes.button}  href="/events" >
                Events   
            </Button>

            <Button color="contrast" className={classes.button}  href="/web3" >
                Web3   
            </Button>

               <Button color="contrast" className={classes.button}  href="/greetings" >
                Greetings   
            </Button>

              <Button color="contrast" className={classes.button}  href="/infinite" >
                Infinite   
            </Button>

            <Button  color="contrast" className={classes.button} onClick={this.onClick.bind(this)} >
                Logout 
            </Button>
                  
         </div>


        );

        const guestLinks = (
          <div>
            <Link style={{textDecoration:"none"}} to="/signup">
                <Button color="contrast" className={classes.button}  >
                    Sign up    
                </Button>
            </Link>

            <Link style={{textDecoration:"none"}} to="/login">
                <Button  color="contrast" className={classes.button}  >
                    Login 
                </Button>
            </Link>
         </div>
        );

        return(
                <div className={classes.root} >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            {/* <IconButton color="contrast" aria-label="Menu">
                                <MenuIcon />
                            </IconButton> */}

                            {/* <img src="./../../images/logo.png" height="65px" alt="logo"/> */}
                            <IconButton onClick={this.toggleMenu} color="contrast" aria-label="Menu">
                            <MenuIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                Flexitricity?
                            </Typography>
                                 <IconButton  aria-label="NotificationsIcon">
                             <Badge className={classes.badge} badgeContent={4} color="accent">
                                <NotificationsIcon />
                            </Badge>
                                </IconButton>
                            <IconButton  aria-label="WhatshotIcon">
                                <Badge className={classes.badge} badgeContent={10} color="accent">
                                    <WhatshotIcon />
                                </Badge>
                             </IconButton>
                            <IconButton  aria-label="Public">
                                <Badge className={classes.badge} badgeContent={1} color="accent">
                                    <PublicIcon />
                                </Badge>
                            </IconButton>
                            <IconButton    
                                aria-owns={this.state.open ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}  
                                aria-label="SyncProblem">
                               <Badge className={classes.badge} 
                               badgeContent={this.state.notificationcount} 
                               color={this.state.notificationcolor}>
                                <SyncProblemIcon />
                            </Badge>
                            </IconButton> 
                            {/* <IconButton aria-label="CallReceived">
                                <CallReceivedIcon className={classes.icon} />
                            </IconButton>
                            <IconButton  aria-label="Assignment">
                                <Avatar className={classes.colorAvatar}>
                                    <AssignmentIcon />
                                </Avatar>
                            </IconButton> */}
                          
                                { isAuthenticated ? userLinks : guestLinks }
                        </Toolbar>
                    </AppBar> 
                     <Drawer open={this.state.open} onRequestClose={this.toggleMenu} onClick={this.toggleMenu}>
                        <SideMenu open={this.state.open} />
                     </Drawer> 
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.notificationopen}
                        onRequestClose={this.handleRequestClose} >
                        <MenuItem onClick={this.handleRequestClose}>
                        <Button href="/login" className={classes.button}>
                            Notification 1
                        </Button>
                        </MenuItem>
                        <MenuItem onClick={this.handleRequestClose}>Notification 2</MenuItem>
                        <MenuItem onClick={this.handleRequestClose}>Notification 3</MenuItem>
                    </Menu>
               </div>
        );
    }
}

Header.propTypes = {
    auth:PropTypes.object.isRequired,
    logout : PropTypes.func.isRequired, 
    classes: PropTypes.object.isRequired
}

Header.contextTypes = {
    router: PropTypes.object.isRequired
}

let StyledHeader = withStyles(styleSheet)(Header);
 
function mapStateToProps(state){
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(StyledHeader);