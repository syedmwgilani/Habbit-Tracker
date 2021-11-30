import { Component } from "react";
import SaveButton from "./SaveButton";
import WeekInput from "./WeekInput";
const { setNestedVal, generateUIDKey } = require('./helperModule.js');

class HabitTemplate extends Component {

    constructor(props) {
        super(props)

        this.state = {
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
        }
    }

    handleInputChange(event) {
        const target = event.target
        let value = target.type === 'checkbox' ? target.checked : target.value

        if (target.name === 'dailyOccurrence') {
            value = value < 1 ? 1 : value
        }

        const name = target.name

        const copyState = { ...this.state }
        const propArr = name.split('.')
        setNestedVal(copyState, propArr, value)
        this.setState(copyState)
    }

    saveStateToLocalStorage() {
        let JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
        if (!JSONactiveHabitTemp) {
            JSONactiveHabitTemp = JSON.stringify({});
            localStorage.setItem('activeHabitTemplates', JSONactiveHabitTemp)
        }

        let activeHabitTemp = JSON.parse(JSONactiveHabitTemp)
        const uid = generateUIDKey(activeHabitTemp)

        //Convert dailyOccurrence from string to int
        //then save to localStorage
        this.setState({
            dailyOccurrence: parseInt(this.state.dailyOccurrence)
        }, () => {
            activeHabitTemp[uid] = this.state
            localStorage.setItem('activeHabitTemplates', JSON.stringify(activeHabitTemp))
        })
    }

    setEmptyState() {
        console.log('BEFORE Set Empty State: ', this.state);
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
        })
    }

    render() {
        let showSaveButton = (
            <div className="validation-text-container">
                <div className="validation-text">Please Enter a Habit <b>Name</b> and select at least <b>One</b> Weekday.</div>
            </div>
        )
        const weekdayChecked = Object.values(this.state.weeklyOccurrence).includes(true)
        if (this.state.name !== '' && weekdayChecked) {
            showSaveButton = (
                <SaveButton className="save-button save-button-add"
                            classNameSaving="save-button save-button-add save-button-saving"
                            onClick={event => this.saveStateToLocalStorage()}
                            endOfSaveFunction={event => this.setEmptyState()} />
            )
        }

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

                    <div className="button-container">
                        {showSaveButton}
                    </div>
                </div>

                <div></div>{/* Used for sides in grid. Needed to work properly. */}
            </main >
        )
    }
}

export default HabitTemplate;