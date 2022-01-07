import { Outlet, NavLink } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <header>
        <img className="header-logo" src="logo48.svg" alt="Habit Tracker Logo"/>
        <h1 className="header-text">Habit Tracker</h1>
      </header>

      <nav>
        <NavLink className={({ isActive }) => isActive ? "active-tab" : "tab"} to="/habit-tracker/habits">Schedule</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active-tab" : "tab"} to="/habit-tracker/habit-template">Add A Habit</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active-tab" : "tab"} to="/habit-tracker/habit-templates">All My Habits</NavLink>
      </nav>

      <Outlet />

      <footer>
        <span>Explore more projects made by me on <a href="https://github.com/syedmwgilani" title="github" target="_blank" rel="noreferrer">Github</a>.</span>
      </footer>
    </div>
  );
}