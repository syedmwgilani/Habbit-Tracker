# Habit-Tracker

## TODOs

1. Create a progress bar.
   - This should be two different shades of green
2. Make progress bar clickable.
3. Add notifications.
4. Add a way to move habitTemplate from active to inactive in habit page.
5. Add a decrement progress button
6. Add routing between pages.
   Work on example with this first:
   - [Local Demo to work on](/Users/syedgilani/Documents/react-demo-app)
   - [Easy Demo](https://reactrouter.com/docs/en/v6/getting-started/tutorial)
   - [Documentation](https://reactrouter.com/web/guides/quick-start)
7. Figure out if there is a way to route github pages when on a inner route page.
	- Check out this [issue]. (/Users/syedgilani/Documents/react-demo-app)
8. On Habits.js page if activeHabitTemp is null, then add button to the page to "Create a Habit". 
	- Also add message, "No Habits Today!".
9. Navigate back and forth in the Habits.js page.
10. Create History.js page.
11. Make sure Daily Occurrence is greater then 0 in HabitTemplate.js. Or else you get an Infinity percent in the Habit.js.
12. Change px to rem in css
13. On save in HabitTemplate.js this should go back to the Habits Page
        - maybe  make the save function a call back function
14. Add Habit Template.js add validation to page

1. Rewording: Apps.js Habit Tracker, 
			Change 
			x Schedule:
				x Today: Thursday (11/18/21)
				x Add a discription in the page.
				x Description: Todays Habits, Let's see what are on the habits for today.
				x Change Daily Occurence: show on the right side of the bar formatted 0/10.
				x Remove bullets in list items
				- Progress bar - I did it! Add a plus (+)

			  Habit Template.js
			  x Add a habit
			  x Add more spacing on page
			  - Functionality: Save button, Show saves.
				   Change links to [tabs](https://www.w3schools.com/howto/howto_js_tabs.asp)

			  Habit Tempales.js
			  x My Habits
			  x View all my Habit
			  x Only show current days selected

	x Color: use old colors
	x Fonts: Title https://fonts.google.com/specimen/Abril+Fatface?query=abril#standard-styles
		   Wording https://fonts.google.com/specimen/Quicksand?query=quick
		   Logo Calendar or Checkmark
	x Icon Change to light purple


## TODOs Wish list

1. Create an array that hold reminders in HabitTemplate.js
	- In Habits.js look at all the reminder times and create notifications based on those.
2. Refresh Habits.js page when day changes
3. Delete Habits older then a year.


## Limitations:

- Due to the limitations of localStorage, this will only show data for a year.
   - The user will only be able to go back input data for about a year prior.
   - Make this apparent to the user.
- Add feature to delete habits that are older than a year.

---

localStorage.getItem('activeHabitTemplates') OR localStorage.getItem('inactiveHabitTemplates')

{
	"3330192929643203": {
		"name": "Push ups",
		"numberOfDays": 32,
		"weeklyOccurrence": {
			"Monday": true,
			"Tuesday": true,
			"Wednesday": true,
			"Thursday": false,
			"Friday": true,
			"Saturday": false,
			"Sunday": false
		},
		"dailyOccurrence": 2,
		"reminder": true,
		"reminderTimes": "8:30 PM"
	}
}

localStorage.getItem('habits_2021_10_25')

{
   "3330192929643203": {
      "name":"Push ups",
      "dailyOccurrence":2,
      "progress": 0
   },
}


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
