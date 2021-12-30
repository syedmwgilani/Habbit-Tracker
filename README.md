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

- Change Fonts
- Add a way to move habitTemplate from active to inactive in habit page.
- Navigate back and forth through days in the Habits page.
	- Only allow user to go back as far as a year back
- Click on habit template in Habit Templates page to edit it.
- Test app in Chrome, Firefox, Safari, Chrome (mobile) and Safari (mobile)
- Change px to rem in css
- Create History.js page.
- Remove unnessary comments

Habit Tracker Changes:

	Apps
	x Rewording: Change text to "Schedule:"
		x "Today: Thursday (11/18/21)"
	x Add a discription in the page.
	x Description: Todays Habits, Let's see what are on the habits for today.
	x Change Daily Occurence: show on the right side of the bar formatted 0/10.
	x Remove bullets in list items
	x Progress bar add a plus (+)
	x Add a star when progress bar is full
	x Created new Logos
	x Add logo to title 
	x Change progress bar color to --secondary-bg-color.
	x Change star background color to a shade of yellow.
	- On page scroll make nav in header and footer transparent.
	- Add top of page button that appears on page scroll.
		* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_scroll_to_top
		* https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript

	Habit Template
	x Add a habit
	x Add more spacing on page
	x Functionality: Save button, Show saves.
	x clear page on save

	Habit Template Edit
	x Fix bug where on name delete the page displays non-existing habit entry message

	Habit Templates
	x My Habits
	x View all my Habit
	x Only show current days selected
	x Add Button to Edit Active Habits
		x Add HabitTemplate_Edit page
	x Save button should lead back to Habit Templates page
	x Cancel button should lead back to Habit Templates page
	x Added empty habit message to and fixed empty activeHabitTemp bug.


x Color: use old colors
x Fonts: Title https://fonts.google.com/specimen/Abril+Fatface?query=abril#standard-styles
		Wording https://fonts.google.com/specimen/Quicksand?query=quick
		Logo Calendar or Checkmark
x Icon Change to light purple


## TODOs Wish list

1. Create an array that hold reminders in HabitTemplate.js
	- In Habits.js look at all the reminder times.
	- Create notifications based on reminder times.
2. Refresh Habits.js page when day changes.
	- I might have to add service workers to do this


## Limitations:

- Due to the limitations of localStorage, this will only show data for a year.
   - The user will only be able to go back through date set for about a year prior.
   - SOLUTION: Delete Habits older then a year.
	- Probably a bad solution
---

localStorage.getItem('activeHabitTemplates')

{
	"3330192929643203": {
		"name": "Push ups",
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
		"reminderTimes": "8:30 PM",
		startDate: "12/21/2021",
		endDate: "",
		valid_startDate: true,
		valid_endDate: false,
	}
}

localStorage.getItem('habits_2021_10_25')

{
   "3330192929643203": {
      "progress": 0
   },
}

