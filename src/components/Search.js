/* eslint-disable */

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';

class Search extends React.PureComponent {
  state = {
    inputValue: '', /// setInputValue
  };

  handleInputValue = (evt) => {
    const { debouncedShowSearchData } = this.props;

    const temp = evt.target.value.length;
    let old = '';
    /// change the results if new values
    if (evt.target.value.length === 0 || temp !== old) {
      this.setState({
        inputValue: '',
      });
    }
    old = temp;
    debouncedShowSearchData(evt.target.value);

    this.setState({
      inputValue: evt.target.value,
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Input
        type="search"
        size="large"
        placeholder="Type to search"
        prefix={<SearchOutlined />}
        className="search"
        value={inputValue}
        onChange={(evt) => this.handleInputValue(evt)}
      />
    );
  }
}
export default Search;
