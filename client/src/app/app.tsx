
import { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const Sidebar = lazy(() => import("../pages/layouts/sidebar"));
const MyFolder = lazy(() => import("../pages/MyFolder"));
const Home = lazy(() => import("../pages/home"));

const MyDocument = lazy(() => import("../pages/MyFolder/Document"));
const DocumentDetail = lazy(() => import("../pages/MyFolder/Document/detail"));
export function App() {
  const router = createBrowserRouter([
    {

      element: <Sidebar />,
      children: [
        {
          path: '/',
          index: true,
          element: <Home />
        },

        {

          path: "my-folder",
          element: <MyFolder />,
          children: [{
            path: "document/:id",
            element: <MyDocument />,
            children: [{
              path: ":id",
              element: <DocumentDetail />
            }]
          }]
        }
      ]

    }

  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
