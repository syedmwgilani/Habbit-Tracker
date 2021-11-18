import { Outlet, Link } from "react-router-dom";
import './App.css'

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Habit Tracker</h1>
      </header>

      <nav>
        <Link className="tab" to="/habit-tracker/habits">Habits</Link>
        <Link className="tab" to="/habit-tracker/habit-template">Habit Template</Link>
        <Link className="tab" to="/habit-tracker/habit-templates">Habit Templates</Link>
      </nav>

      <Outlet />

      <footer>
        <span>Explore more projects made by me <a href="https://github.com/syedmwgilani" title="github" target="_blank" rel="noreferrer">Github</a>.</span>
      </footer>
    </div>
  );
}