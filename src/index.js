import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Habits from './Habits';
import HabitTemplate from './HabitTemplate';
import HabitTemplates from './HabitTemplates';

import './index.css'

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="habits" element={<Habits />} />
        <Route path="habit-template" element={<HabitTemplate />} />
        <Route path="habit-templates" element={<HabitTemplates />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);