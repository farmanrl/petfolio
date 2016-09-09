import React from 'react';
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {
  cyan500, cyan700,
  pinkA200, greenA700, green700, blue500, blue700,
  grey100, grey400, grey500,
} from 'material-ui/styles/colors';
import AddButton from './AddButton';
import TabBar from './TabBar';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: grey400,
    accent1Color: greenA700,
    accent2Color: grey100,
    accent3Color: grey500,
  },
});

export default class Petfolio extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <NavBar />
          <TabBar />
          <div style={{display: 'fixed', bottom: 48, right: 48}}>
            <AddButton />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
