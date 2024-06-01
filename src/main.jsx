import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx'
import { Protected } from './components/index.js'
import AddPost from "./pages/AddPost.jsx";
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPosts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },{
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },{
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },{
        path: "/all-posts",
          element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>
          ),
      },{
        path: "/add-post",
        element: (
          <AuthLayout authentication>
              {" "}
              <AddPost />
          </AuthLayout>
        ),
      },{
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
              {" "}
              <EditPost />
          </AuthLayout>
        ),
      },{
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
