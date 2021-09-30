function WeekInput(props) {

    return(
    <div>
        <span>Weekly Occurence: </span>

        <label htmlFor="mondayId">
            <input type="checkbox"
                id="mondayId"
                name="weeklyOccurrence.monday"
                checked={props.monday}
                onChange={ (event) => props.onChange(event) }
            />
            <span>Monday</span>
        </label>
        <label htmlFor="tuesdayId">
            <input type="checkbox"
                id="tuesdayId"
                name="weeklyOccurrence.tuesday"
                checked={props.tuesday}
                onChange={ (event) => props.onChange(event) }
            />
            <span>Tuesday</span>
        </label>
        <label htmlFor="wednesdayId">
            <input type="checkbox"
                id="wednesdayId"
                name="weeklyOccurrence.wednesday"
                checked={props.wednesday}
                onChange={ (event) => props.onChange(event) }
            />
            <span>Wednesday</span>
        </label>
        <label htmlFor="thursdayId">
            <input type="checkbox"
                id="thursdayId"
                name="weeklyOccurrence.thursday"
                checked={props.thursday}
                onChange={ (event) => props.onChange(event) }
            />
            <span>Thursday</span>
        </label>
        <label htmlFor="fridayId">
            <input type="checkbox"
                id="fridayId"
                name="weeklyOccurrence.friday"
                checked={props.friday}
                onChange={ (event) => props.onChange(event) }
            />
            <span>Friday</span>
        </label>
        <label htmlFor="saturdayId">
            <input type="checkbox"
                id="saturdayId"
                name="weeklyOccurrence.saturday"
                checked={props.saturday}
                onChange={ (event) => props.onChange(event) }
            />
            <span>Saturday</span>
        </label>
        <label htmlFor="sundayId">
            <input type="checkbox"
                id="sundayId"
                name="weeklyOccurrence.sunday"
                checked={props.sunday}
                onChange={ (event) => props.onChange(event) }
            />
            <span>Sunday</span>
        </label>
    </div >
    );
}

export default WeekInput;