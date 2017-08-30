import React from "react";
 import Button from "material-ui/Button";
 import { CircularProgress } from 'material-ui/Progress';
 import PropTypes from 'prop-types';
 import { withStyles } from 'material-ui/styles';
 import { LinearProgress } from 'material-ui/Progress';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import WifiIcon from 'material-ui-icons/Wifi';
import BluetoothIcon from 'material-ui-icons/Bluetooth';
import Grid from 'material-ui/Grid';
import { GridList, GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/typography';


const styleSheet = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

export class Greetings extends React.Component{

  state = {
    checked: ['wifi'],
  };

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

    render(){

        const classes = this.props.classes;

        return(
              
            <Grid container className={classes.container}>
                <Grid item md={3}>
                
                </Grid>
                <Grid item md={6}>
              
                <Typography type="display3" color="inherit">
                Connecting for a better grid and a greener future.
                </Typography>

                </Grid> 
                <Grid item md={3}>
                    
                </Grid> 
            </Grid>  
        );
    }
}

Greetings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Greetings);