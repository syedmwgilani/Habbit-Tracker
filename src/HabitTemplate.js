import { Component } from "react"
import WeekInput from "./WeekInput";
const { setNestedVal, generateUIDKey, dot } = require('./helperModule.js');

class HabitTemplate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: dot('', props, 'name'),
            // numberOfDays: dot(0, props, 'numberOfDays'),
            weeklyOccurrence: {
                Monday: dot(false, props, 'weeklyOccurrence', 'Monday'),
                Tuesday: dot(false, props, 'weeklyOccurrence', 'Tuesday'),
                Wednesday: dot(false, props, 'weeklyOccurrence', 'Wednesday'),
                Thursday: dot(false, props, 'weeklyOccurrence', 'Thursday'),
                Friday: dot(false, props, 'weeklyOccurrence', 'Friday'),
                Saturday: dot(false, props, 'weeklyOccurrence', 'Saturday'),
                Sunday: dot(false, props, 'weeklyOccurrence', 'Sunday')
            },
            dailyOccurrence: dot(0, props, 'dailyOccurrence'),
            //reminder: dot(false, props, 'reminder'),
            //reminderTimes: dot('', props, 'reminderTimes'),
            //TODO Allow for multiple reminder times
            //May allow this to be an array
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const copyState = { ...this.state }
        const propArr = name.split('.')
        setNestedVal(copyState, propArr, value)
        this.setState(copyState)

        // this.setState({ [name]: value });
    }

    //TODO send to helper modules
    saveStateToLocalStorage() {
        let JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
        if (!JSONactiveHabitTemp) {
            JSONactiveHabitTemp = JSON.stringify({});
            localStorage.setItem('activeHabitTemplates', JSONactiveHabitTemp)
        }

        let activeHabitTemp = JSON.parse(JSONactiveHabitTemp)
        const uid = generateUIDKey(activeHabitTemp)
        activeHabitTemp[uid] = (this.state)
        localStorage.setItem('activeHabitTemplates', JSON.stringify(activeHabitTemp))

        //TODO On save this should go back to the Habits Page
        // maybe  make it a call back function???
    }

    render() {

        return (
            <main className="grid-wrapper">
                <div></div>{/* Used for sides in grid. Needed to work properly. */}
                <div>
                    <h2>Add a Habit:</h2>
                    <div className="pl1 pr1">
                        <label htmlFor="habitNameId">
                            <b>Name:</b>
                            <input type="text"
                                id="habitNameId"
                                name="name"
                                value={this.state.name}
                                onChange={(event) => this.handleInputChange(event)}
                            />
                        </label>
                    </div>
                    {/* <div>
                    <label htmlFor="numberOfDaysId">
                        <span>Number of Days:</span>
                        <input type="number"
                            id="numberOfDaysId"
                            name="numberOfDays"
                            value={this.state.numberOfDays}
                            onChange={ (event) => this.handleInputChange(event) }
                        />
                    </label>
                </div> */}
                    <div className="mt1 pl1 pr1">
                        <WeekInput {...this.state.weeklyOccurrence} onChange={(event) => this.handleInputChange(event)} />
                    </div>
                    <div className="mt1 pl1 pr1">
                        <label htmlFor="dailyOccurrenceId">
                            <b>Daily Occurrence:</b>
                            <input type="number"
                                id="dailyOccurrenceId"
                                name="dailyOccurrence"
                                value={this.state.dailyOccurrence}
                                onChange={(event) => this.handleInputChange(event)}
                            />
                        </label>
                    </div>
                    {/* <div>
                    <label htmlFor="reminderId">
                        <span>Reminder:</span>
                        <input type="checkbox"
                            id="reminderId"
                            name="reminder"
                            checked={this.state.reminder}
                            onChange={ (event) => this.handleInputChange(event) }
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="reminderTimesId">
                        <span>Reminder Time:</span>
                        <input type="text"
                            id="reminderTimesId"
                            name="reminderTimes"
                            value={this.state.reminderTimes}
                            onChange={ (event) => this.handleInputChange(event) }
                        />
                    </label>
                </div> */}
                    <div className="save-button-container">
                        <button className="save-button" onClick={event => this.saveStateToLocalStorage()}>Save</button>
                    </div>
                </div>
                <div></div>{/* Used for sides in grid. Needed to work properly. */}
            </main>
        )
    }
}

export default HabitTemplate;