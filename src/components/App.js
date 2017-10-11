// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import { FirebaseStore } from '../stores/firebase'

import { dateToLessonId } from '../utils'

import DatesList from './DatesList'
import LessonUI from './Lesson'

const Sidebar = styled.div`padding: 0px 8px;`

const LessonContainer = styled.div`padding: 0px 16px;`

const HeaderBar = styled.div`
    padding: 8px;
    margin-bottom: 16px;
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
                        <div>
                            <HeaderBar />
                            <Grid>
                                <Grid.Column
                                    mobile={16}
                                    tablet={4}
                                    computer={4}
                                >
                                    <Sidebar>
                                        <DatesList
                                            activeId={
                                                firebaseStore.currentLesson &&
                                                dateToLessonId(
                                                    firebaseStore.currentLesson
                                                        .date
                                                )
                                            }
                                            lessonsIds={
                                                firebaseStore.lessonsIds
                                            }
                                            onLessonChange={
                                                firebaseStore.selectLesson
                                            }
                                        />
                                    </Sidebar>
                                </Grid.Column>
                                <Grid.Column
                                    mobile={16}
                                    tablet={12}
                                    computer={12}
                                >
                                    <LessonContainer>
                                        {firebaseStore.currentLesson && (
                                            <LessonUI
                                                lesson={
                                                    firebaseStore.currentLesson
                                                }
                                                onIncrement={
                                                    firebaseStore.increment
                                                }
                                                onDecrement={
                                                    firebaseStore.decrement
                                                }
                                            />
                                        )}
                                    </LessonContainer>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </Router>
                )
            }
        }
    )
)

export default App
