import { Component } from "react"
import WeekInput from "./WeekInput";
const { setNestedVal, generateUIDKey, dot } = require('./helperModule.js');

class HabitTemplate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: dot('', props, 'name'),
            dailyOccurrence: dot(1, props, 'dailyOccurrence'),
            weeklyOccurrence: {
                Monday: dot(false, props, 'weeklyOccurrence', 'Monday'),
                Tuesday: dot(false, props, 'weeklyOccurrence', 'Tuesday'),
                Wednesday: dot(false, props, 'weeklyOccurrence', 'Wednesday'),
                Thursday: dot(false, props, 'weeklyOccurrence', 'Thursday'),
                Friday: dot(false, props, 'weeklyOccurrence', 'Friday'),
                Saturday: dot(false, props, 'weeklyOccurrence', 'Saturday'),
                Sunday: dot(false, props, 'weeklyOccurrence', 'Sunday')
            },
            savingMessage: '',
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
    }

    saveStateToLocalStorage() {
        this.setSaveMessages()

        let JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
        if (!JSONactiveHabitTemp) {
            JSONactiveHabitTemp = JSON.stringify({});
            localStorage.setItem('activeHabitTemplates', JSONactiveHabitTemp)
        }

        let activeHabitTemp = JSON.parse(JSONactiveHabitTemp)
        const uid = generateUIDKey(activeHabitTemp)
        activeHabitTemp[uid] = (this.state)
        localStorage.setItem('activeHabitTemplates', JSON.stringify(activeHabitTemp))
    }

    setSaveMessages() {

        this.setState({
            savingMessage: 'Saving...'
        }, () => {
            setTimeout(
                () => {
                    this.setState({
                        savingMessage: 'Saved!'
                    }, () => {
                        setTimeout(() => {
                            console.log('Set Empty State', this.state);

                            this.setEmptyState()
                        }, 1500);
                    })
                }, 1500
            )
        })
    }

    setEmptyState() {
        this.setState({
            name: '',
            dailyOccurrence: 1,
            weeklyOccurrence: {
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false,
                Sunday: false
            },
            savingMessage: ''
        })
    }

    render() {

        return (
            <main className="grid-wrapper" >
                <div></div>{/* Used for sides in grid. Needed to work properly. */}

                <div className="pb5" >
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

                    <div className="save-button-container">
                        <button className="save-button" onClick={event => this.saveStateToLocalStorage()}>Save</button>
                        <span className="save-message">{this.state.savingMessage}</span>
                    </div>
                </div>

                <div></div>{/* Used for sides in grid. Needed to work properly. */}
            </main >
        )
    }
}

export default HabitTemplate;