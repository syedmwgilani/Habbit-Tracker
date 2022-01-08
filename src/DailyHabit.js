function ProgressBar(props) {
    const progPercent = Math.round(props.progress / props.dailyOccurrence * 100)
    const barSize = progPercent < 100 ? progPercent : 100

    const innerBar = {
        width: barSize + '%',
    }

    return (
        <div className="progress-bar" onClick={props.onClick}>
            <div className="inner-bar" style={innerBar}>
                <span className="inner-bar-text-left">+</span>
                <span className="inner-bar-text-center habit-name-large-screen">{props.name}</span>
                <span className="inner-bar-text-right">{props.progress} / {props.dailyOccurrence}</span>
            </div>
        </div>
    )
}

function DailyHabit(props) {
    return (
        <li className="pt1 pb1">
            <div className="habit-name-small-screen mb05">
                <b>{props.name}</b>
            </div>
            <div className="star-container">
                <div className="star-inner-content">
                    {props.progress >= props.dailyOccurrence
                    && <span className="icon-star-full"></span>}
                </div>
            </div>
            <ProgressBar
                name={props.name}
                dailyOccurrence={props.dailyOccurrence}
                progress={props.progress}
                onClick={props.onClick} />
            <div className="decrement-button ml1" onClick={props.onClickDecrement}>
                <div className="decrement-inner-button">
                    <span className="decrement-inner-button-content">-</span>
                </div>
            </div>
        </li>
    )
}

export default DailyHabit