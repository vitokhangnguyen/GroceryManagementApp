import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';
import './CameraView.css';
import TakePhotoIcon from '../assets/icons/ic-take-photo.png';
// import ArrowUpIcon from '../assets/icons/ic-arrow-up.png';

class CameraView extends React.Component {
    CameraArea = React.createRef();
    
    state = {
        cameraReady: false,
        cameraMsg: 'Loading camera. Please wait...',
    };

    componentDidMount () {
        this.setState(prevState => ({ cameraReady: true }));
    }

    render() {
        const cameraWidth = this.CameraArea.current?.clientWidth;
        const cameraHeight = this.CameraArea.current?.clientHeight;
        const cameraResolution = {width: cameraWidth, height: cameraHeight };
        const cameraMsg = 'Please give us camera permission and refresh for scanning';
        return (
            <div className="camera-view px-4">
                <p className="paragraph-1">Place your receipt vertically centered on a flat surface</p>
                <div ref={this.CameraArea} className="camera-area">
                    { this.state.cameraReady ?
                        <Camera
                            idealResolution={cameraResolution}
                            onCameraError={err => this.setState(prevState => ({ cameraReady: false, cameraMsg }))}
                        /> : <p className="text-center w-100" style={{marginTop: (cameraHeight ?? 24) / 2 - 12}}>{this.state.cameraMsg}</p> }
                </div>
                <div className="d-flex flex-column align-items-center mt-3">
                    <Link to="/inventory/add/receipt/">
                        <img className="mb-2" alt="scan-receipt-button" src={TakePhotoIcon} />
                    </Link>
                    {/* <img className="mb-2" alt="point-to-scan-button" src={ArrowUpIcon} width="40" />
                    <p className="text-center">Take an image of your receipt to help us fill in the items for you</p> */}
                </div>
                <div className="button-panel">
                    <button className="back-button w-100" onClick={() => this.props.history.goBack()}>
                        Back
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(CameraView);