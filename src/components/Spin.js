import { Spin } from 'antd';
import React from 'react';

export default class Spinner extends React.PureComponent {
  render() {
    return (
      <div className="spinner">
        <Spin />
      </div>
    );
  }
}
