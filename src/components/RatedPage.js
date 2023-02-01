/* eslint-disable */
import MovieItem from './MovieItem';
import React from 'react';

export default class RatedPage extends React.PureComponent {
  render() {
    const { rated, handleCardRate, movieGrade } = this.props;
    return (
      <section className="card-items">
        {rated.map((el) => (
          <MovieItem
            key={el.id}
            handleCardRate={handleCardRate}
            movieGrade={movieGrade}
            {...el}
          />
        ))}
      </section>
    );
  }
}
