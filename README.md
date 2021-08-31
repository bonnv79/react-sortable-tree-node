# react-sortable-tree-node

> react-sortable-tree-node

[![NPM](https://img.shields.io/npm/v/react-sortable-tree-node.svg)](https://www.npmjs.com/package/react-sortable-tree-node) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-sortable-tree-node
```

## Demo
Demo and playground are available [here](https://bonnv79.github.io/react-sortable-tree-node/)

## Versions
[CHANGELOG](CHANGELOG.md)

## Usage Example
```JavaScript
import React from 'react';
import ReactSortableTreeNode from 'react-sortable-tree-node';

const data = [
  {
    id: 'item-0',
    title: 'item 0',
    dropDisabled: true,
    dragDisabled: true
  },
  {
    id: 'item-1',
    title: ({ node, path, treeIndex }) => {
      return `item 1 - treeIndex ${treeIndex}`
    }
  },
  {
    id: 'item-2',
    title: 'item 2',
    expanded: true,
    isDirectory: true,
    children: [
      {
        id: 'item-20',
        title: 'item 20'
      }
    ],
  },
];

const [treeData, onChange] = React.useState(data);
<ReactSortableTreeNode treeData={treeData} onChange={onChange} />
```

## Develop

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## License

MIT © [bonnv79](https://github.com/bonnv79)
