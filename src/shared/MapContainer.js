import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import './MapContainer.css';
import PlaceholderImage from '../assets/images/placeholder-image.png';

class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedLocation: null,
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedLocation: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    onInfoWindowOpen = (props, e) => {
        const infoWindowContent = (
            <>
                <img
                    className="location-image"
                    src={
                        this.state.selectedLocation ?
                            require(`../assets/images/locations/${this.state.selectedLocation.imageFile}`).default :
                            PlaceholderImage
                    }
                    alt={ this.state.selectedLocation?.imageFile ?? 'loading-image'}
                />
                <button
                    className="btn btn-sm btn-default float-right"
                    onClick={e => this.props.onLocationSelect(this.state.selectedLocation)}
                >
                    Select
                </button>
                <h3 className="location-name">{ this.state.selectedLocation?.name }</h3>
                <p className="location-description mb-2">{ this.state.selectedLocation?.description }</p>
                <p className="location-address mb-0">{ this.state.selectedLocation?.address1 }</p>
                <p className="location-address mb-0">{ this.state.selectedLocation?.address2 }</p>
            </>
        );
        ReactDOM.render(React.Children.only(infoWindowContent), document.getElementById("iwc"));
    }

    render() {
        return (
            <div className="map-wrapper">
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={{ width: '100%', height: '100%' }}
                    initialCenter={{ lat: 43.78519674372565, lng: -79.32427359601185}}
                    onClick={this.onMapClicked}
                >
                    {
                        this.props.locations?.map((location, index) => 
                            <Marker
                                key={index} title={location.title}
                                name={location.name}
                                description={location.description}
                                address1={location.address1}
                                address2={location.address2}
                                position={location.position}
                                imageFile={location.imageFile}
                                logoFile={location.logoFile}
                                onClick={this.onMarkerClick}
                            />
                        )
                    }
                    <InfoWindow
                        marker={this.state.activeMarker}
                        onClose={this.onMapClicked}
                        onOpen={this.onInfoWindowOpen}
                        visible={this.state.showingInfoWindow}
                    >
                        <div id="iwc"></div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDu43X7smYwhfHVqGxLEqqoeQHFT6OZFYA'
})(MapContainer);