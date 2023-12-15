import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
import CastDetails from '../CastDetails'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'PROCESS',
  failure: 'FAIL',
}

class SingleMovieDetails extends Component {
  state = {
    movieDetails: {},
    status: apiStatus.initial,
    isSearch: false,
    searchInput: '',
    genres: [],
    castDetails: [],
  }

  componentDidMount() {
    this.getTheMovieData()
    this.getTheCastDetails()
  }

  getTheFormattedDataOfCast = item => ({
    character: item.character,
    originalName: item.original_name,
    profilePath: item.profile_path,
    castId: item.cast_id,
  })

  getTheCastDetails = async () => {
    const {searchInput, isSearch} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = 'd69c7e5016c1d973fd6a3615ce35e5ae'
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const response = await fetch(castUrl)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const formattedData = data.cast.map(each =>
        this.getTheFormattedDataOfCast(each),
      )

      this.setState({castDetails: formattedData})
    }
  }

  getTheGenre = item => ({
    id: item.id,
    name: item.name,
  })

  getTheProductionCompanies = item => ({
    id: item.id,
    logoPath: item.logo_path,
    name: item.name,
    originalCountry: item.original_country,
  })

  getTheFormattedData = item => ({
    adult: item.adult,
    backdropPath: item.backdrop_path,
    genreId: item.genre_ids,
    id: item.id,
    originalLanguage: item.original_language,
    originalTitle: item.original_title,
    overview: item.overview,
    popularity: item.popularity,
    posterPath: item.poster_path,
    releaseDate: item.release_date,
    title: item.title,
    video: item.video,
    voteAverage: item.vote_average,
    voteCount: item.vote_count,
    runtime: item.runtime,
    genres: item.genres.map(each => this.getTheGenre(each)),
    productionCompanies: item.production_companies.map(each =>
      this.getTheProductionCompanies(each),
    ),
  })

  getTheMovieData = async () => {
    const {searchInput, isSearch} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const apiKey = 'd69c7e5016c1d973fd6a3615ce35e5ae'
    const normalUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US` // url
    ///  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1`
    //  const url = isSearch ? searchUrl : normalUrl
    this.setState({status: apiStatus.inProcess})
    const response = await fetch(normalUrl)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      const formattedData = this.getTheFormattedData(data)

      //  console.log(formattedData)
      this.setState({
        movieDetails: formattedData,
        status: apiStatus.success,
        genres: formattedData.genres,
      })
    }
  }

  getTheSearchInput = value => {
    this.setState({searchInput: value, isSearch: true}, this.getTheMovieData)
  }

  renderTheLoaderView = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderTheCastView = () => {
    const {castDetails} = this.state
    return (
      <ul className="cast-list">
        {castDetails.map(each => (
          <CastDetails key={each.castId} castInfo={each} />
        ))}
      </ul>
    )
  }

  renderTheSuccessView = () => {
    const {movieDetails, genres} = this.state
    const {
      adult,
      backdropPath,
      genreId,
      id,
      voteAverage,
      voteCount,
      originalLanguage,
      originalTitle,
      overview,
      popularity,
      posterPath,
      releaseDate,
      title,
      video,
      runtime,
      productionCompanies,
    } = movieDetails
    return (
      <div className="movie-details-page">
        <img
          src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
          className="movie-poster"
          alt={title}
        />
        <div className="details-container">
          <h1 className="title">{`Title :${title}`}</h1>
          <h1>Genres</h1>
          <ul className="genres">
            {genres.map(each => (
              <li key={each.id}>
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <p>{`Ratting: ${voteAverage}`}</p>
          <p>{`Duration: ${runtime}`}</p>
          <p>{`Release Date: ${releaseDate}`}</p>
          <p>{`Vote Count: ${voteCount}`}</p>
          <p>{`Description: ${overview}`}</p>
        </div>
        {this.renderTheCastView()}
      </div>
    )
  }

  /* renderTheHomePage = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.inProcess:
        return this.renderTheLoaderView()
      case apiStatus.success:
        return this.renderTheSuccessView()

      default:
        return null
    }
  }
*/
  render() {
    const {searchInput} = this.state
    //  console.log(searchInput)
    return (
      <>
        <Header getTheSearchInput={this.getTheSearchInput} />
        {this.renderTheSuccessView()}
      </>
    )
  }
}

export default SingleMovieDetails
