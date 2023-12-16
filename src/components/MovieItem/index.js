import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props

  const {
    adult,
    backdropPath,
    genreId,
    id,
    voteAverage,
    voteCount,
    originalLanguage,
    originalTitle,
    overView,
    popularity,
    posterPath,
    releaseDate,
    title,
    video,
  } = movieDetails
  return (
    <li className="movie-item">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        className="movie-poster"
        alt={title}
      />

      <p>{title}</p>
      <div className="rating-view-btn">
        <p>{voteAverage}</p>
        <Link to={`/movie/${id}`} className="restaurant-item">
          <button type="button" className="view-more-btn">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieItem
