import { Component } from "react";
import SaveButton from "./SaveButton";
import WeekInput from "./WeekInput";
import FormErrors from "./FormErrors";
const { setNestedVal, generateUIDKey, addPrefix, isDate } = require('./helperModule.js');

class HabitTemplate extends Component {

    constructor(props) {
        super(props)

        const today = new Date()
        const monthStr = (today.getMonth() + 1).toString()
        const dateStr = today.getDate().toString()

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
            startDate: addPrefix(() => monthStr.length > 1, monthStr, '0')
                + '/' + addPrefix(() => dateStr.length > 1, dateStr, '0')
                + '/' + new Date().getFullYear().toString(),
            valid_startDate: true,
            endDate: '',
            valid_endDate: false,
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

        const today = new Date()
        const monthStr = (today.getMonth() + 1).toString()
        const dateStr = today.getDate().toString()

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
            startDate: addPrefix(() => monthStr.length > 1, monthStr, '0')
                + '/' + addPrefix(() => dateStr.length > 1, dateStr, '0')
                + '/' + new Date().getFullYear().toString(),
            valid_startDate: true,
            endDate: '',
            valid_endDate: false,
        })
    }

    render() {

        let showMessageOrSaveButton = (
            <div className="validation-text-container">
                <div className="validation-text">Please Fill in All Required (*) Fields.</div>
            </div>
        )

        const weekdayChecked = Object.values(this.state.weeklyOccurrence).includes(true)
        if (this.state.name !== '' 
            && weekdayChecked 
            && this.state.dailyOccurrence !== ''
            && this.state.dailyOccurrence >= 1
            && this.state.startDate !== ''
            && this.state.valid_startDate 
            && (this.state.valid_endDate 
                || this.state.endDate === '')
            ) {

            showMessageOrSaveButton = (
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
                        {showMessageOrSaveButton}
                    </div>
                </div>

                <div></div>{/* Used for sides in grid. Needed to work properly. */}
            </main >
        )
    }
}

export default HabitTemplate;