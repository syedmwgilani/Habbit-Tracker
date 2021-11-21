import React, { Component } from 'react'

const { addPrefix } = require('./helperModule.js')


function InnerBar(props) {
    const progPercent = Math.round(props.progress / props.dailyOccurrence * 100)
    const barSize = progPercent < 100 ? progPercent : 100

    const innerBar = {
        width: barSize + '%',
    }

    return (
        <div className="inner-bar" style={innerBar}>
            <span className="inner-bar-text-left">+</span>
            <span className="inner-bar-text-center">{props.name}</span>
            <span className="inner-bar-text-right">{props.progress} / {props.dailyOccurrence}</span>
        </div>
    )
}

function ProgressBar(props) {
    return (
        <div>
            <div className="progress-bar" onClick={props.onClick}>
                <InnerBar progress={props.progress}
                    name={props.name}
                    dailyOccurrence={props.dailyOccurrence} />
            </div>
            <div className="decrement-button ml1" onClick={props.onClickDecrement}>
                <div className="decrement-inner-button">
                    <span className="decrement-inner-button-content">-</span>
                </div>
            </div>
        </div>
    )
}


class Habits extends Component {
    constructor(props) {
        super(props)

        const today = new Date()
        const daysOfTheWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const dayOfTheWeek = daysOfTheWeeks[today.getDay()]

        const monthStr = (today.getMonth() + 1).toString()
        const dayStr = today.getDate().toString()
        const dateKeyString = today.getFullYear() + '_'
            + addPrefix(() => monthStr.length > 1, monthStr, '0')
            + '_'
            + addPrefix(() => dayStr.length > 1, dayStr, '0')

        const dateFormattedString = addPrefix(() => monthStr.length > 1, monthStr, '0')
            + '/'
            + addPrefix(() => dayStr.length > 1, dayStr, '0')
            + '/'
            + today.getFullYear().toString().substr(-2)

        const JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
        const activeHabitTemp = JSON.parse(JSONactiveHabitTemp)
        console.log('LOADED activeHabitTemp: ', activeHabitTemp)

        let habits = {}
        if (activeHabitTemp) {
            const JSONhabits = localStorage.getItem('habits_' + dateKeyString)

            if (JSONhabits === null) {
                //Create new habits obj
                habits = Object.keys(activeHabitTemp).reduce((habits, key) => {
                    if (activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]) {
                        const habit = {}
                        habit.name = activeHabitTemp[key].name
                        habit.dailyOccurrence = activeHabitTemp[key].dailyOccurrence
                        habit.progress = 0

                        habits[key] = habit
                        return habits
                    }
                    return habits
                }, {})
            } else {
                //Update old habits obj
                const oldHabitsData = JSON.parse(JSONhabits)

                habits = Object.keys(activeHabitTemp).reduce((habits, key) => {

                    let habit = oldHabitsData[key]

                    if (habit && activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]) {
                        habit.name = activeHabitTemp[key].name
                        habit.dailyOccurrence = activeHabitTemp[key].dailyOccurrence

                        habits[key] = habit
                        return habits
                    } else if (activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]) {
                        habit = {}
                        habit.name = activeHabitTemp[key].name
                        habit.dailyOccurrence = activeHabitTemp[key].dailyOccurrence
                        habit.progress = 0

                        habits[key] = habit
                        return habits
                    }

                    return habits
                }, {})
            }
        }

        this.state = {
            dayOfTheWeek: dayOfTheWeek,
            dateKeyString: dateKeyString,
            dateFormattedString: dateFormattedString,
            habits: habits,
        }
        console.log('CREATED Habit state: ', this.state)

        this.saveHabitLocalStorage()
    }

    saveHabitLocalStorage() {
        const habitsJson = JSON.stringify(this.state.habits)
        localStorage.setItem('habits_' + this.state.dateKeyString, habitsJson)

        console.log('SAVED Habits', habitsJson);
    }

    incrementProgress(id) {
        console.log(`---\nCLICKED habits['${id}']`);

        let habits = { ...this.state.habits }
        let habit = habits[id]

        habit.progress = habit.progress + 1

        console.log('UPDATED incremented:', habits[id])
        this.setState({
            habits: habits
        }, this.saveHabitLocalStorage.bind(this))
    }

    decrementProgress(id) {
        console.log(`---\nCLICKED habits['${id}']`);

        let habits = { ...this.state.habits }
        let habit = habits[id]

        habit.progress = habit.progress - 1

        console.log('UPDATED decremented:', habits[id])
        this.setState({
            habits: habits
        }, this.saveHabitLocalStorage.bind(this))
    }

    render() {
        const habits = this.state.habits
        const habitsEleMap = Object.keys(habits).map((key, i) => {
            return (
                <li className="pt1 pb1" key={key}>
                    <ProgressBar {...habits[key]} 
                                 onClick={event => this.incrementProgress(key)}
                                 onClickDecrement={event => this.decrementProgress(key) }/>
                </li>
            )
        })

        return (
            <main className="grid-wrapper">
                <div></div>{/* Used for sides in grid. Needed to work properly. */}
                <div className="pb5">
                    <h2>Schedule:</h2>
                    <span className="pl1">
                        <b>Today:</b> {this.state.dayOfTheWeek} ({this.state.dateFormattedString})
                    </span>
                    <p className="pl1">
                        Let's see what habits you have for today!
                    </p>
                    <ul>
                        {habitsEleMap}
                    </ul>
                </div>
                <div></div>{/* Used for sides in grid. Needed to work properly. */}
            </main>
        )
    }
}

export default Habits