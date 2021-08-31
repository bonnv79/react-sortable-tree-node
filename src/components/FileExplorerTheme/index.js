// Can override the following:
//
// style: PropTypes.shape({}),
// innerStyle: PropTypes.shape({}),
// reactVirtualizedListProps: PropTypes.shape({}),
// scaffoldBlockPxWidth: PropTypes.number,
// slideRegionSize: PropTypes.number,
// rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
// treeNodeRenderer: PropTypes.func,
// nodeContentRenderer: PropTypes.func,
// placeholderRenderer: PropTypes.func,

import nodeContentRenderer from './node-content-renderer';
import treeNodeRenderer from './tree-node-renderer';

const FileExplorerTheme = {
  nodeContentRenderer,
  treeNodeRenderer,
  scaffoldBlockPxWidth: 25,
  rowHeight: 25,
  slideRegionSize: 50,
};

export default FileExplorerTheme;
