import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./components/Home.jsx"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Jobs from "./components/Jobs.jsx"
import Browse from "./components/Browse.jsx"
import Profile from "./components/Profile.jsx"
import JobDescription from "./components/JobDescription.jsx"
import Companies from "./admin/Companies.jsx"
import CompanyCreate from "./admin/CompanyCreate.jsx"
import CompanySetup from "./admin/CompanySetup.jsx"
import AdminJobs from "./admin/AdminJobs.jsx"
import PostJob from "./admin/PostJob.jsx"
import Applicants from "./admin/Applicants.jsx"
import ProtectedRoute from "./admin/ProtectedRoute.jsx"
import MessagesPage from "./components/messages/MessagePage.jsx"


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
   {
    path: "/messages",                // ← add this route
    element: <MessagesPage />
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },

])
function App() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition-colors duration-300">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App