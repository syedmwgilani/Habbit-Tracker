import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Habits from './Habits';
import HabitTemplate from './HabitTemplate';
import HabitTemplateEdit from './HabitTemplateEdit';
import HabitTemplates from './HabitTemplates';

import './index.css'

// function ProfilePage() {
//   // Get the userId param from the URL.
//   let { habitId } = useParams();
// }

const rootElement = document.getElementById("root");
let direct = 'habits';
if (sessionStorage.getItem('location')) {
  direct = sessionStorage.getItem('location')
  sessionStorage.removeItem('location')
}
render(
  <BrowserRouter>
    <Routes>
      <Route path="/habit-tracker/" element={<App />}>
        {/* Traffic is being directed here, based on sessionStorage 'locations' value. 
            Which is set in 404.html page.*/}
        <Route path="/habit-tracker/" element={<Navigate to={'/habit-tracker/' + direct} />} />
        <Route path="habits" element={<Habits />} />
        <Route path="habit-template" element={<HabitTemplate />} />
        <Route path="habit-template-edit-:habitId" element={<HabitTemplateEdit />} />
        <Route path="habit-templates" element={<HabitTemplates />} />
        <Route
          path="*"
          element={
            <main className="grid-wrapper">
              <div></div>{/* Used for sides in grid. Needed to work properly. */}
              <p>
                Sorry you have navigated to a page that does not exist.
                Try going to the <Link to="/habit-tracker/habits">Schedule</Link> page instead.
              </p>
              <div></div>{/* Used for sides in grid. Needed to work properly. */}
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);