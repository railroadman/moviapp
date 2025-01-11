import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'
import { getPopularMovies, searchMovies } from '../services/api'
function Home() {
  const [searchQuery, setSearchQuery] = useState('')

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
        setError('Failed to laod movies')
      } finally {
        setLoading(false)
      }
    }
    loadPopularMovies()
  }, [])

  const handleSeach = async e => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
      console.log('here')
      const searchResults = await searchMovies(searchQuery)
      setMovies(searchResults)
      setError(null)
    } catch (err) {
      onselectionchange.log(err)
      setError('Failed to search movies')
    } finally {
      setLoading(false)
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
        <button type='submit' className='search-button'>
          Search
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
