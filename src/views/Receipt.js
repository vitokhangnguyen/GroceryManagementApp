import React from 'react';
import SelectLocationMap from '../shared/SelectLocationMap';
import './Receipt.css';
import Stores from '../assets/store_location.json';

export default class Receipt extends React.Component {
    state = {
        selectedLocation: null,
    };

    constructor(props) {
        super(props);
        this.selectLocation = this.selectLocation.bind(this);
    }

    selectLocation(selectedLocation) {
        this.setState(prevState => ({ selectedLocation }));
    }

    render() {
        return (
            <div className="receipt">
                <p className="paragraph-1">Here’s what we got from your receipt</p>
                {
                    !this.state.selectedLocation ?
                        <SelectLocationPanel locations={Stores} onLocationSelect={this.selectLocation} /> :
                        <LocationPanel location={this.state.selectedLocation} />
                }
            </div>
        );
    }
}

const SelectLocationPanel = props => {
    return (
        <div className="location-panel">
            <h2>Select Location</h2>
            <SelectLocationMap locations={props.locations} onLocationSelect={props.onLocationSelect} />
        </div>
    );
}

const LocationPanel = props => {
    let { logoFile } = props.location;
    return (
        <div className="location-panel">
            <h2>Location</h2>
            <img src={require(`../assets/images/logo/${logoFile}`).default} alt={logoFile} />
        </div>
    );
}