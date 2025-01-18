import React from 'react'
import { Link } from 'react-router-dom'
import '../css/ActorDetails.css'

const ActorDetails = ({ actor }) => {
  const formatBiography = text => {
    if (!text) return ''

    // Регулярное выражение для разделения по точкам и началу новых предложений
    const splitRegex = /(?<=[.!?])\s+(?=[А-ЯA-Z])/

    // Разбиваем текст на предложения
    const sentences = text.split(splitRegex)

    // Собираем абзацы
    let currentLength = 0
    let currentParagraph = ''
    const paragraphs = []

    sentences.forEach(sentence => {
      // Если текущий абзац превышает 400 символов, добавляем его
      if (currentLength + sentence.length > 800) {
        paragraphs.push(currentParagraph.trim())
        currentParagraph = ''
        currentLength = 0
      }
      currentParagraph += (currentParagraph ? ' ' : '') + sentence
      currentLength += sentence.length
    })

    // Добавляем последний абзац
    if (currentParagraph) {
      paragraphs.push(currentParagraph.trim())
    }

    // Добавляем два переноса строки между абзацами
    return paragraphs.map((paragraph, index) => (
      <React.Fragment key={index}>
        <p>{paragraph}</p>
        {index < paragraphs.length - 1 && <br />}
      </React.Fragment>
    ))
  }

  return (
    <div className='actor-page'>
      <div className='actor-header'>
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : '/default-avatar.png'
          }
          alt={actor.name}
        />
        <div className='actor-info'>
          <h1>{actor.name}</h1>
          <p> {formatBiography(actor.biography)}</p>
        </div>
      </div>

      <h2>Filmography</h2>
      <div className='filmography-grid'>
        {actor.movieCredits.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className='movie-card'>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : '/default-movie.png'
              }
              alt={movie.title}
            />
            <div className='movie-info'>
              <h3>{movie.title}</h3>
              <p>{movie.character && `as ${movie.character}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ActorDetails
