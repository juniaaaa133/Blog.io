import Home, { homeLoader } from './page/home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './routes/Layout';
import PostDetail, { detailAction, detailLoader } from './page/post-detail/PostDetail';
import CreatePost, { createActoin } from './page/create-post/CreatePost';
import EditPost, { updateAction } from './page/edit-post/EditPost';
import Error from './page/error/Error';

function App() {

  const router = createBrowserRouter([
    {
      path : "/",
      element : <Layout />,
      errorElement : <Error />,
      children : [
        {
          element : <Home />,
          index : true,
          loader : homeLoader,
        },
        {
          path : '/create-post',
          element : <CreatePost />,
          action : createActoin,
        },
        {
          path : 'blog/:id',
          element : <PostDetail />,
          action :detailAction,
        },
      ]
    },
     {
      id : 'blog',
      path : 'blog/:id',
      element :<Layout />,
      errorElement : <Error />,
      loader : detailLoader,
      children : [
        {
          index : true,
          element : <PostDetail />
        },
        {
          path : 'edit',
          element :<EditPost />,
          action: updateAction,
        }
      ]
     }
  ])

  return <RouterProvider router={router} />
}

export default App
