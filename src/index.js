import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
// import HabitTemplate from './HabitTemplate'
// import HabitTemplates from './HabitTemplates'
import Habits from './Habits'

import './index.css'

// data for HabitTemplate
// const data = {
//     "name": "Push ups",
//     "numberOfDays": 32,
//     "weeklyOccurrence": {
//         "Monday": false,
//         "Tuesday": false,
//         "Wednesday": true,
//         "Thursday": false,
//         "Friday": true,
//         "Saturday": false,
//         "Sunday": false
//     },
//     "dailyOccurrence": 2,
//     "reminder": true,
//     "reminderTimes": "8:30 PM"
// };

const data = {}

ReactDOM.render(<Habits {...data}/>, document.getElementById('root'))

