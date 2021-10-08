import React, { Component } from 'react'

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

class Habit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: props.progress,
        }
    }

    incrementProgress() {
        const increment = 100 / this.props.dailyOccurrence
        const progress = this.state.progress + increment

        this.saveStateToLocalStorage()

        this.setState({
            progress: progress
        })
    }

    saveStateToLocalStorage() {
        // let JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')

        // Fail on no data
        //if(!JSONactiveHabitTemp) { return; }
    }

    render() {
        const { progress } = this.state
        const { name, dailyOccurrence } = this.props
        return (
            <div>
                <p>{name}</p>
                <ProgressBar progress={progress}
                    onClick={event => this.incrementProgress(event)} />
                <p>Daily Occurence: {dailyOccurrence}</p>
            </div>
        )
    }
}

class Habits extends Component {
    constructor(props) {
        super(props)

        const JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
        const activeHabitTemp = JSON.parse(JSONactiveHabitTemp)
        console.log('loaded activeHabitTemp: ', activeHabitTemp)

        //Get todays Date()
        const today = new Date()
        //TODO set to upper case
        const daysOfTheWeeks = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        const dayOfTheWeek = daysOfTheWeeks[today.getDay()]

        //create a daily habits out of habit templates
        const habits = Object.keys(activeHabitTemp).reduce( (habits, key) => {
            if(activeHabitTemp[key].weeklyOccurrence[dayOfTheWeek]) {
                const habit = {}
                habit.name = activeHabitTemp[key].name
                habit.dailyOccurrence = activeHabitTemp[key].dailyOccurrence
                habit.progress = 0
                habits.push(habit)

                return habits
            }
            return habits;
        }, [])

        this.state = {
            habits: habits,
            dayOfTheWeek: dayOfTheWeek,
        }
    }
    
    render(props) {

        // TODO parse habit and pass it through props ???
        const habitEleMap = this.state.habits.map((habit, i) => {
            return (
                <li key={i}>
                    <Habit {...habit} />
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
                    <ul>
                        {habitEleMap}
                    </ul>
                </div>
                <div className="margin2"></div>
            </main>
        )
    }
}

export default Habits