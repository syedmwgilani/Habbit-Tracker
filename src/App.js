import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Outter Template in App.js</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/habits">Habits</Link> |{" "}
        <Link to="/habit-template">Habit Template</Link> |{" "}
        <Link to="/habit-templates">Habit Templates</Link>
      </nav>
      <Outlet />
    </div>
  );
}