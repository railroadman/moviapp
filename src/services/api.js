const API_KEY = 'b602fbe7e16d75b586c0947d0a29dab3'
const BASE_URL = 'https://api.themoviedb.org/3'

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ru&page=${page}`
  )
  const data = await response.json()
  return data
}

export const getMovieDetails = async id => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error in getMovieDetails:', error)
    throw error
  }
}

export const searchMovies = async query => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  )
  const data = await response.json()
  return data.results
}

export const getMovieGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ru`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.genres
  } catch (error) {
    console.error('Error in getMovieGenres:', error)
    throw error
  }
}
export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=ru&page=${page}`
  )
  return await response.json()
}

export const searchActors = async query => {
  const response = await fetch(
    `${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=ru`
  )
  const data = await response.json()
  return data.results
}

export const getMovieCast = async movieId => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.cast // Возвращаем только список актеров
  } catch (error) {
    console.error('Error in getMovieCast:', error)
    throw error
  }
}
