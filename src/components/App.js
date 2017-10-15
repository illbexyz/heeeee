// @flow

import React, { Component } from "react"
import styled from "styled-components"
import { Route, Switch } from "react-router-dom"

import AppHeader from "./AppHeader"
import PageLessons from "./PageLessons"
import PageStats from "./PageStats"
import NotFound404 from "./NotFound404"

const AppRoot = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

class App extends Component {
    render() {
        return (
            <AppRoot>
                <AppHeader />
                <Wrapper>
                    <Switch>
                        <Route path="/lessons" component={PageLessons} />
                        <Route path="/stats" component={PageStats} />
                        <Route component={NotFound404} />
                    </Switch>
                </Wrapper>
            </AppRoot>
        )
    }
}

export default App
