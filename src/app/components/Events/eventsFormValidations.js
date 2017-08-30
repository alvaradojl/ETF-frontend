
 export const validateErrorsOnEventsForm = (values) => {
    let errors = {};

    if(!values.description){
        errors.description="description is required.";
    }

   

    return errors;
}

export const validateWarningsOnEventsForm = values => {
  const warnings = {}
  
  return warnings
}
