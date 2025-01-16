import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'
import { getMovieGenres, getPopularMovies, searchMovies } from '../services/api'
function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [genres, setGenres] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isChangingPage, setIsChangingPage] = useState(false)
  const sidebarRef = useRef(null)

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresList = await getMovieGenres()
        setGenres(genresList)
      } catch (err) {
        console.error('Failed to load genres:', err)
      }
    }
    loadGenres()
  }, [])

  useEffect(() => {
    console.log('--- useEffect triggered ---')
    console.log('Current page:', currentPage)
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies(currentPage)
        setMovies(popularMovies.results)
        setTotalPages(popularMovies.total_pages || 1) // Добавим <fallback></fallback>
        console.log('Total pages set to:', popularMovies.total_pages)
      } catch (err) {
        console.log(err)
        setError('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }
    loadPopularMovies()
  }, [currentPage])

  const toggleSidebar = () => {
    console.log('Clicked')
    sidebarRef.current.classList.toggle('active')
  }

  const handleSeach = async e => {
    e.preventDefault()
    if (!searchQuery.trim() || isSearching) return

    setIsSearching(true)
    setLoading(true)
    setCurrentPage(1)

    try {
      const searchResults = await searchMovies(searchQuery)
      setMovies(searchResults.results)
      setTotalPages(searchResults.total_pages)
      setError(null)
    } catch (err) {
      console.log(err)
      setError('Failed to search movies')
    } finally {
      setLoading(false)
      setIsSearching(false)
    }
  }

  const handlePageChange = useCallback(
    direction => {
      setCurrentPage(prev => {
        const newPage = direction === 'next' ? prev + 1 : prev - 1
        console.log('Changing page from', prev, 'to', newPage)

        if (newPage === prev) {
          console.log('Page not changed - same value')
          return prev
        }

        if (newPage >= 1 && newPage <= totalPages) {
          console.log('Page change approved')
          window.scrollTo(0, 0)
          return newPage
        }

        console.log('Page change rejected - out of bounds')
        return prev
      })
    },
    [totalPages]
  )

  return (
    <div className='home'>
      <button className='sidebar-toggle' onClick={toggleSidebar}>
        ☰
      </button>
      <div className='sidebar' ref={sidebarRef}>
        <h3>Жанры</h3>
        <ul className='genres-list'>
          {genres.map(genre => (
            <Link
              to={`/genre/${genre.id}`}
              key={genre.id}
              className='genre-item'
            >
              {genre.name}
            </Link>
          ))}
        </ul>
      </div>
      <div className='content'>
        <form className='search-form' onSubmit={handleSeach}>
          <input
            type='text'
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='Seachh movies....'
            value={searchQuery}
            className='search-input'
          />
          <button
            type='submit'
            className='search-button'
            disabled={isSearching || loading}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
        {error && <div className='error-message'>{error}</div>}
        {loading ? (
          <div className='loading'>Загрузка...</div>
        ) : (
          <>
            <div className='movies-grid'>
              {movies.map(movie => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>

            <div className='pagination'>
              <button
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 1 || loading}
              >
                Назад
              </button>

              <span>
                Страница {currentPage} из {totalPages}
              </span>

              <button
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages || loading}
              >
                Вперед
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
