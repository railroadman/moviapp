import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MovieCard from '../../components/MovieCard'
import { getMovieGenres, getMoviesByGenre } from '../../services/api'
import './GenreMovies.css'

function GenreMovies() {
  const { genreId } = useParams()
  const [movies, setMovies] = useState([])
  const [genreName, setGenreName] = useState('')
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [moviesData, genresData] = await Promise.all([
          getMoviesByGenre(genreId, currentPage),
          getMovieGenres(),
        ])

        const currentGenre = genresData.find(g => g.id === Number(genreId))
        setGenreName(currentGenre?.name || '')
        setMovies(moviesData.results)
        setGenres(genresData)
        setTotalPages(moviesData.total_pages)
      } catch (err) {
        setError('Failed to load data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [genreId, currentPage])

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className='genre-movies-container'>
      <div className='sidebar'>
        <h3>Жанры</h3>
        <ul className='genres-list'>
          {genres.map(genre => (
            <li
              key={genre.id}
              className={`genre-item ${
                genre.id === Number(genreId) ? 'active' : ''
              }`}
            >
              <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='content'>
        <h1>Фильмы в жанре: {genreName}</h1>
        <Link to='/' className='back-link'>
          ← На главную
        </Link>

        {loading && <div className='loading'>Загрузка...</div>}
        {error && <div className='error'>{error}</div>}

        <div className='movies-grid'>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>

        <div className='pagination'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Назад
          </button>

          <span>
            Страница {currentPage} из {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Вперед
          </button>
        </div>
      </div>
    </div>
  )
}

export default GenreMovies
