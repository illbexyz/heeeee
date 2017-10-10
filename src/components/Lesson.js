// @flow

import React, { Component } from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import { observer } from 'mobx-react'

import { type UpdateType } from '../stores/firebase'
import { type Lesson } from '../config/firebase'

type LessonProps = {
    lesson: Lesson,
    onIncrement: (type: UpdateType) => any,
    onDecrement: (type: UpdateType) => any
}

const LessonCard = ({ text, value, onIncrement, onDecrement }) => (
    <Card>
        <Card.Content header={`${text}: ${value}`} />
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button color="blue" onClick={onDecrement}>
                    <Icon name="minus" />
                </Button>
                <Button basic color="blue" onClick={onIncrement}>
                    <Icon name="plus" />
                </Button>
            </div>
        </Card.Content>
    </Card>
)

const LessonUI = observer(
class LessonUI extends Component<LessonProps> {

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown = (event: KeyboardEvent) => {
        const { onIncrement } = this.props
        
        if (event.key === 'a' || event.key ==='1') {
            onIncrement('haaaaa')
        } else if (event.key === 'e' || event.key ==='2') {
            onIncrement('heeeee')
        } else if (event.key === 'm' || event.key ==='3') {
            onIncrement('hmmmmm')
        } else if (event.key === 'o' || event.key ==='4') {
            onIncrement('okay')
        }
    } 

    render() {
        const { lesson, onIncrement, onDecrement } = this.props
        return (
            <div>
                <Card.Group>
                    <LessonCard
                        text="Haaaaa"
                        value={lesson.haaaaa}
                        onIncrement={() => onIncrement('haaaaa')}
                        onDecrement={() => onDecrement('haaaaa')}
                    />
                    <LessonCard
                        text="Heeeee"
                        value={lesson.heeeee}
                        onIncrement={() => onIncrement('heeeee')}
                        onDecrement={() => onDecrement('heeeee')}
                    />
                    <LessonCard
                        text="Hmmmmm"
                        value={lesson.hmmmmm}
                        onIncrement={() => onIncrement('hmmmmm')}
                        onDecrement={() => onDecrement('hmmmmm')}
                    />
                    <LessonCard
                        text="Okay"
                        value={lesson.okay}
                        onIncrement={() => onIncrement('okay')}
                        onDecrement={() => onDecrement('okay')}
                    />
                </Card.Group>
            </div>
        )
    }
})

export default LessonUI
