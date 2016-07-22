import React from 'react';
import {Button, Panel} from 'react-bootstrap';

export default class Information extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <div style={{paddingLeft: "5%", paddingRight: "5%"}}>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          click
        </Button>
        <Panel collapsible expanded={this.state.open}>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
          Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </Panel>
      </div>
    );
  }
}
