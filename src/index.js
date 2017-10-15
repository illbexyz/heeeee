import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles"
import { BrowserRouter as Router } from "react-router-dom"

import { primary, accent } from "./config/colors"

import "./index.css"

import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"

import firebaseStore from "./stores/firebase"
import lessonsStore from "./stores/lessons"

const theme = createMuiTheme({
    palette: {
        primary,
        secondary: accent
    }
})

ReactDOM.render(
    <Router basename="/heeeee">
        <MuiThemeProvider theme={theme}>
            <Provider firebaseStore={firebaseStore} lessonsStore={lessonsStore}>
                <App />
            </Provider>
        </MuiThemeProvider>
    </Router>,
    document.getElementById("root")
)
registerServiceWorker()
