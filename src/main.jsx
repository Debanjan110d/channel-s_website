import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import GithubStats from './components/GithubStats/Github.jsx'
import Privacy from './components/Privacy/Privacy.jsx'
import Terms from './components/Terms/Terms.jsx'
import User from './components/User/User.jsx'
import LatestVideos from './components/Videos/LatestVideos.jsx'
import LatestShorts from './components/Videos/LatestShorts.jsx'
import { githubStatsLoader } from './components/GithubStats/Github.jsx'
import { latestVideosLoader } from './components/Videos/LatestVideos.jsx'
import { latestShortsLoader } from './components/Videos/LatestShorts.jsx'
import InitialRouteFallback from './components/common/InitialRouteFallback.jsx'


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: '/about', element:<About /> },
//       { path: '/contact', element: <Contact /> },
//       { path: '/github', element: <GithubStats /> },

//     ],
//   },
// ])

//or


const router =createBrowserRouter(
  createRoutesFromElements(// This is pretty new and very cool ,To me pretty easy to understand
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/github' element={<GithubStats />} loader={githubStatsLoader} />
      <Route path='/videos' element={<LatestVideos />} loader={latestVideosLoader} />
      <Route path='/shorts' element={<LatestShorts />} loader={latestShortsLoader} />
      <Route path='/privacy' element={<Privacy />} />
      <Route path='/terms' element={<Terms />} />
      <Route path='/user/:userid' element={<User />} />
    </Route>
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<InitialRouteFallback />} />
  </StrictMode>,
)