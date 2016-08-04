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
import firebase from 'firebase';

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
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
  }
  handleTouchTap(event) {
    this.setState({
      openMenu: !this.state.openMenu,
      openPlace: false,
      openPet: false,
      openPhoto: false,
      anchorEl: event.currentTarget,
    });
  }
  handleAddPhoto() {
    this.setState({
      openMenu: false,
      openPlace: false,
      openPet: false,
      openPhoto: true,
    });
  }
  handleAddPlace() {
    this.setState({
      openMenu: false,
      openPlace: true,
      openPet: false,
      openPhoto: false,
    });
  }
  handleAddPet() {
    this.setState({
      openMenu: false,
      openPlace: false,
      openPet: true,
      openPhoto: false,
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
  render() {
    console.log(firebase.auth().currentUser === null);
    return (
      <div style={{position: 'fixed', bottom: 48, right: 48}}>
        <FloatingActionButton secondary={true} onTouchTap={this.handleTouchTap} disabled={firebase.auth().currentUser !== null}>
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
            <MenuItem primaryText="Add Place" onTouchTap={this.handleAddPlace} disabled={false}/>
            <MenuItem primaryText="Add Pet" onTouchTap={this.handleAddPet} />
            <MenuItem primaryText="Add Photo" onTouchTap={this.handleAddPhoto} />
          </Menu>
        </Popover>
        {this.state.openPlace &&
         <AddPlaceForm />
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
