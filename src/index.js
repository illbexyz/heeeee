import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"

import 'semantic-ui-css/semantic.min.css'
import "./index.css"

import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"

import firebaseStore from "./stores/firebase"

ReactDOM.render(
    <Provider firebaseStore={firebaseStore}>
        <App />
    </Provider>,
    document.getElementById("root")
)
registerServiceWorker()
