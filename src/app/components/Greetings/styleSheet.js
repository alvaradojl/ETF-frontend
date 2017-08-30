import { createStyleSheet } from 'material-ui/styles';

export const styleSheet = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      background: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    subheader: {
      width: '100%',
    },
});