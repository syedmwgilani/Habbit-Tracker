# Habit-Tracker

## TODOs

x Create a progress bar.
   - This should be two different shades of green
x Make progress bar clickable.
x Add a decrement progress button
x Add routing between pages.
   Work on example with this first:
   - [Local Demo to work on](/Users/syedgilani/Documents/react-demo-app)
   - [Easy Demo](https://reactrouter.com/docs/en/v6/getting-started/tutorial)
   - [Documentation](https://reactrouter.com/web/guides/quick-start)
x Figure out if there is a way to route github pages when on a inner route page.
	- Check out this [issue]. (/Users/syedgilani/Documents/react-demo-app)
	- https://medium.com/swlh/how-to-host-your-angular-reactjs-vuejs-spa-on-github-pages-2d9ab102ac7b
x None of the text will be highlighted on clicking
x On Habits page if habits is empty, then add button to navigate to "Add a Habit" page. 
	- Also add a message, "No Habits Today!".
x Make sure Daily Occurrence is greater then 0 in HabitTemplate.js. Or else you get an Infinity percent in the Habit.js.
x Change icon and remove logos
	- [asprite color tutorial](https://www.youtube.com/watch?v=GLfliF05qAU)
x On Save button click prevent button from being double clicked
x Add name and weekday field validation before Save, in Habit Template page

	
- On page scroll make header and footer transparent.
- Add top of page button that appears on page scroll.
- Add new Logos.
- Add Logo to page
- Change Fonts
- Add empty habit message to Habit Templates page.
- Add a way to move habitTemplate from active to inactive in habit page.
- Navigate back and forth through days in the Habits page.
	- Only allow user to go back as far as a year back
- Click on habit template in Habit Templates page to edit it.
- Test app in Chrome, Firefox, Safari, Chrome (mobile) and Safari (mobile)
- Change px to rem in css
- Create History.js page.
- Remove unnessary comments

x Rewording: Apps.js Habit Tracker changes
	x Change text to "Schedule:"
		x "Today: Thursday (11/18/21)"
	x Add a discription in the page.
	x Description: Todays Habits, Let's see what are on the habits for today.
	x Change Daily Occurence: show on the right side of the bar formatted 0/10.
	x Remove bullets in list items
	x Progress bar add a plus (+)
	x Add a star when progress bar is full

	Habit Template.js
	x Add a habit
	x Add more spacing on page
	x Functionality: Save button, Show saves.
	x clear page on save

	Habit Templates.js
	x My Habits
	x View all my Habit
	x Only show current days selected
	- Add Button to Edit Active Habits
		- Add HabitTemplate_Edit page
			* Both save and cancel button should lead back to Habit Templates page


x Color: use old colors
x Fonts: Title https://fonts.google.com/specimen/Abril+Fatface?query=abril#standard-styles
		Wording https://fonts.google.com/specimen/Quicksand?query=quick
		Logo Calendar or Checkmark
x Icon Change to light purple


## TODOs Wish list

1. Create an array that hold reminders in HabitTemplate.js
	- In Habits.js look at all the reminder times.
	- Create notifications based on reminder times.
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
