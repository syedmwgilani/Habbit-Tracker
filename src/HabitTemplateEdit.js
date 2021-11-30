import { Component } from "react"
import { useNavigate } from "react-router";
import WeekInput from "./WeekInput";
import SaveButton from "./SaveButton";
const { setNestedVal, dot } = require('./helperModule.js');

function NavigatationSaveButton(props) {
    const navigate = useNavigate()

    return (
        <SaveButton className="save-button save-button-edit"
                    classNameSaving="save-button save-button-edit save-button-saving"
                    onClick={event => props.onClick()}
                    endOfSaveFunction={event => navigate("/habit-tracker/habit-templates")} />
    );
}

function NavigatationCancelButton(props) {
    const navigate = useNavigate()

    return (
        <button className="cancel-button" onClick={event => navigate("/habit-tracker/habit-templates")}>
            Cancel
        </button>
    );
}

class HabitTemplateEdit extends Component {

    constructor(props) {
        super(props)

        //TODO see if it is possible to do with useParams function
        //https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6
        const habitId = window.location.pathname.slice(-16)
        const habit = JSON.parse(localStorage.getItem('activeHabitTemplates'))[habitId]

        console.log('habit: ', habit)

        this.state = {
            habitId: habitId,
            name: dot('', habit, 'name'),
            dailyOccurrence: dot(1, habit, 'dailyOccurrence'),
            weeklyOccurrence: {
                Monday: dot(false, habit, 'weeklyOccurrence', 'Monday'),
                Tuesday: dot(false, habit, 'weeklyOccurrence', 'Tuesday'),
                Wednesday: dot(false, habit, 'weeklyOccurrence', 'Wednesday'),
                Thursday: dot(false, habit, 'weeklyOccurrence', 'Thursday'),
                Friday: dot(false, habit, 'weeklyOccurrence', 'Friday'),
                Saturday: dot(false, habit, 'weeklyOccurrence', 'Saturday'),
                Sunday: dot(false, habit, 'weeklyOccurrence', 'Sunday')
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
        const JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
        const activeHabitTemp = JSON.parse(JSONactiveHabitTemp)

        //Convert dailyOccurrence from string to int
        //then save to localStorage
        this.setState({
            dailyOccurrence: parseInt(this.state.dailyOccurrence)
        }, () => {
            activeHabitTemp[this.state.habitId] = this.state
            localStorage.setItem('activeHabitTemplates', JSON.stringify(activeHabitTemp))
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
                <NavigatationSaveButton onClick={event => this.saveStateToLocalStorage()} />
            )
        }

        //if the habitId does not exist show message instead of rendering rest of page
        let content = <span>This Habit does not exist. Maybe you might want to go to this page instead</span>

        if (this.state.name !== '') {
            content = (
                <main className="grid-wrapper" >
                    <div></div>{/* Used for sides in grid. Needed to work properly. */}

                    <div className="pb5" >
                        <h2>Edit Habit:</h2>

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
                            <NavigatationCancelButton />
                            {showSaveButton}
                        </div>
                    </div>

                    <div></div>{/* Used for sides in grid. Needed to work properly. */}
                </main >
            )
        }

        return content
    }
}

export default HabitTemplateEdit;