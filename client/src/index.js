import React from 'react'
import {render} from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'
import {Provider} from 'react-redux'
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.css";
import './shared/styles/global.scss'

render(<Provider store={store}><App/></Provider>, document.getElementById('root'))

reportWebVitals()
