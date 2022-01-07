import { Component } from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import WeekInput from "./WeekInput";
import FormErrors from "./FormErrors";
import SaveButton from "./SaveButton";
const { setNestedVal, addPrefix, isDate, dot } = require('./helperModule.js');

function NavigatationSaveButton(props) {
    const navigate = useNavigate()

    return (
        <SaveButton className="save-button save-button-edit"
                    disableButton={props.disableButton}
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

        //TODO see if it is possible to do this with the useParams function
        //https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6
        const habitId = window.location.pathname.slice(-16)
        const habit = JSON.parse(localStorage.getItem('activeHabitTemplates'))[habitId]

        console.log('habit: ', habit)

        const today = new Date()
        const monthStr = (today.getMonth() + 1).toString()
        const dateStr = today.getDate().toString()

        this.state = {
            habitId: habitId,
            habitExists: habit ? true : false,
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
            startDate: dot(
                addPrefix(() => monthStr.length > 1, monthStr, '0')
                + '/' + addPrefix(() => dateStr.length > 1, dateStr, '0')
                + '/' + new Date().getFullYear().toString()
                , habit, 'startDate'),
            valid_startDate: dot(true, habit, 'valid_startDate'),
            endDate: dot('', habit, 'endDate'),
            valid_endDate: dot(false, habit, 'valid_endDate'),
        }
    }

    handleInputChange(event) {
        const target = event.target
        let value = target.type === 'checkbox' ? target.checked : target.value

        const name = target.name

        const copyState = { ...this.state }
        const propArr = name.split('.')
        setNestedVal(copyState, propArr, value)
        this.setState(copyState)
    }

    handleDateChange(event) {
        let value = event.target.value
        const name = event.target.name
        const validFieldName = 'valid_' + name

        this.setState({
            [name]: value,
            [validFieldName]: isDate(value)
        })
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

        const weekdayChecked = Object.values(this.state.weeklyOccurrence).includes(true)

        let disableSaveButton = !(this.state.name !== ''
                                && weekdayChecked
                                && this.state.dailyOccurrence !== ''
                                && this.state.dailyOccurrence >= 1
                                && this.state.startDate !== ''
                                && this.state.valid_startDate
                                && (this.state.valid_endDate
                                    || this.state.endDate === ''))

        //if the habitId does not exist show message instead of rendering rest of page
        let content = (<p>This Habit does not exist. You might want to go to the <Link to="/habit-tracker/habit-templates">All My Habits</Link> page instead</p>)

        if (this.state.habitExists) {
            content = (
                <div className="pb5" >
                    <h2>Edit Habit:</h2>

                    {disableSaveButton &&
                    (<div className="mt1 mb1 pl1 pr1">
                        <div className="validation-text pt1 pb1">Please Fill in All Required (*) Fields.</div>
                    </div>)}

                    <div className="pl1 pr1">
                        <label htmlFor="habitNameId">
                            <b>Name:</b> <span className="require-star">*</span>
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
                            <b>Daily Occurrence:</b> <span className="require-star">*</span>
                            <input type="number"
                                id="dailyOccurrenceId"
                                name="dailyOccurrence"
                                value={this.state.dailyOccurrence}
                                onChange={(event) => this.handleInputChange(event)}
                            />
                        </label>
                    </div>
                    <FormErrors showMessage={this.state.dailyOccurrence < 1} message="Please Enter a Value 1 or Greater!" />

                    <div className="mt1 pl1 pr1">
                        <label htmlFor="startDateId">
                            <b>Start Date:</b> <span className="require-star">*</span>
                            <input type="text"
                                id="startDateId"
                                name="startDate"
                                value={this.state.startDate}
                                onChange={(event) => this.handleDateChange(event)}
                                placeholder="MM/DD/YYYY"
                            />
                        </label>
                    </div>
                    <FormErrors showMessage={!this.state.valid_startDate} message="Please Enter a Valid Date MM/DD/YYYY" />

                    <div className="mt1 pl1 pr1">
                        <label htmlFor="endDateId">
                            <b>End Date: (optional)</b>
                            <input type="text"
                                id="endDateId"
                                name="endDate"
                                value={this.state.endDate}
                                onChange={(event) => this.handleDateChange(event)}
                                placeholder="MM/DD/YYYY"
                            />
                        </label>
                    </div>
                    <FormErrors showMessage={!this.state.valid_endDate && this.state.endDate !== ''} message="Please Enter a Valid Date MM/DD/YYYY or Keep Empty" />
                    <FormErrors showMessage={Date.parse(this.state.startDate) >= Date.parse(this.state.endDate)} message="Please Enter a Date Greater than the Start Date" />

                    <div className="button-container">
                        <NavigatationCancelButton />
                        <NavigatationSaveButton onClick={event => this.saveStateToLocalStorage()}
                                                disableButton={disableSaveButton} />
                    </div>
                </div>
            )
        }

        return (
            <main className="grid-wrapper" >
                <div></div>{/* Used for sides in grid. Needed to work properly. */}
                {content}
                <div></div>{/* Used for sides in grid. Needed to work properly. */}
            </main >
        )
    }
}

export default HabitTemplateEdit;