import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Assuming your CSS files are in the styles folder
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import SignIn from './pages/Signin';
import ProfilePage from './pages/Profile';
import MentorshipPage from './pages/Mentors';
import CoursesPage from './pages/Courses';
import MessagesPage from './pages/Messages';
import JobsPage from './pages/Jobs';
import EventsPage from './pages/Events';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // The default page when the app loads
        element: <Dashboard />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'mentorship',
        element: <MentorshipPage />
      },
      {
        path: 'courses',
        element: <CoursesPage />
      },
      {
        path: 'messages',
        element: <MessagesPage />
      },
      {
        path: 'jobs',
        element: <JobsPage />
      },
      {
        path: 'events',
        element: <EventsPage />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
