import Home from './pages/Home'
import Blogs from './pages/Blogs'
import BlogDetails from './pages/BlogDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import RootLayout from './layouts/RootLayout'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from 'react-router-dom'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='blogs' element={<Blogs />} />
        <Route path='blogs/:id' element={<BlogDetails />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App