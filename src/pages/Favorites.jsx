import MovieCard from '../components/MovieCard'
import { useMovieContext } from '../contexts/MovieContext'
import '../css/Favorites.css'
function Favorites() {
  const { favorites } = useMovieContext()
  if (favorites) {
    return (
      <div className='favorites'>
        <h2>Your favorites</h2>
        <div className='movies-grid'>
          {favorites.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div classname='favorites-empty'>
      <h2>No Favorites movie yets</h2>
    </div>
  )
}
export default Favorites
