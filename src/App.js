import { Outlet, Link } from "react-router-dom";
import './App.css'

export default function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Habit Tracker</h1>
        <nav>
          <Link className="tab" to="/habit-tracker/habits">Habits</Link>
          <Link className="tab" to="/habit-tracker/habit-template">Habit Template</Link>
          <Link className="tab" to="/habit-tracker/habit-templates">Habit Templates</Link>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}