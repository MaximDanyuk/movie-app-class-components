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
      movieGrade,
      moviesTotalLength,
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
                  movieGrade={movieGrade}
                  key={el.id}
                  handleCardRate={handleCardRate}
                  {...el}
                />
              ))}
            </section>
            <Pagination
              defaultCurrent={number}
              total={
                moviesTotalLength > 500 ? 500 : moviesTotalLength
              }
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
