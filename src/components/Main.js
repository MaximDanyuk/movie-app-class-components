import RowItems from './RowItems';
import Search from './Search';
import RatedPage from './RatedPage';
import SectionButtons from './SectionButtons';
import React from 'react';

class Main extends React.PureComponent {
  render() {
    const {
      movieData,
      paginationClick,
      isLoad,
      isEmpty,
      number,
      debouncedShowSearchData,
      handleCardRate,
      section,
      handleChangeSection,
      rated,
      genres,
    } = this.props;
    return (
      <main className="main page__main">
        <SectionButtons handleChangeSection={handleChangeSection} />
        {section === 'search' ? (
          <>
            <Search
              debouncedShowSearchData={debouncedShowSearchData}
            />
            <RowItems
              movieData={movieData}
              isEmpty={isEmpty}
              paginationClick={paginationClick}
              isLoad={isLoad}
              number={number}
              handleCardRate={handleCardRate}
              genres={genres}
            />
          </>
        ) : (
          <RatedPage rated={rated} genres={genres} />
        )}
      </main>
    );
  }
}

export default Main;
