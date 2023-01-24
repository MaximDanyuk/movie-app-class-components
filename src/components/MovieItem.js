/* eslint-disable */

import GenreMovieContext from '../contexts/GenreMovieContext';
import noImage from '../images/noimage.png';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Rate, Descriptions, Card, Tag } from 'antd';

const { Meta } = Card;

class MovieItem extends React.PureComponent {
  render() {
    const {
      originalTitle,
      releaseDate,
      overview,
      handleCardRate,
      backdropPath,
      voteAverage,
      id,
      genres,
    } = this.props;

    const contextType = GenreMovieContext._currentValue;

    const currentGenresObject = contextType.filter(
      (el) => el.id === id,
    );
    const currentGenresArrayKeys = currentGenresObject.map(
      (el) => el.genre,
    );

    const currentGenresArray = [];
    /*   console.log(currentGenresArrayKeys[0].length); */
    for (let i = 0; i < genres.length; i++) {
      for (let j = 0; j < currentGenresArrayKeys[0].length; j++) {
        if (currentGenresArrayKeys[0][j] === genres[i].id) {
          currentGenresArray.push(genres[i].name);
        }
      }
    }

    const color = `circle-rate ${
      voteAverage > 0 && voteAverage <= 3
        ? 'circle-rate_red'
        : voteAverage > 3 && voteAverage <= 5
        ? 'circle-rate_yellow'
        : voteAverage > 5 && voteAverage <= 7
        ? 'circle-rate_yellow-lite'
        : 'circle-rate_green'
    }`;

    const imageSrc = backdropPath
      ? `https://image.tmdb.org/t/p/original/${backdropPath}`
      : noImage;
    return (
      <Card hoverable className="card">
        <div className="card__image">
          <LazyLoadImage
            src={imageSrc}
            loading="lazy"
            alt={originalTitle}
            effect="blur"
            placeholderSrc={imageSrc}
          />
        </div>

        <div className="card__info">
          <div className="card__title-area">
            <h3>{originalTitle}</h3>
            <div className={color}>
              <span>{voteAverage}</span>
            </div>
          </div>
          <p className="card__date">{releaseDate}</p>
          <div className="card__tags">
            {currentGenresArray.map((el) => (
              <Tag>
                <a href="https://github.com/ant-design/ant-design/issues/1862">
                  {el}
                </a>
              </Tag>
            ))}
          </div>
        </div>

        <div className="card__description">
          <Descriptions.Item label="Address">
            {overview}
          </Descriptions.Item>
        </div>

        <Rate
          defaultValue={0}
          count="10"
          className="stars"
          onChange={(value) => handleCardRate(id, value)}
        />
      </Card>
    );
  }
}

export default MovieItem;
