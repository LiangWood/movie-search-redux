import React, { useState, useEffect } from 'react';
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

  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then( response =>　response.json())
      .then( jsonResponse => {
        // console.log(jsonResponse.Search)
        setMovies(jsonResponse.Search)
        setLoading(false)
      })
  }, [])

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=89a1bd51`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  	};

  return (
    <div className="App">
      <Header text="MOVIES SEARCH" />
      <Search search={search} />
      <p className={`App-intro, ${classes.text}`}>Sharing a few of our favourite movies</p>
      <Container maxWidth="lg" className={classes.container}>
        <div className="movies">
          {loading && !errorMessage ? (
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
          }
        </div>
      </Container>
      <Footer />
    </div>
  );

}

export default App;
