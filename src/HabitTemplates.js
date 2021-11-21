import React, { Component } from 'react'

function Day(props) {
    return <div className="inline-block mr1" key={props.keyVal}>
        {props.day}
    </div>
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
        let habitTemps = { ...this.state[habitTempString] }

        console.log('handleRemove for ' + habitTempString, ' ID: ' + id)
        console.log('BEFORE DELETE state ', this.state[habitTempString])
        delete habitTemps[id]

        if (habitTempString === 'activeHabitTemp') {
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
                <li className="mb1" key={key}>
                    <div className="mb1">
                        <b>{activeHabitTemp[key].name}: </b>
                        <span>{activeHabitTemp[key].dailyOccurrence}x</span>
                    </div>
                    <div className="pl1">
                        <div className="mb1">
                            {
                                daysOfTheWeeks.reduce((acc, day, i) => {
                                    if (activeHabitTemp[key].weeklyOccurrence[day])
                                        acc.push(<Day key={i} day={day} />)

                                    return acc
                                }, [])
                            }
                        </div>
                        <div className="remove-button-container">
                            <button className="remove-button" type="button" onClick={() => this.handleRemove(key, 'activeHabitTemp')}>
                                Remove
                            </button>
                        </div>
                    </div>
                </li>
        )

        // let inactiveHabits = props.habits.filter(habit => !habit.active)
        // let inactiveHabitNames = inactiveHabits.map(habit => <li>{habit.name}</li>)

        return (
            <div className="grid-wrapper">
                <div></div>{/* Used for sides in grid. Needed to work properly. */}

                <div className="pb5">
                    <h2>My Habits:</h2>

                    <div className="pl1">
                        <p>
                            View all my Habits.
                        </p>

                        <h4>Active Habits:</h4>
                        <ul>
                            {activeHabitTempList}
                        </ul>
                    </div>


                    {/* <h4>Inactive Habits:</h4>
                <ul>
                    {inactiveHabitNames}
                </ul> */}

                    {/* TODO Add a clickable button to edit page in the HabitTemplate.js page
                you will have to make sure that when editing the entry and saving it is not creating
                a new entry

                TODO Also add a way to delete an entry on the page. Or move it to the inactiveHabits list */}
                </div>

                <div></div>{/* Used for sides in grid. Needed to work properly. */}
            </div>
        )
    }

}

export default HabitTemplates;