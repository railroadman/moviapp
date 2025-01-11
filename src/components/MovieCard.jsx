import { useNavigate } from 'react-router-dom'
import { useMovieContext } from '../contexts/MovieContext'
import '../css/MovieCard.css'
function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
  const favorite = isFavorite(movie.id)
  const navigate = useNavigate()
  function onFavoriteClick(e) {
    e.preventDefault()
    if (favorite) removeFromFavorites(movie.id)
    else addToFavorites(movie)
  }

  const handleMovieClick = e => {
    e.preventDefault()
    navigate(`/movie/${movie.id}`)
  }
  return (
    <div className='movie-card'>
      <div className='movie-poster'>
        <img
          src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className='movie-overlay'>
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavoriteClick}
          ></button>
        </div>
      </div>
      <div className='movie-info'>
        <h2>
          <a href='#' onClick={handleMovieClick}>
            {movie.title}
          </a>
        </h2>
        <p>{movie.release_date?.split('-')[0]}</p>
      </div>
    </div>
  )
}
export default MovieCard
