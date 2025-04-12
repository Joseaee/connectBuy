import { createBrowserRouter, RouterProvider } from "react-router"

import Home from "../views/Home"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
])

function MyRoutes(){ return <RouterProvider router={router} /> }

export default MyRoutes