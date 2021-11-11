function Days(props) {
    return <div key={props.keyVal}>{props.day}: {props.vals}</div>
}
function HabitTemplates(props) {

    let JSONactiveHabitTemp = localStorage.getItem('activeHabitTemplates')
    let activeHabitTemp = JSON.parse(JSONactiveHabitTemp)

    const daysOfTheWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let activeHabitTempList = Object.keys(activeHabitTemp).map(
        (key) =>
            <li key={key}>
                <div>{activeHabitTemp[key].name}</div>
                <ul>
                {
                    daysOfTheWeeks.map((day, i) => 
                    <li key={i}>
                        <Days
                        day = {day}
                        vals = {activeHabitTemp[key].weeklyOccurrence[day] + ''} />
                    </li>
                    )
                }
                </ul>
            </li>
    )

    // let inactiveHabits = props.habits.filter(habit => !habit.active)
    // let inactiveHabitNames = inactiveHabits.map(habit => <li>{habit.name}</li>)

    return (
        <div className="wrapper">
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
            </div>
            <div className="margin2"></div>
        </div>
    )

}

export default HabitTemplates;