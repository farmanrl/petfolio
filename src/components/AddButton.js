import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AddHostForm from './AddHostForm';
import AddPetForm from './AddPetForm';
import AddPhotoForm from './AddPhotoForm';

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openMenu: false,
      openHost: false,
      openPet: false,
      openPhoto: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleAddHost = this.handleAddHost.bind(this);
    this.handleAddPet = this.handleAddPet.bind(this);
    this.handleAddPhoto = this.handleAddPhoto.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }
  handleTouchTap(event) {
    this.setState({
      openMenu: !this.state.openMenu,
      openHost: false,
      openPet: false,
      openPhoto: false,
      anchorEl: event.currentTarget,
    });
  }
  handleAddPhoto() {
    this.setState({
      openMenu: false,
      openHost: false,
      openPet: false,
      openPhoto: true,
    });
  }
  handleAddHost() {
    this.setState({
      openMenu: false,
      openHost: true,
      openPet: false,
      openPhoto: false,
    });
  }
  handleAddPet() {
    this.setState({
      openMenu: false,
      openHost: false,
      openPet: true,
      openPhoto: false,
    });
  }
  handleMenuClose() {
    this.setState({
      openMenu: false,
      openHost: false,
      openPet: false,
      openPhoto: false,
    });
  }
  render() {
    return (
      <div style={{position: 'fixed', bottom: 48, right: 48}}>
        <FloatingActionButton
            secondary={true}
            onTouchTap={this.handleTouchTap}>
          <ContentAdd />
        </FloatingActionButton>
        <Popover
            open={this.state.openMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
            targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
            onRequestClose={this.handleMenuClose}
        >
          <Menu autoWidth={true}>
            <MenuItem
                primaryText="Add Host"
                onTouchTap={this.handleAddHost}
                disabled={false}/>
            <MenuItem primaryText="Add Pet"
                      onTouchTap={this.handleAddPet} />
            <MenuItem primaryText="Add Photo"
                      onTouchTap={this.handleAddPhoto} />
          </Menu>
        </Popover>
        {this.state.openHost &&
         <AddHostForm />
        }
        {this.state.openPet &&
          <AddPetForm />
        }
        {this.state.openPhoto &&
          <AddPhotoForm />
        }
      </div>
    );
  }
}
