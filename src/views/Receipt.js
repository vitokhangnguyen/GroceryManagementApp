import React from 'react';
import { withRouter } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates'; 
import MapContainer from '../shared/MapContainer';
import './Receipt.css';
import EditIcon from '../assets/icons/ic-edit.png';
import BarcodeIcon from '../assets/icons/ic-barcode.png';
import KeyboardIcon from '../assets/icons/ic-keyboard-sm.png';
import Stores from '../assets/store_location.json';

class Receipt extends React.Component {
    state = {
        selectedLocation: null,
        receiptItems: [],
    };

    componentDidMount() {
        this.setState(prevState => this.props.scanResult);
    }

    selectLocation = selectedLocation => {
        this.setState(prevState => ({ selectedLocation }));
    }

    changeLocation = () => {
        this.setState(prevState => ({ selectedLocation: null }));
    }

    changeReceiptItems = items => {
        this.setState(prevState => {
            return ({ receiptItems: items });
        });
    }

    render() {
        return (
            <div className="receipt-view">
                <p className="paragraph-1">Here’s what we got from your receipt</p>
                {
                    !this.state.selectedLocation ?
                        <SelectLocationPanel locations={Stores} onLocationSelect={this.selectLocation} /> :
                        <LocationPanel location={this.state.selectedLocation} onLocationChange={this.changeLocation} />
                }
                <ReceiptItemPanel items={this.state.receiptItems} onItemsChange={this.changeReceiptItems} />
                <div className="button-panel">
                    <button className="back-btn w-50" onClick={() => this.props.history.goBack()}>
                        Back
                    </button>
                    <button className="confirm-btn w-50" onClick={() => this.props.history.goBack()}>
                        Confirm
                    </button>
                </div>
            </div>
        );
    }
}

const SelectLocationPanel = props => {
    return (
        <div className="receipt-panel">
            <h2>Select Location</h2>
            <MapContainer locations={props.locations} onLocationSelect={props.onLocationSelect} />
        </div>
    );
}

const LocationPanel = props => {
    let { logoFile, name, address1, address2 } = props.location;
    return (
        <div className="receipt-panel">
            <h2>Location</h2>
            <div className="location-item">
                <div className="location-logo">
                    <img src={require(`../assets/images/logo/${logoFile}`).default} alt={logoFile} />
                </div>
                <div className="location-body">
                    <div className="location-info">
                        <h3 className="location-name">{ name }</h3>
                        <div className="location-address">
                            <p className="mb-0">{ address1 }</p>
                            <p className="mb-0">{ address2 }</p>
                        </div>
                    </div>
                    <div className="location-control">
                        <button
                            className="btn btn-sm btn-default"
                            onClick={props.onLocationChange}
                        >
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ReceiptItemPanel = props => {
    let onItemChange = (newItem, index) => {
        props.items[index] = newItem;
        props.onItemsChange([...props.items]);
    };
    let onItemRemove = index => {
        props.items.splice(index, 1);
        props.onItemsChange([...props.items]);
    }
    let ReceiptItems = props.items.map((item, index) =>
        <ReceiptItem
            key={index} index={index} item={item}
            onItemChange={newItem => onItemChange(newItem, index)}
            onItemRemove={() => onItemRemove(index)}
        />
    );
    return (
        <div className="receipt-panel">
            <h2>Items</h2>
            { ReceiptItems }
            <div className="add-receipt-item">
                <div className="row h-100">
                    <div className="col-sm-6 right-bottom-border-sm">
                        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
                            <img alt="scan-receipt" src={BarcodeIcon} />
                            <p className="mb-0 mt-2">Scan Barcode</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
                            <img alt="manual-input" src={KeyboardIcon} />
                            <p className="mb-0 mt-2">Add Manually</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ReceiptItem = props => {
    let { item  } = props;
    let onChange = (name, data) => {
        item[name] = data;
        props.onItemChange(item);
    }
    return (
        <div className="receipt-item">
            <div className="receipt-item-image">
                <img 
                    src={require(`../assets/images/inventory/${item.imageFile}`).default}
                    alt={item.imageFile}
                />
            </div>
            <div className="receipt-item-body">
                <h3 className="receipt-item-name mb-0">{ item.name }</h3>
                <div className="receipt-item-brand">
                    <img
                        src={require(`../assets/images/logo/${item.brandLogoFile}`).default}
                        alt={item.brandLogoFile}
                    />
                    { item.brandName }
                </div>
                <div className="receipt-item-expiry-date mb-2">
                    <label className="mb-0 mr-2" for={`item-expiry-date-${props.index}`}>Expire on</label>
                    <SingleDatePicker
                        date={item.expiryDate}
                        onDateChange={date => onChange("expiryDate", date)}
                        focused={item.expiryDateFocused}
                        onFocusChange={({ focused }) => onChange("expiryDateFocused", focused)}
                        displayFormat="yyyy-MM-DD"
                        showDefaultInputIcon={true}
                        inputIconPosition="after"
                        openDirection="up"
                        small={true}
                        id={`item-expiry-date-${props.index}`}
                    />
                </div>
                <div className="receipt-item-categories">
                    <span>Categories:</span>
                    <span className="receipt-item-category-item vegetable">
                        Vegetable
                    </span>
                    <img className="ml-3" src={EditIcon} alt="edit-category" />
                </div>
            </div>
            <button
                className="btn btn-default receipt-item-remove-btn"
                onClick={props.onItemRemove}
            >
                &times;
            </button>
        </div>
    );
}

export default withRouter(Receipt);