import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NewsFeed from './NewsFeed';
import CreatePostPage from './create_post.js';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/news-feed",
        element: <NewsFeed />,
    },
    {
        path: "/create-post",
        element: <CreatePostPage />,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
