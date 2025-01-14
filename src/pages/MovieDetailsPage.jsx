import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import MovieDetails from '../components/MovieDetails'
import { getMovieDetails } from '../services/api'

const MovieDetailsPage = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [posterLoaded, setPosterLoaded] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getMovieDetails(id, {
          signal: abortController.signal,
        })

        if (!data) {
          throw new Error('No data received from API')
        }

        setMovie(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching movie details:', err)
          setError(err.message || 'Failed to fetch movie details')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()

    return () => {
      abortController.abort()
    }
  }, [id])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!movie) {
    return <ErrorMessage message='Movie not found' />
  }

  return (
    <div>
      {movie.poster_path && !posterLoaded && <Loader />}
      <MovieDetails movie={movie} onPosterLoad={() => setPosterLoaded(true)} />
    </div>
  )
}

export default MovieDetailsPage
