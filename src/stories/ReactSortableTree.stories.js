import React from 'react';
import ReactSortableTree from '../components/index';
import BlankA from './BlankA';
import FormLabel from './FormLabel';

export default {
  title: 'Virtualized/Reactsortabletree',
  component: ReactSortableTree,
  argTypes: {

  },
};

const getTreeData = (rowCount) => {
  const data = [];
  const treeData = [
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
        },
        {
          id: 'item-21',
          title: 'item 21'
        },
        {
          id: 'item-22',
          title: 'item 22'
        },
      ],
    },
  ];

  for (let i = 0; i < rowCount; i += 1) {
    data.push(treeData[i] || {
      id: `item-${i}`,
      title: `item ${i}`
    })
  }

  return data;
}

const generateNodeProps = (rowInfo) => {
  const icons = [
    rowInfo.node.isDirectory ? (
      <div
        style={{
          borderLeft: 'solid 8px gray',
          borderBottom: 'solid 10px gray',
          marginRight: 10,
          boxSizing: 'border-box',
          width: 16,
          height: 12,
          filter: rowInfo.node.expanded ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)' : 'none',
          borderColor: rowInfo.node.expanded ? 'white' : 'gray',
        }}
      />
    ) : (
      <div
        style={{
          border: 'solid 1px black',
          fontSize: 8,
          textAlign: 'center',
          marginRight: 10,
          width: 12,
          height: 16,
        }}
      >
        F
      </div>
    )
  ];

  const buttons = [(
    <button
      style={{
        padding: 0,
        borderRadius: '100%',
        backgroundColor: 'gray',
        color: 'white',
        width: 16,
        height: 16,
        border: 0,
        fontWeight: 100,
      }}
    >
      i
    </button>
  )];

  return {
    icons,
    buttons,
  }
}

const Template = (args) => {
  const [treeData, onChange] = React.useState(args.treeData);
  const [value, setValue] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchFoundCount, setSearchFoundCount] = React.useState(null);
  const [searchFocusOffset, setSearchFocusOffset] = React.useState(0);
  const [customNode, setCustomNode] = React.useState(false);

  const selectPrevMatch = () => {
    let newSearchFocusOffset = searchFoundCount - 1;
    if (searchFocusOffset !== null) {
      newSearchFocusOffset = (searchFoundCount + searchFocusOffset - 1) % searchFoundCount;
    }
    setSearchFocusOffset(newSearchFocusOffset);
  }

  const selectNextMatch = () => {
    let newSearchFocusOffset = 0;
    if (searchFocusOffset !== null) {
      newSearchFocusOffset = (searchFocusOffset + 1) % searchFoundCount;
    }
    setSearchFocusOffset(newSearchFocusOffset);
  }

  const searchFinishCallback = matches => {
    setSearchFoundCount(matches.length);
    setSearchFocusOffset(matches.length > 0 ? searchFocusOffset % matches.length : 0);
  }

  const searchOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      selectNextMatch();
    }
  }

  return (
    <div>
      <BlankA
        path="https://github.com/bonnv79/react-sortable-tree-node/blob/master/src/stories/ReactSortableTree.stories.js"
      >
        Source
      </BlankA>

      <FormLabel label="custom generateNodeProps">
        <input type="checkbox" checked={customNode} onChange={() => setCustomNode(!customNode)} />
      </FormLabel>
      <FormLabel label="searchQuery">
        <div style={{ display: 'inline-block' }}>
          <input
            id="find-box"
            type="text"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            onKeyDown={searchOnKeyDown}
          />
          <div style={{ display: 'inline-block', margin: '0 8px' }}>
            <button disabled={!searchFoundCount} onClick={selectPrevMatch}>
              &lt;
            </button>
            <button disabled={!searchFoundCount} onClick={selectNextMatch}>
              &gt;
            </button>
          </div>
          <span>
            {`${searchFoundCount > 0 ? searchFocusOffset + 1 : 0} / ${searchFoundCount || 0}`}
          </span>
        </div>
      </FormLabel>

      <div style={{ width: '100%', height: 300 }}>
        <ReactSortableTree
          {...args}
          treeData={treeData}
          onChange={onChange}
          value={value.id}
          onClick={setValue}
          searchQuery={searchQuery}
          searchFocusOffset={searchFocusOffset}
          searchFinishCallback={searchFinishCallback}
          generateNodeProps={customNode ? generateNodeProps : undefined}
        />
      </div>
    </div>
  )
};

export const _Reactsortabletree = Template.bind({});
_Reactsortabletree.args = {
  treeData: getTreeData(20),
  expanded: false,
  maxDepth: undefined
};
