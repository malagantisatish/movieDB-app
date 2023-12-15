import './index.css'

const CastDetails = props => {
  const {castInfo} = props

  const {character, originalName, profilePath, castId} = castInfo
  return (
    <li>
      <img
        src={`https://image.tmdb.org/t/p/w500${profilePath}`}
        alt={originalName}
        className="profile-image"
      />
      <p>{originalName}</p>
      <p>{character}</p>
    </li>
  )
}

export default CastDetails
