/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './node-content-renderer.module.css';
import clsx from 'clsx';

function isDescendant(older, younger) {
  return (
    !!older.children &&
    typeof older.children !== 'function' &&
    older.children.some(
      child => child === younger || isDescendant(child, younger)
    )
  );
}

// eslint-disable-next-line react/prefer-stateless-function
class FileThemeNodeContentRenderer extends Component {
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      icons,
      buttons,
      className,
      style,
      didDrop,
      lowerSiblingCounts,
      listIndex,
      swapFrom,
      swapLength,
      swapDepth,
      treeId, // Not needed, but preserved for other renderers
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      rowDirection, // Not needed, but preserved for other renderers
      onClickNode,
      selected,
      ...otherProps
    } = this.props;
    let nodeTitle = title || node.title;
    if (typeof nodeTitle === 'function') {
      nodeTitle = nodeTitle({ node, path, treeIndex });
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;
    const hasChildren = node.children && node.children.length > 0;
    const onClickrowContents = typeof onClickNode === 'function' ? onClickNode : () => { };

    const toggleExpanded = (event) => {
      toggleChildrenVisibility({
        node,
        path,
        treeIndex,
      });
      event.stopPropagation();
    };

    // Construct the scaffold representing the structure of the tree
    const scaffold = [];
    lowerSiblingCounts.forEach((lowerSiblingCount, i) => {
      scaffold.push(
        <div
          key={`pre_${1 + i}`}
          style={{ width: scaffoldBlockPxWidth }}
          className={styles.lineBlock}
        />
      );

      if (treeIndex !== listIndex && i === swapDepth) {
        // This row has been shifted, and is at the depth of
        // the line pointing to the new destination
        let highlightLineClass = '';

        if (listIndex === swapFrom + swapLength - 1) {
          // This block is on the bottom (target) line
          // This block points at the target block (where the row will go when released)
          highlightLineClass = styles.highlightBottomLeftCorner;
        } else if (treeIndex === swapFrom) {
          // This block is on the top (source) line
          highlightLineClass = styles.highlightTopLeftCorner;
        } else {
          // This block is between the bottom and top
          highlightLineClass = styles.highlightLineVertical;
        }

        scaffold.push(
          <div
            key={`highlight_${1 + i}`}
            style={{
              width: scaffoldBlockPxWidth,
              left: scaffoldBlockPxWidth * i,
            }}
            className={`${styles.absoluteLineBlock} ${highlightLineClass}`}
          />
        );
      }
    });

    const nodeContent = (
      <div
        style={{ height: '100%' }}
        {...otherProps}
      >
        <div
          className={clsx(
            styles.rowWrapper,
            {
              [styles.rowWrapperDragDisabled]: !canDrag,
              [styles.rowSelected]: selected && !isLandingPadActive,
              [styles.rowWrapperLandingPadActive]: isLandingPadActive,
            }
          )}
          onClick={onClickrowContents}
        >
          {/* Set the row preview to be used during drag and drop */}
          {connectDragPreview(
            <div style={{ display: 'flex', height: '100%' }}>
              {scaffold}
              <div
                className={clsx(
                  styles.row,
                  {
                    [styles.rowLandingPad]: isLandingPadActive,
                    [styles.rowCancelPad]: isLandingPadActive && !canDrop,
                    [styles.rowSearchMatch]: isSearchMatch,
                    [styles.rowSearchFocus]: isSearchFocus,
                    [className]: className
                  }
                )}
                style={{
                  opacity: isDraggedDescendant ? 0.5 : 1,
                  ...style,
                }}
              >
                {
                  hasChildren && (
                    <div
                      className={clsx(
                        styles.toolbarButton,
                        styles.arrowContainer
                      )}
                      onClick={toggleExpanded}
                    >
                      <span
                        className={clsx(
                          styles.arrow,
                          node.expanded ? styles.down : styles.right
                        )}
                      />
                    </div>
                  )
                }
                <div
                  className={clsx(
                    styles.rowContents,
                    {
                      [styles.rowContentsDragDisabled]: !canDrag
                    }
                  )}
                >
                  <div className={styles.rowToolbar}>
                    {icons.map((icon, index) => (
                      <div
                        key={index} // eslint-disable-line react/no-array-index-key
                        className={styles.toolbarButton}
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                  <div className={styles.rowLabel}>
                    <span className={styles.rowTitle}>
                      {nodeTitle}
                    </span>
                  </div>

                  <div className={styles.rowToolbar}>
                    {buttons.map((btn, index) => (
                      <div
                        key={index} // eslint-disable-line react/no-array-index-key
                        className={styles.toolbarButton}
                      >
                        {btn}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );

    return canDrag ? connectDragSource(nodeContent, { dropEffect: 'copy' }) : nodeContent;
  }
}

FileThemeNodeContentRenderer.defaultProps = {
  buttons: [],
  canDrag: false,
  canDrop: false,
  className: '',
  draggedNode: null,
  icons: [],
  isSearchFocus: false,
  isSearchMatch: false,
  parentNode: null,
  style: {},
  swapDepth: null,
  swapFrom: null,
  swapLength: null,
  title: null,
  toggleChildrenVisibility: null,
  onClickNode: null,
};

FileThemeNodeContentRenderer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  canDrag: PropTypes.bool,
  className: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.node),
  isSearchFocus: PropTypes.bool,
  isSearchMatch: PropTypes.bool,
  listIndex: PropTypes.number.isRequired,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  node: PropTypes.shape({
    expanded: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    children: PropTypes.instanceOf(Array)
  }).isRequired,
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
  swapDepth: PropTypes.number,
  swapFrom: PropTypes.number,
  swapLength: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  toggleChildrenVisibility: PropTypes.func,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,
  rowDirection: PropTypes.string.isRequired,

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  isDragging: PropTypes.bool.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  // Drop target
  canDrop: PropTypes.bool,
  isOver: PropTypes.bool.isRequired,

  // custom
  onClickNode: PropTypes.func,
  selected: PropTypes.bool
};

export default FileThemeNodeContentRenderer;
