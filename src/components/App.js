import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../store/reducer/index';

import { Container, Card } from '@material-ui/core';
import '../App.css';

import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Search from './Search';
import Movie from './Movie';
import Footer from './Footer';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=89a1bd51";

const useStyles = makeStyles( grid => ({
  card: {
    boxShadow: 'none'
  },
  grid: {
    padding: '1.75%'
  },
  text: {
    color: '#666'
  },
  container: {
    minHeight: `calc(100vh - 259px)`
  }
}))

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const classes = useStyles()

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then( response =>　response.json())
      .then( jsonResponse => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search
        })
      })
  }, [])

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=89a1bd51`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search
          })
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const refreshPage = () => {
    window.location.reload()
  }

  const { movies, errorMessage, loading } = state;

  const getMovies = 
  loading && !errorMessage ? (
    <span>loading...</span>) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Card className={`${classes.card} ${classes.grid}`} key={`${index}-${movie.title}`} >
          <Movie movie={movie} />
        </Card>
      )
      )
    )  

  return (
    <div className="App">
      <Header text="MOVIES SEARCH" refresh={refreshPage} />
      <Search search={search} />
      <p className={`App-intro, ${classes.text}`}>Sharing a few of our favourite movies</p>
      <Container maxWidth="lg" className={classes.container}>
        <div className="movies">
          {getMovies}
        </div>
      </Container>
      <Footer />
    </div>
  );

}

export default App;
