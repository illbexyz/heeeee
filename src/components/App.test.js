import React from "react"
import ReactDOM from "react-dom"
import { MemoryRouter } from "react-router"
import { Provider } from "mobx-react"

import App from "./App"

import firebaseStore from "../stores/firebase"
import lessonsStore from "../stores/lessons"

it("renders without crashing", done => {
    const div = document.createElement("div")
    ReactDOM.render(
        <MemoryRouter>
            <Provider firebaseStore={firebaseStore} lessonsStore={lessonsStore}>
                <App />
            </Provider>
        </MemoryRouter>,
        div
    )

    setTimeout(() => done())
})
