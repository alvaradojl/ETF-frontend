import { createStyleSheet } from 'material-ui/styles';

export const styleSheet = theme => ({
  container: {
     flexGrow: 1,
      marginTop: 30,
  },
    root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});