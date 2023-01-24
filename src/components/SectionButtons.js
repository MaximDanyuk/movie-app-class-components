/* eslint-disable */
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

/// сами кнопки
const items: TabsProps['items'] = [
  {
    key: 'search',
    label: `search`,
    /*     children: `Content of Tab Pane 1`, */
  },
  {
    key: 'rated',
    label: `rated`,
    /*     children: `Content of Tab Pane 2`, */
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
