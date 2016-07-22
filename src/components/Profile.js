import React from 'react';
import {PageHeader} from 'react-bootstrap';

import Information from './Information';
import MediaPanel from './MediaPanel';
import AddPlaceForm from './AddPlaceForm';

export default class Profile extends React.Component {
  render () {
    return (
      <div>
        <PageHeader>
          <div style={{display: "flex"}}>
            <div style={{height: "25%", paddingLeft: "5%"}}>
              <img height="100%" src="https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg" />
            </div>
            <div style={{display: "flex", flexDirection: "column", paddingLeft: "2.5%"}}>
              <p>Mr. Blue</p>
              <small>Available for Adoption!</small>
              <small>Located in Seattle, Washington</small>
            </div>
          </div>
          <Information />
        </PageHeader>
        <MediaPanel />
        <MediaPanel />
        <AddPlaceForm />
      </div>
    );
  }
}
