import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home"
import BlockApp from "./blockApp"
import ContactPage from "./ContactPage";
import ProjectsPage from "./ProjectPage";
import './App.css';

export const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "blockFristApp", element: <BlockApp/>},
    {path: "ContactPage", element: <ContactPage/>},
    {path: "ProjectsPage", element: <ProjectsPage/>}
])

export default function App() {
  return <RouterProvider router={router} />;
}