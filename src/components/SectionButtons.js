/* eslint-disable */
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

/// сами кнопки
const items: TabsProps['items'] = [
  {
    key: 'search',
    label: `search`,
  },
  {
    key: 'rated',
    label: `rated`,
  },
];

/// секция
const SectionButtons: React.FC = ({ handleChangeSection }) => (
  <Tabs
    defaultActiveKey="1"
    items={items}
    onChange={(key) => handleChangeSection(key)}
    className="tabs"
  />
);

export default SectionButtons;
