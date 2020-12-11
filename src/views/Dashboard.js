import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from '../assets/data/notification.json';
import './Dashboard.css';
import CameraIcon from '../assets/icons/ic-camera.png';
import KeyboardIcon from '../assets/icons/ic-keyboard.png';
import WhiteCheckIcon from '../assets/icons/ic-white-check.png';

const Dashboard = props => {
    return (
        <div className="dashboard">
            <p className="paragraph-1">Just came back from grocery shopping?</p>
            <AddInventoryPanel />
            <NotificationPanel />
        </div>
    );
}

export default Dashboard;

const AddInventoryPanel = props => {
    return (
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
    );
}

class NotificationPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationItems: Notifications
        };
    }

    clearAllNotifications = () => {
        this.setState(prevState => ({ notificationItems: [] }));
    };

    dismissNotification = index => {
        let notificationItems = [ ...this.state.notificationItems ];
        notificationItems.splice(index, 1);
        this.setState({ notificationItems });
    }

    render() {
        return (
            <div className="notification-panel">
                <div className="notification-header mb-3">
                    <div className="notification-subheader">
                        <span className="notification-count">
                            { this.state.notificationItems.length }
                        </span>
                        <h2 className="notification-title">Notifications</h2>
                    </div>
                    <button className="btn clear-all-btn" onClick={this.clearAllNotifications}>Clear all</button>
                </div>
                <div className="notification-body">
                    {
                        this.state.notificationItems.map((notification, index) =>
                            <NotificationItem
                                key={index} notification={notification}
                                onNotificationDismiss={() => this.dismissNotification(index)}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}

const NotificationItem = props => {
    let { notification } = props;
    return (
        <div className="notification-item">
            <div className="notification-item-color" style={{ backgroundColor: notification.color }}></div>
            <div className="notification-item-image">
                {
                    notification.item.imageFile ?
                        <img
                            alt={notification.item.imageFile}
                            src={require(`../assets/images/inventory/${notification.item.imageFile}`).default}
                        /> :
                        (
                            notification.item.brandLogoFile ?
                                <img
                                    alt={notification.item.brandLogoFile}
                                    src={require(`../assets/images/logo/${notification.item.brandLogoFile}`).default}
                                /> : null
                        )
                }
            </div>
            <div className="notification-item-body">
                <h3 className="notification-item-title">
                    { notification.title }
                </h3>
                {
                    notification.item.brandName ?
                        <div className="notification-item-brand mb-1">
                            <span className="mr-2">Brand:</span>
                            {
                                notification.item.brandLogoFile ?
                                    <img
                                        alt={notification.item.brandLogoFile}
                                        src={require(`../assets/images/logo/${notification.item.brandLogoFile}`).default}
                                    /> : null
                            }
                            <strong>{ notification.item.brandName }</strong>
                        </div> : null
                }
                {
                    notification.message1 ?
                    <div
                        className="notification-item-message mb-1"
                        dangerouslySetInnerHTML={{ __html: notification.message1 }}
                    ></div> : null
                }
                {
                    notification.message2 ?
                    <div
                        className="notification-item-message"
                        dangerouslySetInnerHTML={{ __html: notification.message2 }}
                    ></div> : null
                }
            </div>
            <div className="notification-item-control">
                <button className="btn btn-default">
                    <img
                        className="d-inline-block d-sm-none resolve-btn-icon"
                        src={WhiteCheckIcon} alt="save-item"
                    />
                    <span className="d-none d-sm-inline-block">Resolve</span>
                </button>
                <button className="btn dismiss-btn" onClick={props.onNotificationDismiss}>
                    <span className="d-inline-block d-sm-none dismiss-btn-icon">
                        &times;
                    </span>
                    <span className="d-none d-sm-inline-block">Dismiss</span>
                </button>
            </div>
        </div>
    );
}