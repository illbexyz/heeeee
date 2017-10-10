// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'

import { FirebaseStore } from '../stores/firebase'

import DatesList from './DatesList'
import LessonUI from './Lesson'

const Row = styled.div`
    display: flex;
    flex-direction: row;
    padding: 24px 0px;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
`

const Sidebar = styled.div`padding: 0px 8px;`

const LessonContainer = styled.div`padding: 0px 16px;`

const HeaderBar = styled.div`
    padding: 8px;
    background-color: #2185d0;
    height: 50px;
`

type AppProps = {
    firebaseStore: FirebaseStore
}

const App = inject('firebaseStore')(
    observer(
        class App extends Component<AppProps> {
            componentWillMount() {
                this.props.firebaseStore.fetchLessons()
            }

            render() {
                const { firebaseStore } = this.props

                return (
                    <Router>
                        <Column>
                            <HeaderBar />
                            <Row>
                                <Sidebar>
                                    <DatesList
                                        lessons={firebaseStore.lessons}
                                        onLessonChange={
                                            firebaseStore.selectLesson
                                        }
                                    />
                                </Sidebar>
                                <LessonContainer>
                                    {firebaseStore.currentLesson && (
                                        <LessonUI
                                            lesson={firebaseStore.currentLesson}
                                            onIncrement={
                                                firebaseStore.increment
                                            }
                                            onDecrement={
                                                firebaseStore.decrement
                                            }
                                        />
                                    )}
                                </LessonContainer>
                            </Row>
                        </Column>
                    </Router>
                )
            }
        }
    )
)

export default App
