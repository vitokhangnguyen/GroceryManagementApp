# Grocery Management App

## Setup

1. Clone the code.

1. Install dependencies:
    ```sh
    npm i
    ```
1. Run development server:
    ```sh
    npm start
    ```

1. Navigate to `http://localhost:3000` to open the app.

> The design for the app can be found [here](https://www.figma.com/file/8yt37mVBsDkTuRdd80nVdS/Design-Charlie?node-id=5%3A0).

## Project Structure

All the components are under `src/views` (components that encompass a page) or `src/shared` (child components that are reusable).

Routing has been set up and can be found in `src/App.js`.

Global styles can be located in `src/index.css`. If you want to use local styling, create a CSS file **with the same name** as the component and import it in the JS file:

```jsx
import './Dashboard.css';
```

The project has been equipped with `bootstrap` (4.5) and `react-bootstrap`.

Images or icons can be found under `src/assets`. See following example on how to use the assets:

```jsx
import CameraIcon from '../assets/icons/ic-camera.png';
// ...
<img src={CameraIcon} />
```