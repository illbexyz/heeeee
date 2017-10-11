// @flow

import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

type DatesListProps = {
    activeId: string,
    lessonsIds: string[],
    onLessonChange: (lessonId: string) => any
}

class Dates extends Component<DatesListProps> {
    render() {
        const { activeId, lessonsIds, onLessonChange } = this.props
        return (
            <Menu vertical>
                <Menu.Item header>
                    Lezioni
                </Menu.Item>
                {lessonsIds.map(lessonId => (
                    <Menu.Item
                        name={lessonId}
                        key={lessonId}
                        onClick={() => onLessonChange(lessonId)}
                        active={activeId === lessonId}
                    />
                ))}
            </Menu>
        )
    }
}

export default Dates
