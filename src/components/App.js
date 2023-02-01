/* eslint-disable */

import Main from './Main';
import CheckConnection from './CheckConnection';
import api from '../utils/Api';
import GenreMovieContext from '../contexts/GenreMovieContext';
import React from 'react';

class App extends React.PureComponent {
  state = {
    movieData: [],
    isLoad: true,
    isEmpty: false,
    number: 1,
    section: 'search',
    genresNames: [],
    autorKey: 0,
    rated: [],
    movieGrade: [],
  };

  getPopularMoviesFunction = () => {
    this.setState({
      isLoad: true,
    });
    api
      .getPopularMovies({ page: 1 })
      .then((findMovies) =>
        this.setState({ movieData: findMovies.results }),
      )
      .catch(() => 'Ошибка на стороне сервера, уже решаем')
      .finally(() => {
        this.setState({
          isLoad: false,
        });
      });
  };
  /*  */
  /*  */
  /*  */
  /*  */
  /*  */
  /*  */
  /*  */
  componentDidMount() {
    this.setState({
      movieGrade:
        JSON.parse(localStorage.getItem('movieGrade')) || [],
    });

    this.getPopularMoviesFunction();
    api
      .getGenres()
      .then((data) => {
        this.setState({ genresNames: data.genres });
        /*     console.log(data.genres); */
      })
      .catch(() => 'Ошибка на стороне сервера, уже решаем');
  }

  /*  */
  /*  */
  /*  */
  /*  */

  handleCardRate = (id, value) => {
    const { autorKey, movieGrade } = this.state;
    api
      .setRate(autorKey, id, value)
      .then((data) => {
        if (movieGrade.some((el) => el.id === id)) {
          const newRated = movieGrade.filter((el) => {
            if (el.id === id) {
              el.value = value;
            }
            return el;
          });
          this.setState({ movieGrade: newRated });
        } else {
          const movieGradeItem = {};
          movieGradeItem.id = id;
          movieGradeItem.value = value;
          this.setState(({ movieGrade }) => {
            return { movieGrade: [movieGradeItem, ...movieGrade] };
          });
        }
      })
      .catch(() => 'Ошибка на стороне сервера, уже решаем');
  };

  componentDidUpdate(prevProps, prevstate) {
    const { movieGrade } = this.state;
    if (
      JSON.stringify(movieGrade) !=
      JSON.stringify(localStorage.getItem('movieGrade'))
    ) {
      localStorage.setItem('movieGrade', JSON.stringify(movieGrade));
    }

    const { autorKey } = this.state;

    this.setState({
      autorKey: JSON.parse(localStorage.getItem('autorKey')),
    });
    if (!autorKey && autorKey !== 0) {
      api
        .getSession()
        .then((data) => {
          this.setState({ autorKey: data.guest_session_id });
          localStorage.setItem(
            'autorKey',
            JSON.stringify(data.guest_session_id),
          );
        })
        .catch(() => 'Ошибка на стороне сервера, уже решаем');
    }
  }

  handleChangeSection = (key) => {
    const { autorKey } = this.state;
    this.setState({
      isLoad: true,
    });
    this.setState({
      section: key,
    });
    if (key === 'rated') {
      api
        .getRated(autorKey)
        .then((data) => {
          this.setState({ rated: data.results });
        })
        .catch(() => 'Ошибка на стороне сервера, уже решаем')
        .finally(() => {
          this.setState({
            isLoad: false,
          });
        });
    } else {
      this.getPopularMoviesFunction();
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
      text = text.trim();
      if (text.length) {
        this.handleSearchMovie(text, 1);
      }
    }, 350);

    const {
      genresNames,
      movieData,
      isLoad,
      isEmpty,
      number,
      section,
      rated,
      movieGrade,
    } = this.state;

    return (
      <CheckConnection>
        <GenreMovieContext.Provider value={genresNames}>
          <Main
            movieGrade={movieGrade}
            rated={rated}
            debouncedShowSearchData={debouncedShowSearchData}
            movieData={movieData}
            paginationClick={this.paginationClick}
            isLoad={isLoad}
            isEmpty={isEmpty}
            number={number}
            handleCardRate={this.handleCardRate}
            section={section}
            handleChangeSection={this.handleChangeSection}
          />
        </GenreMovieContext.Provider>
      </CheckConnection>
    );
  }
}

export default App;
