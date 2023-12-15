import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'PROCESS',
  failure: 'FAIL',
}

class SearchedMovies extends Component {
  state = {
    homeMovieList: [],
    status: apiStatus.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getTheMovieData()
  }

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
  })

  getTheMovieData = async () => {
    const {searchInput} = this.state
    const apiKey = 'd69c7e5016c1d973fd6a3615ce35e5ae'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1` // url
    this.setState({status: apiStatus.inProcess})
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.results.map(each =>
        this.getTheFormattedData(each),
      )
      console.log(data)

      console.log(formattedData)
      this.setState({homeMovieList: formattedData, status: apiStatus.success})
    }
  }

  getTheSearchInput = value => {
    this.setState({searchInput: value})
  }

  renderTheLoaderView = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderTheSuccessView = () => {
    const {homeMovieList} = this.state
    return (
      <div>
        <ul className="movie-list">
          {homeMovieList.map(each => (
            <MovieItem key={each.id} movieDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderTheHomePage = () => {
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

  render() {
    const {searchInput} = this.state
    console.log(searchInput)
    return (
      <>
        <Header getTheSearchInput={this.getTheSearchInput} />
        {this.renderTheHomePage()}
      </>
    )
  }
}

export default SearchedMovies
