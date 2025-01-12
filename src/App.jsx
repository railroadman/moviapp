import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'
import './css/App.css'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import MovieDetailsPage from './pages/MovieDetailsPage'
MovieDetailsPage
function App() {
  return (
    <>
      <MovieProvider>
        <NavBar />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/movie/:id' element={<MovieDetailsPage />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  )
}

export default App
