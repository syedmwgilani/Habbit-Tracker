import React, { Component } from 'react'
const { addPrefix } = require('./helperModule.js');


function InnerBar(props) {
    const progPercent = (props.size <= 100 ? props.size : 100) + '%'

    const innerBar = {
        width: progPercent,
    }

    return (
        <div className="bg-blue white" style={innerBar}> {props.size}% </div>
    )
}

function ProgressBar(props) {
    return (
        <div>
            <div className="bg-light-gray">
                <InnerBar size={props.progress} />
            </div>
            <br />
            <button onClick={props.onClick}> Click Me </button>
        </div >
    )
}

function Habit(props) {
    return (
        <div>
            <p>{props.name}</p>
            <ProgressBar progress={props.progress}
                onClick={props.onClick} />
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
        const dateString = today.getFullYear() + '_'
            + addPrefix(() => monthStr.length > 1, monthStr, '0')
            + '_'
            + addPrefix(() => dayStr.length > 1, dayStr, '0')

        const JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
        const activeHabitTemp = JSON.parse(JSONactiveHabitTemp)
        console.log('LOADED activeHabitTemp: ', activeHabitTemp)

        let habits = []
        if (activeHabitTemp) {
            const JSONhabits = localStorage.getItem('habits_' + dateString)
            //TODO do a more thorough search of the data in JSONhabits. 
            //When generating older dates to add progress this will get tricky
            if (JSONhabits === null) {
                habits = Object.keys(activeHabitTemp).reduce((habits, key) => {
                    if (activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]) {
                        const habit = {}
                        habit.templateId = key
                        habit.name = activeHabitTemp[key].name
                        habit.dailyOccurrence = activeHabitTemp[key].dailyOccurrence
                        habit.progress = 0

                        habits.push(habit)
                        return habits
                    }
                    return habits
                }, [])
            } else {
                const oldHabitsData = JSON.parse(JSONhabits)

                habits = Object.keys(activeHabitTemp).reduce((acc, key) => {

                    let habit = oldHabitsData.find(habit => habit.templateId === key)

                    if(habit && activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]) {
                        habit.name = activeHabitTemp[key].name
                        habit.dailyOccurrence = activeHabitTemp[key].dailyOccurrence

                        acc.push(habit)
                        return acc
                    } else if(activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]){
                        habit = {}
                        habit.templateId = key
                        habit.name = activeHabitTemp[key].name
                        habit.dailyOccurrence = activeHabitTemp[key].dailyOccurrence
                        habit.progress = 0

                        acc.push(habit)
                        return acc
                    }

                    return acc
                }, [])
            }
        }

        this.state = {
            dayOfTheWeek: dayOfTheWeek,
            dateString: dateString,
            habits: habits,
        }
        console.log('CREATED Habit state: ', this.state)

        this.saveHabitLocalStorage()
    }

    saveHabitLocalStorage() {
        console.log('SAVING...', this.state);

        const habitsJson = JSON.stringify(this.state.habits)
        localStorage.setItem('habits_' + this.state.dateString, habitsJson)
        console.log('SAVED Habits', habitsJson);
    }

    incrementProgress(id, i) {
        console.log(`---\nCLICKED habits[${i}]`);

        let habits = [...this.state.habits]
        let habit = habits[i]

        const increment = 100 / habit.dailyOccurrence
        habit.progress = habit.progress + increment

        console.log(habits[i])
        this.setState({
            habits: habits
        }, this.saveHabitLocalStorage.bind(this))
    }

    render(props) {

        const habitsEleMap = this.state.habits.map((habit, i) => {
            return (
                <li key={habit.templateId}>
                    <Habit {...habit} onClick={event => this.incrementProgress(habit.id, i)} />
                </li>
            )
        })

        return (
            <main className="wrapper">
                <div className="margin1"></div>
                <div className="content">
                    <p>
                        {/* TODO add a Refresh to set the days */}
                        {this.state.dayOfTheWeek}
                    </p>
                    {/* TODO if activeHabitTemp is null, then add button to the page to "Create a Habit". 
                    Also add message no "Habits Today." */}
                    <ul>
                        {habitsEleMap}
                    </ul>
                </div>
                <div className="margin2"></div>
            </main>
        )
    }
}

export default Habits