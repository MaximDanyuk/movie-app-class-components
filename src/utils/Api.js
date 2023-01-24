/* eslint-disable */

class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    Promise.reject({
      message: `Усп, что-то пошло не так, уже решаем  ${res.status}`,
    });
  }

  getPopularMovies({ page }) {
    return fetch(
      `${this._url}/movie/popular?api_key=9e5c75ffd938a1f31a2794138fa3d88b&language=en-US&page=${page}`,
    ).then((res) => this._checkResponse(res));
  }

  getSearchMovies({ query, page }) {
    return fetch(
      `${this._url}/search/movie?api_key=9e5c75ffd938a1f31a2794138fa3d88b&language=en-US&query=${query}&page=${page}`,
    ).then((res) => this._checkResponse(res));
  }

  setRate(guestId, id, rate) {
    return fetch(
      `${this._url}/movie/${id}/rating?api_key=9e5c75ffd938a1f31a2794138fa3d88b&guest_session_id=${guestId}`,
      {
        headers: {
          method: 'PUT',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ value: rate }),
      },
    ).then((res) => this._checkResponse(res));
  }

  getRated(guestId) {
    return fetch(
      `${this._url}/guest_session/${guestId}/rated/movies?api_key=9e5c75ffd938a1f31a2794138fa3d88b&language=en-US&sort_by=created_at.asc`,
    ).then((res) => this._checkResponse(res));
  }

  getGenres() {
    return fetch(
      `${this._url}/genre/movie/list?api_key=9e5c75ffd938a1f31a2794138fa3d88b&language=en-US`,
    ).then((res) => this._checkResponse(res));
  }

  getSession() {
    return fetch(
      `${this._url}/authentication/guest_session/new?api_key=9e5c75ffd938a1f31a2794138fa3d88b`,
    ).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.themoviedb.org/3',
});

export default api;
