import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import MovieDetails from '../components/MovieDetails'
import { getMovieCast, getMovieDetails } from '../services/api'

const MovieDetailsPage = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [posterLoaded, setPosterLoaded] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        const [movieData, castData] = await Promise.all([
          getMovieDetails(id),
          getMovieCast(id),
        ])

        if (!movieData) {
          throw new Error('No data received from API')
        }

        setMovie(movieData)
        setCast(castData)
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
      <MovieDetails
        movie={movie}
        cast={cast}
        onPosterLoad={() => setPosterLoaded(true)}
      />
    </div>
  )
}

export default MovieDetailsPage
