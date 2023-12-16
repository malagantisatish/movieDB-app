import {Component} from 'react'
// import {CiSquarePlus, CiSquareMinus} from 'react-icons/ci'
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

class Home extends Component {
  state = {
    homeMovieList: [],
    status: apiStatus.initial,
    isSearch: false,
    searchInput: 'search',
    pageNo: 1,
  }

  componentDidMount() {
    this.getPopularMoviesURL()
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

  getPopularMoviesURL = async () => {
    const {searchInput, isSearch, pageNo} = this.state
    const apiKey = 'd69c7e5016c1d973fd6a3615ce35e5ae'
    const normalUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNo}` // url
    // const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1`
    // const url = isSearch ? searchUrl : normalUrl
    this.setState({status: apiStatus.inProcess})
    const response = await fetch(normalUrl)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.results.map(each =>
        this.getTheFormattedData(each),
      )
      // console.log(data)

      console.log(formattedData)
      this.setState({homeMovieList: formattedData, status: apiStatus.success})
    }
  }

  increaseThePageCount = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      this.getPopularMoviesURL,
    )
  }

  decreaseThePageCount = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getPopularMoviesURL,
      )
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

  renderThePagination = () => {
    const {pageNo} = this.state
    return (
      <div className="pagination">
        <button
          type="button"
          className="btn"
          onClick={this.decreaseThePageCount}
        >
          -
        </button>
        <p>{pageNo}</p>
        <button
          type="button"
          className="btn"
          onClick={this.increaseThePageCount}
        >
          +
        </button>
      </div>
    )
  }

  renderTheSuccessView = () => {
    const {homeMovieList} = this.state
    return (
      <div>
        <ul className="movie-list">
          {homeMovieList.map(each => (
            <MovieItem key={each.id} movieDetails={each} />
          ))}
        </ul>
        {this.renderThePagination()}
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

export default Home
