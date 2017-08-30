import orange from "material-ui/colors/orange"; 
import deepOrange from "material-ui/colors/deepOrange";
import amber from "material-ui/colors/amber";

export const styleSheet = theme => ({
    root: {
        marginTop: "80px", 
    },
    appBar:{
        backgroundColor: amber[500], 
    },
    flex: {
        flex: 1,
    },
    badge: {
        margin: "8px",
  },
    icon:{
        fill: orange[500],
    },
    colorAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: orange[500],
  }
});