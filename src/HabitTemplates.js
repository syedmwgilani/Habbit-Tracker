import React, { Component } from 'react'

function Days(props) {
    return <div key={props.keyVal}>{props.day}: {props.vals}</div>
}

class HabitTemplates extends Component {
    constructor(props) {
        super(props);

        let JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
        let activeHabitTemp = JSON.parse(JSONactiveHabitTemp)

        // TODO if user navigates to this page without 
        // any activeHabitTemplates inactiveHabitTemplates being made then
        // suggest user goto HabitTemplate page.

        // TODO add inactiveHabitTemp
        // let JSONinactiveHabitTemp = localStorage.getItem('inactiveHabitTemplates')
        // let inactiveHabitTemp = JSON.parse(JSONinactiveHabitTemp)

        this.state = {
            activeHabitTemp: activeHabitTemp,
            // inactiveHabitTemp: inactiveHabitTemp  
        }
        console.log('CREATED HabitTemplates state: ', this.state);
    }

    saveToLocalStorage(habitTempString) {
        console.log('saveToLocalStorage ' + habitTempString);
        let JSONHabitTemp = JSON.stringify(this.state[habitTempString])
        localStorage.setItem('activeHabitTemplates', JSONHabitTemp)
    }

    handleRemove(id, habitTempString) {        
        let habitTemps = {...this.state[habitTempString]}

        console.log('handleRemove for ' + habitTempString, ' ID: ' + id)
        console.log('BEFORE DELETE state ', this.state[habitTempString])
        delete habitTemps[id]

        if(habitTempString === 'activeHabitTemp') {
            this.setState({
                activeHabitTemp: habitTemps
            }, this.saveToLocalStorage.bind(this, 'activeHabitTemp'))
        }
        // if(habitTempString === 'inactiveHabitTemp') {
        //     this.setState({
        //         inactiveHabitTemp: habitTemps
        //     }, this.saveToLocalStorage.bind(this))
        // }
    }

    render() {
        const activeHabitTemp = this.state.activeHabitTemp
        // const inactiveHabitTemp = this.state.inactiveHabitTemp
        const daysOfTheWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        let activeHabitTempList = Object.keys(activeHabitTemp).map(
            (key) =>
                <li key={key}>
                    <div>{activeHabitTemp[key].name}</div>
                    <div>Daily Occurence: {activeHabitTemp[key].dailyOccurrence}</div>
                    <ul>
                        {
                            daysOfTheWeeks.map((day, i) =>
                                <li key={i}>
                                    <Days
                                        day={day}
                                        vals={activeHabitTemp[key].weeklyOccurrence[day] + ''} />
                                </li>
                            )
                        }
                    </ul>
                    <button type="button" onClick={() => this.handleRemove(key, 'activeHabitTemp')}>
                        Remove
                    </button>
                </li>
        )

        // let inactiveHabits = props.habits.filter(habit => !habit.active)
        // let inactiveHabitNames = inactiveHabits.map(habit => <li>{habit.name}</li>)

        return (
            <div className="grid-wrapper">
                <div className="margin1"></div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h3>Habits Page</h3>
                    <h4>Active Habits:</h4>
                    <ul>
                        {activeHabitTempList}
                    </ul>

                    {/* <h4>Inactive Habits:</h4>
                <ul>
                    {inactiveHabitNames}
                </ul> */}

                    {/* TODO Add a clickable button to edit page in the HabitTemplate.js page
                you will have to make sure that when editing the entry and saving it is not creating
                a new entry

                TODO Also add a way to delete an entry on the page. Or move it to the inactiveHabits list */}
                </div>
                <div className="margin2"></div>
            </div>
        )
    }

}

export default HabitTemplates;