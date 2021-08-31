import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from './FileExplorerTheme/index';

/**
 * 
 * @param { isOver, canDrop } props 
 * @returns 
 */
const PlaceholderRendererDefault = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      No data found
    </div>
  );
};

/**
* 
* @param {node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus} rowInfo 
* @returns func or bool
*/
const canDrag = ({ node }) => !node.dragDisabled;

/**
* 
* @param {node, prevPath, prevParent, prevTreeIndex, nextPath, nextParent, nextTreeIndex} rowInfo 
* @returns func
*/
const canDrop = ({ nextParent }) => (!nextParent || !nextParent.dropDisabled);

/**
* 
* @param {treeData, node, nextParentNode, prevPath, prevTreeIndex, path, treeIndex} rowInfo 
* @returns void
*/
const onMoveNode = () => { };

/**
* 
* @param {treeData, node, expanded, path} rowInfo 
* @returns void
*/
const onVisibilityToggle = () => { };

class ReactSortableTree extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.expanded !== prevProps.expanded) {
      this.updateTreeData(toggleExpandedForAll({
        treeData: this.props.treeData,
        expanded: this.props.expanded,
      }));
    }
  }

  updateTreeData = (treeData) => {
    const { onChange } = this.props;
    onChange(treeData);
  }

  /**
   * 
   * @param {node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus} rowInfo 
   * @returns void
   */
  onClickNode = (rowInfo) => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick({ ...rowInfo, id: rowInfo.node.id });
    }
  }

  /**
   * 
   * @param {node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus} rowInfo 
   * @returns object
   */
  generateNodeProps = rowInfo => {
    const { value, generateNodeProps } = this.props;
    const props = typeof generateNodeProps === 'function' ? generateNodeProps(rowInfo) : {};
    const selected = rowInfo.node.id === value;

    return {
      onClickNode: () => {
        this.onClickNode(rowInfo);
      },
      selected,
      ...props,
    };
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      onClick, // remove from props
      // eslint-disable-next-line no-unused-vars
      value, // remove from props
      // eslint-disable-next-line no-unused-vars
      expanded, // remove from props
      ...props
    } = this.props;

    return (
      <SortableTree
        {...props}
        onChange={this.updateTreeData}
        generateNodeProps={this.generateNodeProps}
      />
    );
  }
}

ReactSortableTree.defaultProps = {
  style: undefined,
  innerStyle: { outline: 'none' },
  theme: FileExplorerTheme,
  expanded: null,
  searchQuery: '',
  searchFocusOffset: undefined,
  value: '',
  maxDepth: undefined,
  rowHeight: 30,
  scaffoldBlockPxWidth: 28,
  placeholderRenderer: PlaceholderRendererDefault,
  className: undefined,
  treeData: [],
  onChange: undefined,
  onClick: undefined,
  searchFinishCallback: undefined,
  generateNodeProps: null,
  onMoveNode,
  onVisibilityToggle,
  canDrag,
  canDrop,
};

ReactSortableTree.propTypes = {
  style: PropTypes.instanceOf(Object),
  innerStyle: PropTypes.instanceOf(Object),
  theme: PropTypes.instanceOf(Object),
  expanded: PropTypes.bool,
  searchQuery: PropTypes.string,
  searchFocusOffset: PropTypes.number,
  value: PropTypes.string,
  maxDepth: PropTypes.number,
  rowHeight: PropTypes.number,
  scaffoldBlockPxWidth: PropTypes.number,
  placeholderRenderer: PropTypes.any,
  className: PropTypes.string,
  treeData: PropTypes.arrayOf(Object),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  searchFinishCallback: PropTypes.func,
  generateNodeProps: PropTypes.func,
  onMoveNode: PropTypes.func,
  onVisibilityToggle: PropTypes.func,
  canDrag: PropTypes.func,
  canDrop: PropTypes.func,
};

export default ReactSortableTree;
export { ReactSortableTree };
