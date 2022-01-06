import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <header>
        <img className="header-logo" src="logo48.svg" alt="Habit Tracker Logo"/>
        <h1 className="header-text">Habit Tracker</h1>
      </header>

      <nav>
        <Link className="tab" to="/habit-tracker/habits">Schedule</Link>
        <Link className="tab" to="/habit-tracker/habit-template">Add A Habit</Link>
        <Link className="tab" to="/habit-tracker/habit-templates">All My Habits</Link>
      </nav>

      <Outlet />

      <footer>
        <span>Explore more projects made by me on <a href="https://github.com/syedmwgilani" title="github" target="_blank" rel="noreferrer">Github</a>.</span>
      </footer>
    </div>
  );
}