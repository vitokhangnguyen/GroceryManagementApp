import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import CameraIcon from '../assets/icons/ic-camera.png';
import KeyboardIcon from '../assets/icons/ic-keyboard.png';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <p className="paragraph-1">Just came back from grocery shopping?</p>
                <div className="add-inventory-panel">
                    <div className="row h-100">
                        <div className="col-md-6 right-bottom-border-md">
                            <Link className="add-inventory-btn" to="/inventory/add/scanning">
                                <div className="h-100 d-flex justify-content-center align-items-center flex-column">
                                    <img alt="scan-receipt" src={CameraIcon} />
                                    <p className="mb-0 mt-2">Scan Receipt</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <Link className="add-inventory-btn" to="/inventory/add/receipt">
                                <div className="h-100 d-flex justify-content-center align-items-center flex-column">
                                    <img alt="manual-input" src={KeyboardIcon} />
                                    <p className="mb-0 mt-2">Manual Input</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}