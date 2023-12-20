import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PopularMoviesPage from './components/PopularMoviesPage'
import TopRatedMoviesPage from './components/TopRatedMoviesPage'
import UpcomingMoviesPage from './components/UpcomingMoviesPage'
import './App.css'
import SingleMovieDetails from './components/SingleMovieDetails'

// write your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={PopularMoviesPage} />
      <Route exact path="/top-rated" component={TopRatedMoviesPage} />
      <Route exact path="/upcoming" component={UpcomingMoviesPage} />
      <Route exact path="/movie/:id" component={SingleMovieDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
