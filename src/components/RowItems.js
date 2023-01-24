/* eslint-disable */

import MovieItem from './MovieItem';
import Spin from './Spin';
import React from 'react';
import 'antd/dist/reset.css';
import { Pagination } from 'antd';

class RowItems extends React.PureComponent {
  render() {
    const {
      movieData,
      paginationClick,
      isLoad,
      isEmpty,
      number,
      handleCardRate,
      genres,
    } = this.props;
    return isLoad ? (
      <Spin />
    ) : (
      <>
        {isEmpty ? (
          <div className="search_mistaken">
            Sorry :(, could you rephrase your request, we cant find
            smth
          </div>
        ) : (
          <>
            <section className="card-items">
              {movieData.map((el) => (
                <MovieItem
                  key={el.id}
                  backdropPath={el.backdrop_path}
                  originalTitle={el.original_title}
                  releaseDate={el.release_date}
                  voteAverage={el.vote_average}
                  overview={el.overview}
                  handleCardRate={handleCardRate}
                  id={el.id}
                  genres={genres}
                />
              ))}
            </section>
            <Pagination
              defaultCurrent={number}
              total={500}
              className="pagination"
              onChange={(current) => paginationClick(current)}
            />
          </>
        )}
      </>
    );
  }
}
export default RowItems;
