import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AddPlaceForm from './AddPlaceForm';
import AddPetForm from './AddPetForm';
import AddPostForm from './AddPostForm';
import AddPhotoForm from './AddPhotoForm';

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorMenu: null,
      anchorItem: null,
      openMenu: false,
      openPlace: false,
      openPet: false,
      openPhoto: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleAddPlace = this.handleAddPlace.bind(this);
    this.handleAddPet = this.handleAddPet.bind(this);
    this.handleAddPhoto = this.handleAddPhoto.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleItemClose = this.handleItemClose.bind(this);
  }
  handleTouchTap(event) {
    this.setState({
      openMenu: !this.state.openMenu,
      openPlace: false,
      openPet: false,
      openPhoto: false,
      anchorMenu: event.currentTarget,
    });
  }
  handleAddPhoto(event) {
    this.setState({
      openPlace: false,
      openPet: false,
      openPhoto: !this.state.openPhoto,
      anchorItem: event.currentTarget,
    });
  }
  handleAddPlace(event) {
    this.setState({
      openPlace: !this.state.openPlace,
      openPet: false,
      openPhoto: false,
      anchorItem: event.currentTarget,

    });
  }
  handleAddPet(event) {
    this.setState({
      openPlace: false,
      openPet: !this.state.openPet,
      openPhoto: false,
      anchorItem: event.currentTarget,
    });
  }
  handleMenuClose() {
    this.setState({
      openMenu: false,
      openPlace: false,
      openPet: false,
      openPhoto: false,
    });
  }
  handleItemClose() {
    this.setState({
      openPlace: false,
      openPet: false,
      openPhoto: false,
    });
  }
  render() {
    return (
      <div style={{position: 'fixed', bottom: 48, right: 48}}>
        <FloatingActionButton secondary={true} onTouchTap={this.handleTouchTap}>
          <ContentAdd />
        </FloatingActionButton>
        <Popover
            open={this.state.openMenu}
            anchorEl={this.state.anchorMenu}
            anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={this.handleMenuClose}
        >
          <Menu autoWidth={true}>
            <MenuItem primaryText="Add Place" onTouchTap={this.handleAddPlace} />
            <MenuItem primaryText="Add Pet" onTouchTap={this.handleAddPet} />
            <MenuItem primaryText="Add Photo" onTouchTap={this.handleAddPhoto} />
          </Menu>
        </Popover>
        <Popover
            open={this.state.openPlace}
            anchorEl={this.state.anchorItem}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={this.handleItemClose}
        >
          <AddPlaceForm />
        </Popover>
        <Popover
            open={this.state.openPet}
            anchorEl={this.state.anchorItem}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={this.handleItemClose}
        >
          <AddPetForm />
        </Popover>
        <Popover
            open={this.state.openPhoto}
            anchorEl={this.state.anchorItem}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            onRequestClose={this.handleItemClose}
        >
          <AddPhotoForm />
        </Popover>
      </div>
    );
  }
}
