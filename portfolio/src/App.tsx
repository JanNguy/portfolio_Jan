import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home"
import BlockApp from "./blockApp"
import IndexPage from "./IndexPage";
import ContactPage from "./ContactPage";
import './App.css';

export const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "blockFristApp", element: <BlockApp/>},
    {path: "IndexPage", element: <IndexPage/>},
    {path: "ContactPage", element: <ContactPage/>}
])

export default function App() {
  return <RouterProvider router={router} />;
}