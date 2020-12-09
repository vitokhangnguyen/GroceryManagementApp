import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import CameraIcon from '../assets/icons/ic-camera.png';
import KeyboardIcon from '../assets/icons/ic-keyboard.png';
import NotifTitNum from '../assets/images/uielements/notif-tit-num.svg';
import DashNotif from '../assets/images/uielements/dashboard-pic.svg';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifvisible: true
        };
    }

    render() {
        return (
            <div className="dashboard px-4">
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
                <div className="notification-panel">
                    <div className="notification-header mt-4">
                        <div className="notification-title">
                            {
                                this.state.notifvisible &&
                                <img alt="ui-header" src={NotifTitNum} />
                            }
                            <p className="mx-1 my-0">Notifications</p>
                        </div>
                        <button className="btn" onClick={() => this.setState({ notifvisible: false })}>Clear all</button>
                    </div>
                    {
                        this.state.notifvisible &&
                        <img alt="ui-element" src={DashNotif} className="w-100 my-2" />
                    }
                </div>
            </div>
        );
    }
}