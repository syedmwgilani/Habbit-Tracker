import React, { Component } from 'react'
import './Habits.css'

const { addPrefix } = require('./helperModule.js')

function InnerBar(props) {
    const progPercent = (props.size <= 100 ? props.size : 100) + '%'

    const innerBar = {
        width: progPercent,
    }

    return (
        <div className="inner-bar" style={innerBar}>
            <span className="inner-bar-text">{props.name} {props.size}%</span>
        </div>
    )
}

function ProgressBar(props) {
    return (
        <div className="progress-bar" onClick={props.onClick}>
            <InnerBar size={props.progress} name={props.name}/>
        </div>
    )
}

function Habit(props) {
    return (
        <div>
            <ProgressBar progress={props.progress}
                onClick={props.onClick} name={props.name}/>
            <p>Daily Occurence: {props.dailyOccurrence}</p>
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

        const increment = 100 / habit.dailyOccurrence
        habit.progress = habit.progress + increment

        console.log('UPDATED ', habits[id])
        this.setState({
            habits: habits
        }, this.saveHabitLocalStorage.bind(this))
    }

    render() {
        const habits = this.state.habits
        const habitsEleMap = Object.keys(habits).map((key, i) => {
            return (
                <li key={key}>
                    <Habit {...habits[key]} onClick={event => this.incrementProgress(key)} />
                </li>
            )
        })

        return (
            <main className="grid-wrapper">
                <div className=""></div>
                <div className="">
                    <p>
                        <b>Todays ({this.state.dateFormattedString}) Habits:</b> {this.state.dayOfTheWeek}
                    </p>
                    <ul>
                        {habitsEleMap}
                    </ul>
                </div>
                <div className=""></div>
            </main>
        )
    }
}

export default Habits