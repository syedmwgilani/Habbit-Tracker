import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const { addPrefix } = require('./helperModule.js')


function ProgressBar(props) {
    const progPercent = Math.round(props.progress / props.dailyOccurrence * 100)
    const barSize = progPercent < 100 ? progPercent : 100

    const innerBar = {
        width: barSize + '%',
    }

    return (
        <div className="progress-bar" onClick={props.onClick}>
            <div className="inner-bar" style={innerBar}>
                <span className="inner-bar-text-left">+</span>
                <span className="inner-bar-text-center habit-name-large-screen">{props.name}</span>
                <span className="inner-bar-text-right">{props.progress} / {props.dailyOccurrence}</span>
            </div>
        </div>
    )
}

function DailyHabit(props) {
    return (
        <li className="pt1 pb1">
            <div className="habit-name-small-screen mb05">
                <b>{props.name}</b>
            </div>
            <div className="star-container">
                <div className="star-inner-content">
                    {props.progress >= props.dailyOccurrence
                    && <span className="icon-star-full"></span>}
                </div>
            </div>
            <ProgressBar
                name={props.name}
                dailyOccurrence={props.dailyOccurrence}
                progress={props.progress}
                onClick={props.onClick} />
            <div className="decrement-button ml1" onClick={props.onClickDecrement}>
                <div className="decrement-inner-button">
                    <span className="decrement-inner-button-content">-</span>
                </div>
            </div>
        </li>
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

        const dateShortenedFormatString = addPrefix(() => monthStr.length > 1, monthStr, '0')
            + '/'
            + addPrefix(() => dayStr.length > 1, dayStr, '0')
            + '/'
            + today.getFullYear().toString().substring(2)

        const date = new Date(dateShortenedFormatString)
        // TODO use this date instead of today
        // date.getTime() has been zeroed out
        // TODO store date in state to used in nextDay and previousDay
        //  functions.

        const JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
        const activeHabitTemp = JSON.parse(JSONactiveHabitTemp)
        console.log('LOADED activeHabitTemp: ', activeHabitTemp)

        let habits = {}
        if (activeHabitTemp) {
            const JSONhabits = localStorage.getItem('habits_' + dateKeyString)
            console.log('xxxhabits_' + dateKeyString, JSONhabits);

            if (JSONhabits === null) {
                //Create new habits
                habits = Object.keys(activeHabitTemp).reduce((habits, key) => {
                    const startDateTime = new Date(activeHabitTemp[key].startDate).getTime()
                    const endDateTime = new Date(activeHabitTemp[key].endDate).getTime()
                    if (activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]
                        && date.getTime() >= startDateTime
                        && (isNaN(endDateTime) || date.getTime() <= endDateTime)
                    ) {
                        const habit = {}
                        habit.progress = 0

                        habits[key] = habit
                        return habits
                    }
                    return habits
                }, {})
            } else {
                //Update old habits to include new/updated habits or old habits
                const oldHabitsData = JSON.parse(JSONhabits)
                console.log('yyy', oldHabitsData);

                habits = Object.keys(activeHabitTemp).reduce((habits, key) => {
                    const startDateTime = new Date(activeHabitTemp[key].startDate).getTime()
                    const endDateTime = new Date(activeHabitTemp[key].endDate).getTime()
                    console.log('zzz', startDateTime)
                    console.log('   ', endDateTime)
                    if (!oldHabitsData[key]
                        && activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]
                        && date.getTime() >= startDateTime
                        && (isNaN(endDateTime) || date.getTime() <= endDateTime)) {
                        let habit = {}
                        habit.progress = 0
                        habits[key] = habit

                        return habits
                    } else if (activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]
                        && date.getTime() >= startDateTime
                        && (isNaN(endDateTime) || date.getTime() <= endDateTime)) {
                        habits[key] = oldHabitsData[key]
                    }

                    return habits
                }, {})
            }
        }

        this.state = {
            dayOfTheWeek: dayOfTheWeek,
            dateKeyString: dateKeyString,
            dateShortenedFormatString: dateShortenedFormatString,
            activeHabitTemp: activeHabitTemp,
            habits: habits,
        }
        console.log('CREATED Habit state: ', this.state)

        // this.saveHabitLocalStorage()
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

    previousDay() {
        const date = new Date(this.state.dateShortenedFormatString)
        const previousDate = new Date(date.getTime() - 86400000)
        console.log(date)
        console.log(previousDate)

        const daysOfTheWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const dayOfTheWeek = daysOfTheWeeks[previousDate.getDay()]

        const monthStr = (previousDate.getMonth() + 1).toString()
        const dayStr = previousDate.getDate().toString()
        const dateKeyString = previousDate.getFullYear() + '_'
            + addPrefix(() => monthStr.length > 1, monthStr, '0')
            + '_'
            + addPrefix(() => dayStr.length > 1, dayStr, '0')

        const dateShortenedFormatString = addPrefix(() => monthStr.length > 1, monthStr, '0')
            + '/'
            + addPrefix(() => dayStr.length > 1, dayStr, '0')
            + '/'
            + previousDate.getFullYear().toString().substring(2)


        const activeHabitTemp = this.state.activeHabitTemp

        let habits = {}
        if (activeHabitTemp) {
            const JSONhabits = localStorage.getItem('habits_' + dateKeyString)
            console.log('xxxhabits_' + dateKeyString, JSONhabits);

            if (JSONhabits === null) {
                //Create new habits
                habits = Object.keys(activeHabitTemp).reduce((habits, key) => {
                    const startDateTime = new Date(activeHabitTemp[key].startDate).getTime()
                    const endDateTime = new Date(activeHabitTemp[key].endDate).getTime()
                    if (activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]
                        && previousDate.getTime() >= startDateTime
                        && (isNaN(endDateTime) || previousDate.getTime() <= endDateTime)
                    ) {
                        const habit = {}
                        habit.progress = 0

                        habits[key] = habit
                        return habits
                    }
                    return habits
                }, {})
            } else {
                //Update old habits to include new/updated habits or old habits
                const oldHabitsData = JSON.parse(JSONhabits)
                console.log('yyy', oldHabitsData);

                habits = Object.keys(activeHabitTemp).reduce((habits, key) => {
                    const startDateTime = new Date(activeHabitTemp[key].startDate).getTime()
                    const endDateTime = new Date(activeHabitTemp[key].endDate).getTime()
                    console.log('zzz', startDateTime)
                    console.log('   ', endDateTime)
                    if (!oldHabitsData[key]
                        && activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]
                        && previousDate.getTime() >= startDateTime
                        && (isNaN(endDateTime) || previousDate.getTime() <= endDateTime)) {
                        let habit = {}
                        habit.progress = 0
                        habits[key] = habit

                        return habits
                    } else if (activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]
                        && previousDate.getTime() >= startDateTime
                        && (isNaN(endDateTime) || previousDate.getTime() <= endDateTime)) {
                        habits[key] = oldHabitsData[key]
                    }

                    return habits
                }, {})
            }
        }

        this.setState(
            {
                dayOfTheWeek: dayOfTheWeek,
                dateKeyString: dateKeyString,
                dateShortenedFormatString: dateShortenedFormatString,
                habits: habits,
            }
        )
    }

    nextDay() {
        const date = new Date(this.state.dateShortenedFormatString)
        const nextDate = new Date(date.getTime() + 86400000)
        console.log(date)
        console.log(nextDate)

        const daysOfTheWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const dayOfTheWeek = daysOfTheWeeks[nextDate.getDay()]

        const monthStr = (nextDate.getMonth() + 1).toString()
        const dayStr = nextDate.getDate().toString()
        const dateKeyString = nextDate.getFullYear() + '_'
            + addPrefix(() => monthStr.length > 1, monthStr, '0')
            + '_'
            + addPrefix(() => dayStr.length > 1, dayStr, '0')

        const dateShortenedFormatString = addPrefix(() => monthStr.length > 1, monthStr, '0')
            + '/'
            + addPrefix(() => dayStr.length > 1, dayStr, '0')
            + '/'
            + nextDate.getFullYear().toString().substring(2)


        const activeHabitTemp = this.state.activeHabitTemp

        let habits = {}
        if (activeHabitTemp) {
            const JSONhabits = localStorage.getItem('habits_' + dateKeyString)
            console.log('xxxhabits_' + dateKeyString, JSONhabits);

            if (JSONhabits === null) {
                //Create new habits
                habits = Object.keys(activeHabitTemp).reduce((habits, key) => {
                    const startDateTime = new Date(activeHabitTemp[key].startDate).getTime()
                    const endDateTime = new Date(activeHabitTemp[key].endDate).getTime()
                    if (activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]
                        && nextDate.getTime() >= startDateTime
                        && (isNaN(endDateTime) || nextDate.getTime() <= endDateTime)
                    ) {
                        const habit = {}
                        habit.progress = 0

                        habits[key] = habit
                        return habits
                    }
                    return habits
                }, {})
            } else {
                //Update old habits to include new/updated habits or old habits
                const oldHabitsData = JSON.parse(JSONhabits)
                console.log('yyy', oldHabitsData);

                habits = Object.keys(activeHabitTemp).reduce((habits, key) => {
                    const startDateTime = new Date(activeHabitTemp[key].startDate).getTime()
                    const endDateTime = new Date(activeHabitTemp[key].endDate).getTime()
                    console.log('zzz', startDateTime)
                    console.log('   ', endDateTime)
                    if (!oldHabitsData[key]
                        && activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]
                        && nextDate.getTime() >= startDateTime
                        && (isNaN(endDateTime) || nextDate.getTime() <= endDateTime)) {
                        let habit = {}
                        habit.progress = 0
                        habits[key] = habit

                        return habits
                    } else if (activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]
                        && nextDate.getTime() >= startDateTime
                        && (isNaN(endDateTime) || nextDate.getTime() <= endDateTime)) {
                        habits[key] = oldHabitsData[key]
                    }

                    return habits
                }, {})
            }
        }

        this.setState(
            {
                dayOfTheWeek: dayOfTheWeek,
                dateKeyString: dateKeyString,
                dateShortenedFormatString: dateShortenedFormatString,
                habits: habits,
            }
        )
    }

    render() {
        const activeHabitTemp = this.state.activeHabitTemp
        const habits = this.state.habits

        const habitsEleMap = Object.keys(habits).map((key) => {
            return (
                <DailyHabit
                    key={key}
                    name={activeHabitTemp[key].name}
                    dailyOccurrence={activeHabitTemp[key].dailyOccurrence}
                    progress={habits[key].progress}
                    onClick={event => this.incrementProgress(key)}
                    onClickDecrement={event => this.decrementProgress(key)} />
            )
        })

        const showToday = new Date(this.state.dateShortenedFormatString).toDateString() === new Date().toDateString()
            ?
            'Today'
            : this.state.dateShortenedFormatString

        return (
            <main className="grid-wrapper">
                <div></div>{/* Used for sides in grid. Needed to work properly. */}

                <div className="pb5">

                    <div className="day-changer mt05">
                        <button className="day-changer-button" onClick={event => this.previousDay()}>&larr;</button>
                        <div className="day-changer-text"> {this.state.dayOfTheWeek} {showToday}</div>
                        <button className="day-changer-button" onClick={event => this.nextDay()}>&rarr;</button>
                    </div>

                    {
                        habitsEleMap.length === 0
                        &&
                        (<p className="pt1 text-align-center">
                            You have no habits scheduled. You might want to create a <Link to="/habit-tracker/habit-template">Habit.</Link>
                        </p>)
                    }
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