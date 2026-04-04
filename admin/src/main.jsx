/* eslint-disable react-refresh/only-export-components */
import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const AllProjects = lazy(() => import('./pages/projects/AllProjects'));
const AddProject = lazy(() => import('./pages/projects/AddProjects'));
const EditProject = lazy(() => import('./pages/projects/EditProjects'));
const AllSkills = lazy(() => import('./pages/skills/AllSkills'));
const AddSkill = lazy(() => import('./pages/skills/AddSkills'));
const EditSkill = lazy(() => import('./pages/skills/EditSkills'));
const Certificates = lazy(() => import('./pages/certificates/Certificates'));
const Resume = lazy(() => import('./pages/resume/Resume'));
const Messages = lazy(() => import('./pages/messages/Message'));
const Settings = lazy(() => import('./pages/settings/Settings'));

import './styles/index.css';

const PageLoader = () => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#52525b', fontSize: '0.875rem' }}>Loading...</div>;
const wrap = (element) => <Suspense fallback={<PageLoader />}>{element}</Suspense>;

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      { index: true, element: wrap(<Dashboard />) },
      { path: 'projects', element: wrap(<AllProjects />) },
      { path: 'projects/add', element: wrap(<AddProject />) },
      { path: 'projects/edit/:id', element: wrap(<EditProject />) },
      { path: 'skills', element: wrap(<AllSkills />) },
      { path: 'skills/add', element: wrap(<AddSkill />) },
      { path: 'skills/edit/:id', element: wrap(<EditSkill />) },
      { path: 'certificates', element: wrap(<Certificates />) },
      { path: 'resume', element: wrap(<Resume />) },
      { path: 'messages', element: wrap(<Messages />) },
      { path: 'settings', element: wrap(<Settings />) },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
