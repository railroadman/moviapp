import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'
import { getPopularMovies, searchMovies } from '../services/api'
function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies()
        setMovies(popularMovies)
      } catch (err) {
        console.log(err)
        setError('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }
    loadPopularMovies()
  }, [])

  const handleSeach = async e => {
    e.preventDefault()
    if (!searchQuery.trim() || isSearching) return

    setIsSearching(true)
    setLoading(true)

    try {
      const searchResults = await searchMovies(searchQuery)
      setMovies(searchResults)
      setError(null)
    } catch (err) {
      console.log(err)
      setError('Failed to search movies')
    } finally {
      setLoading(false)
      setIsSearching(false)
    }
  }
  return (
    <div className='home'>
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
        <div className='loading'> Loading ...</div>
      ) : (
        <div className='movies-grid'>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
