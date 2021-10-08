import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
// import HabitTemplate from './HabitTemplate'
// import HabitTemplates from './HabitTemplates'
import Habits from './Habits'

import './index.css'

// data for HabitTemplate
// let data = {
//     "name": "Push ups",
//     "numberOfDays": 32,
//     "weeklyOccurrence": {
//         "monday": false,
//         "tuesday": false,
//         "wednesday": true,
//         "thursday": false,
//         "friday": true,
//         "saturday": false,
//         "sunday": false
//     },
//     "dailyOccurrence": 2,
//     "reminder": true,
//     "reminderTimes": "8:30 PM"
// };

// data for Habits
let data = {
    increment: 5,
}

ReactDOM.render(<Habits {...data}/>, document.getElementById('root'))

