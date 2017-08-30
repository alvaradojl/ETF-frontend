
export const styleSheet = theme => ({
    container: {
      flexGrow: 1,
      position: 'relative',
      height: 100,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 4
    },
    suggestion: {
      display: 'block'
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    },
    textField: {
      width: '100%'
    }
  });