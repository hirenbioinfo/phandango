import merge from 'lodash/object/merge';
import { combineReducers } from 'redux';
import { genomeInfo } from './genomeInfo';
import { layout } from './layout';
import { lineGraph } from './lineGraph';
import { gwasGraph } from './gwasGraph';
import { notifications } from './notifications';
import { metadata } from './metadata';
import { blocks } from './blocks';

const initialPhylogenyState = {
  newickString: undefined,
  activeTaxa: {},
  fileName: 'not loaded',
};


const rootReducer = combineReducers({
  annotation,
  metadata,
  blocks,
  lineGraph,
  gwasGraph,
  genomeInfo,
  phylogeny,
  router,
  layout,
  notifications,
});

export default rootReducer;

function annotation(state = { data: [], fileName: '' }, action) {
  switch (action.type) {
  case 'annotationData':
    return { data: action.data, fileName: action.fileName };
  default:
    return state;
  }
}

function phylogeny(state = initialPhylogenyState, action) {
  switch (action.type) {
  case 'treeData':
    return merge({}, state, {
      newickString: action.data,
      fileName: action.fileName,
    });
  case 'updatedTaxaPositions':
    const ret = merge({}, state);
    ret.activeTaxa = action.activeTaxa;
    return ret;
    /* do not use merge in one go!
     * if oldState.activeTaxa.X !== undefined, but now
     * action.activeTaxa = undefined (as tip not visible)
     * then the old value is retained!!!!!
     * so merge is really a deepMerge
     */
    // return merge({}, state, {
      // activeTaxa: action.activeTaxa,
    // });
  default:
    return state;
  }
}

function router(state = 'landing', action) {
  switch (action.type) {
  case 'newPage':
    return state === action.pageName ? state : action.pageName;
  // case 'clearSpinner':
    // return state === 'unknown' ? state : 'unknown';
  // TO DO
  case 'metaData':
  case 'treeData':
    return state === 'unknown' ? state : 'unknown';
  default:
    return state;
  }
}
