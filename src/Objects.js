import React, { Component } from 'react'

const x = (props) => {

    return (
        <div></div>
    )
}

class Objects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            habits: [
                { active: true, name: 'hello' },
                { active: true, name: 'at' },
                { active: false, name: 'cat' },
                { active: false, name: 'bat' }]
        }
    }

    render() {
        let activeHabits = this.state.habits.filter(habit => habit.active)
        let activeHabitNames = activeHabits.map(habit => <li>{habit.name}</li>)

        let inactiveHabits = this.state.habits.filter(habit => !habit.active)
        let inactiveHabitNames = inactiveHabits.map(habit => <li>{habit.name}</li>)

        return (
            <div className="wrapper">
                <div className="margin1"></div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>Habits Page</h3>
                    <h4>Active Habits:</h4>
                    <ul>
                        {activeHabitNames}
                    </ul>
                    <h4>Inactive Habits:</h4>
                    <ul>
                        {inactiveHabitNames}
                    </ul>
                </div>
                <div className="margin2"></div>
            </div>
        )
    }
}

export default Objects