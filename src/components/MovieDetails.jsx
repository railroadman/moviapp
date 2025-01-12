// components/MovieDetails.jsx
import React from 'react'
import '../css/MovieDetails.css'

const MovieDetails = ({ movie }) => {
  // Вспомогательные функции для форматирования
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className='movie-details'>
      <div className='movie-header'>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`${movie.title} poster`}
          className='movie-poster'
        />
        <div className='movie-info'>
          <h1 className='movie-title'>{movie.title}</h1>
          <p className='movie-tagline'>{movie.tagline}</p>
          <div className='movie-rating'>
            <span className='rating-value'>{movie.vote_average}</span>
            <span className='rating-count'>({movie.vote_count} votes)</span>
          </div>
        </div>
      </div>

      <div className='movie-content'>
        <div className='movie-overview'>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </div>

        <div className='movie-details-grid'>
          <div className='detail-item'>
            <span className='detail-label'>Release Date:</span>
            <span className='detail-value'>
              {formatDate(movie.release_date)}
            </span>
          </div>
          <div className='detail-item'>
            <span className='detail-label'>Runtime:</span>
            <span className='detail-value'>{movie.runtime} minutes</span>
          </div>
          <div className='detail-item'>
            <span className='detail-label'>Genres:</span>
            <span className='detail-value'>
              {movie.genres.map(genre => genre.name).join(', ')}
            </span>
          </div>
          <div className='detail-item'>
            <span className='detail-label'>Original Language:</span>
            <span className='detail-value'>{movie.original_language}</span>
          </div>
          <div className='detail-item'>
            <span className='detail-label'>Budget:</span>
            <span className='detail-value'>{formatCurrency(movie.budget)}</span>
          </div>
          <div className='detail-item'>
            <span className='detail-label'>Revenue:</span>
            <span className='detail-value'>
              {formatCurrency(movie.revenue)}
            </span>
          </div>
        </div>

        {movie.production_companies.length > 0 && (
          <div className='production-companies'>
            <h2>Production Companies</h2>
            <div className='companies-list'>
              {movie.production_companies.map(company => (
                <div className='company' key={company.id}>
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                      alt={`${company.name} logo`}
                      className='company-logo'
                    />
                  )}
                  <span className='company-name'>{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetails
