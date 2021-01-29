import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { Marker, Map, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  render() {
    return (
      <div>
        <NavLink to="/">
          <button>Back to Main Page</button>
        </NavLink>
        <h3>COVID Google Heat Map</h3>

        <Map
          style={{ width: "50vw", height: "50vh" }}
          google={this.props.google}
          onClick={this.onMapClicked}
        >
          <Marker onClick={this.onMarkerClick} name={"Current location"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCNH2KkWsxhTW9koqHKk8F2QK8HLTO0nM0",
})(MapContainer);
