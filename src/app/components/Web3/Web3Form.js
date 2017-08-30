import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import styleSheet from './styleSheet';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import BigNumber from "bignumber.js";
import Button from 'material-ui/Button';

// var isManaged = typeof(window.web3) == "object";
// let web3Proxy;
let amount;

class Web3Form extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            amount:0
        };

        // window.addEventListener('load', function () { 
        //       web3Proxy= isManaged ? new Web3(web3.currentProvider) : new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8080/rpc"));
        // });
        
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateValues= this.updateValues.bind(this);
    }

      updateValues(e){
        //  let web3;
        if(typeof web3 !== 'undefined'){
            web3 = new Web3(web3.currentProvider);
            console.log("the web3 was tagged as  undefined web3 ");
        }
        
        else{
            console.log("web3 was undefined");
          //  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
           

       // console.log(JSON.stringify(web3));
    
        let x = new BigNumber(123.4567);
        let y = new BigNumber('123456.7e-3');
        let z = new BigNumber(x);
    
        console.log("x:" + x);
        console.log("y:" + y);
        console.log("z:" + z);
        
        console.log("x.equals(y) && y.equals(z) && x.equals(z):" +  x.equals(y) && y.equals(z) && x.equals(z));   
       let self = this;
        var coinbase = window.web3.eth.coinbase;
        var originalBalance = window.web3.eth.getBalance(coinbase,function(error,result){
    
       self.setState({ amount: window.web3.fromWei( result, 'ether')});
    
            console.log("balance found: " + amount + " eth");
        });
    
        web3.net.getPeerCount(function(error, result){ 
            console.log("peers found: " + result);
         });
    }

    componentWillMount() {
       // console.log("web3Proxy on componentDidMount: " + JSON.stringify(web3Proxy));
     
      }

      componentDidMount() {
       //   console.log("web3Proxy on componentDidMount: " + JSON.stringify(web3Proxy));
        
      }
   

    render(){
 
        const { classes } = this.props;
 
        return(
            <Grid container className={classes.container}>
            <Grid item md={3}>

            </Grid>
            <Grid item md={6}> 
                <Typography type="display2" gutterBottom>
                    Amount: {amount}
                </Typography>

              
 
                    <Grid container className={classes.root}>
                        <Grid item md={12}>
                            <Grid
                            container
                            className={classes.demo}
                            align="center"
                            direction="row"
                            justify="center">

                          

                            <Button  
                                    onClick={this.updateValues}
                                    raised  
                                    color="accent" 
                                    className={classes.button}
                                    style = {{  
                                    width:'100px'    
                                    }}>
                                    Get Info
                                    </Button>

                            </Grid>
                        </Grid>
                    </Grid>
                
            </Grid>
            <Grid item md={3}>
              
            </Grid>
        </Grid>
        );
    }

}

Web3Form.propTypes = { 
    classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Web3Form);