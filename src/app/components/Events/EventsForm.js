import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEvent } from "./../../actions/EventsActions";
import mystore from "./../../store"; 
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';  
import styleSheet from "./styleSheet";
import { Field, reduxForm } from 'redux-form'
import { validateErrorsOnEventsForm, validateWarningsOnEventsForm } from "./eventsFormValidations";
import Grid from 'material-ui/Grid'; 
import Typography from 'material-ui/Typography';
import { RenderTextField } from "./../MaterialUi/RenderField";

class EventsForm extends React.Component{
      constructor(props){
        super(props);
        this.state = {
            description:"", 
            errors:{},
            isLoading:false
        };

        this.onSubmit = this.onSubmit.bind(this); 
    }

    onSubmit(values){
    
        this.setState({errors:{}, isLoading:true});
        
        let newEvent = {
            description : values.description, 
        }

        
    mystore.dispatch({type:"TOGGLE_LOADING", status: true});

    let self = this;

        mystore.dispatch(addEvent(newEvent))
        .then((response) =>{
            mystore.dispatch({type:"TOGGLE_LOADING", status: false}); 
            console.log(JSON.stringify(response.data));
            mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"success", text:"A new event has been added"}});
            self.setState({errors:{}, isLoading:false}); 
        }).catch(
            (result) =>{
                mystore.dispatch({type:"TOGGLE_LOADING", status: false}); 
                if(result.response.status==401){
                mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"Please login "}});

                    self.context.router.history.push("/login");
                }
                else{
                    this.setState({errors:{}, isLoading:false}); 
                    mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to create an event."}});
                    console.log(JSON.stringify(result));
                }
               
            }
        );
 
    }

    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props
        const { description, isLoading }  = this.state;
        const { classes } = this.props;
        return(



            <Grid container className={classes.container}>
            <Grid item md={3}>

            </Grid>
            <Grid item md={6}> 
                <Typography type="display2" gutterBottom>
                    Add Event
                </Typography>

                <form onSubmit={ handleSubmit(this.onSubmit) }>
                

                    <Field
                    name="description"
                    type="text"
                    component={RenderTextField}
                    className={classes.textField}
                    label="Description"
                    placeholder="some event" />

                    <br/>
                    <br/>

                   


                    <Grid container className={classes.root}>
                        <Grid item md={12}>
                            <Grid
                            container
                            className={classes.demo}
                            align="center"
                            direction="row"
                            justify="center">

                                <Button 
                                type="submit" 
                                raised 
                                disabled={pristine || submitting || this.state.isLoading}
                                color="accent" 
                                className={classes.button}
                                style = {{  
                                width:'100px'    
                                }}>
                                Add
                                </Button>

                             


                            </Grid>
                        </Grid>
                    </Grid>
                </form> 
                    
             
            </Grid>
            <Grid item md={3}>
              
            </Grid>
        </Grid>


 

       
        );
    }
}
 


const mapStateToProps = (state) =>{
    return {
        messages:state.messages, 
        events:state.events
    }
}


EventsForm.propTypes = { 
    classes: PropTypes.object.isRequired
}

EventsForm.contextTypes = {
    router : PropTypes.object.isRequired
}


EventsForm = connect(mapStateToProps, {})(withStyles(styleSheet)(EventsForm));

export default reduxForm({
    form:'events',
    validate:validateErrorsOnEventsForm,
    warn:validateWarningsOnEventsForm
})(EventsForm);
 