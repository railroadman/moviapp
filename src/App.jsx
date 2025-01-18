import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'
import './css/App.css'
import ActorPage from './pages/ActorPage'
import Favorites from './pages/Favorites'
import GenreMovies from './pages/GenreMovies/GenreMovies'
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
            <Route path='/genre/:genreId' element={<GenreMovies />} />
            <Route path='/actor/:id' element={<ActorPage />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  )
}

export default App
