import MovieItem from './MovieItem';
import React from 'react';

export default class RatedPage extends React.PureComponent {
  render() {
    const { rated, handleCardRate } = this.props;
    return (
      <section className="card-items">
        {rated.map((el) => (
          <MovieItem
            key={el.id}
            backdropPath={el.backdrop_path}
            originalTitle={el.original_title}
            releaseDate={el.release_date}
            voteAverage={el.vote_average}
            overview={el.overview}
            handleCardRate={handleCardRate}
            id={el.id}
          />
        ))}
      </section>
    );
  }
}
