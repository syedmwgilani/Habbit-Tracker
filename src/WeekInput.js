function WeekInput(props) {

    return (
        <div>
            <b>Weekly Occurence: </b>
            <div className="checkboxes-container">
                <label className="checkbox-container" htmlFor="mondayId">
                    <input type="checkbox"
                        id="mondayId"
                        name="weeklyOccurrence.Monday"
                        checked={props.Monday}
                        onChange={(event) => props.onChange(event)}
                    />
                    <span>Monday</span>
                </label>
                <label className="checkbox-container" htmlFor="tuesdayId">
                    <input type="checkbox"
                        id="tuesdayId"
                        name="weeklyOccurrence.Tuesday"
                        checked={props.Tuesday}
                        onChange={(event) => props.onChange(event)}
                    />
                    <span>Tuesday</span>
                </label>
                <label className="checkbox-container" htmlFor="wednesdayId">
                    <input type="checkbox"
                        id="wednesdayId"
                        name="weeklyOccurrence.Wednesday"
                        checked={props.Wednesday}
                        onChange={(event) => props.onChange(event)}
                    />
                    <span>Wednesday</span>
                </label>
                <label className="checkbox-container" htmlFor="thursdayId">
                    <input type="checkbox"
                        id="thursdayId"
                        name="weeklyOccurrence.Thursday"
                        checked={props.Thursday}
                        onChange={(event) => props.onChange(event)}
                    />
                    <span>Thursday</span>
                </label>
                <label className="checkbox-container" htmlFor="fridayId">
                    <input type="checkbox"
                        id="fridayId"
                        name="weeklyOccurrence.Friday"
                        checked={props.Friday}
                        onChange={(event) => props.onChange(event)}
                    />
                    <span>Friday</span>
                </label>
                <label className="checkbox-container" htmlFor="saturdayId">
                    <input type="checkbox"
                        id="saturdayId"
                        name="weeklyOccurrence.Saturday"
                        checked={props.Saturday}
                        onChange={(event) => props.onChange(event)}
                    />
                    <span>Saturday</span>
                </label>
                <label className="checkbox-container" htmlFor="sundayId">
                    <input type="checkbox"
                        id="sundayId"
                        name="weeklyOccurrence.Sunday"
                        checked={props.Sunday}
                        onChange={(event) => props.onChange(event)}
                    />
                    <span>Sunday</span>
                </label>
            </div>
        </div >
    );
}

export default WeekInput;