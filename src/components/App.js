/* eslint-disable */

import Main from './Main';
import CheckConnection from './CheckConnection';
import api from '../utils/Api';
import GenreMovieContext from '../contexts/GenreMovieContext';
import React from 'react';

class App extends React.PureComponent {
  state = {
    movieData: [], /// setMovieData
    isLoad: true, /// setIsLoad
    isEmpty: false, /// setIsEmpty
    number: 1, /// SetNumber
    section: 'search', /// setSection
    genreMovie: [], /// setGenreMovie
    autorKey: 0,
    rated: [],
    genres: [],
  };
  componentDidMount() {
    const { autorKey } = this.state;
    this.setState({
      autorKey: JSON.parse(localStorage.getItem('autorKey')) || 0,
    });

    this.setState({
      isLoad: true,
    });
    api
      .getPopularMovies({ page: 1 })
      .then((findMovies) => {
        this.setState({
          movieData: findMovies.results,
        });

        const genres = findMovies.results.map((el) => ({
          genre: el.genre_ids,
          id: el.id,
        }));

        this.setState({
          genreMovie: genres,
        });
      })
      .catch(() => 'Ошибка на стороне сервера, уже решаем')
      .finally(() => {
        this.setState({
          isLoad: false,
        });
      });

    api
      .getGenres()
      .then((data) => this.setState({ genres: data.genres }));

    if (autorKey.length === 0) {
      api.getSession().then((data) => {
        this.setState({ autorKey: data.guest_session_id }),
          localStorage.setItem(
            'autorKey',
            JSON.stringify(data.guest_session_id),
          );
      });
    }
  }

  handleCardRate = (id, value) => {
    const { autorKey } = this.state;

    api
      .setRate(autorKey, id, value)
      .catch(() => 'Ошибка на стороне сервера, уже решаем');
  };

  handleChangeSection = (key) => {
    const { autorKey } = this.state;
    this.setState({
      section: key,
    });
    if (key === 'rated') {
      api
        .getRated(autorKey)
        .then((data) => this.setState({ rated: data.results }));
    }
  };

  handleSearchMovie = (query, page) => {
    this.setState({
      isLoad: true,
    });
    return api
      .getSearchMovies({ query, page })
      .then((findMovies) => {
        if (!findMovies.results.length) {
          this.setState({
            isEmpty: true,
          });
        } else {
          this.setState({
            movieData: findMovies.results,
            isEmpty: false,
          });

          const genres = findMovies.results.map((el) => ({
            genre: el.genre_ids,
            id: el.id,
          }));

          this.setState({
            genreMovie: genres,
          });
        }
      })
      .catch(() => 'Ошибка на стороне сервера, уже решаем')
      .finally(() => {
        this.setState({
          isLoad: false,
        });
      });
  };

  paginationClick = (page) => {
    this.setState({
      isLoad: true,
    });
    api
      .getPopularMovies({ page })
      .then((findMovies) => {
        this.setState({
          movieData: findMovies.results,
        });
      })
      .then(() => {
        window.scrollTo(0, 0);
        this.setState({
          number: page,
        });
      })
      .catch(() => 'Ошибка на стороне сервера, уже решаем')
      .finally(() => {
        this.setState({
          isLoad: false,
        });
      });
  };

  debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  };

  render() {
    const debouncedShowSearchData = this.debounce((text) => {
      if (text.length) {
        this.handleSearchMovie(text, 1);
      }
    }, 350);

    const {
      genreMovie,
      movieData,
      isLoad,
      isEmpty,
      number,
      section,
      setSection,
      rated,
      genres,
    } = this.state;
    return (
      <CheckConnection>
        <GenreMovieContext.Provider value={genreMovie}>
          <Main
            rated={rated}
            genres={genres}
            debouncedShowSearchData={debouncedShowSearchData}
            movieData={movieData}
            paginationClick={this.paginationClick}
            isLoad={isLoad}
            isEmpty={isEmpty}
            number={number}
            handleCardRate={this.handleCardRate}
            setSection={setSection}
            section={section}
            handleChangeSection={this.handleChangeSection}
          />
        </GenreMovieContext.Provider>
      </CheckConnection>
    );
  }
}

export default App;
