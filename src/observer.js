import {autorun, Reaction} from 'mobx';
import {assert, warning} from './utils';
import StoreMgr from './store';

/**
 * setup reaction observer
 */
function setupReaction(mapState) {
  const store = StoreMgr.getStore();
  // map initial state
  this.setData(mapState(store, this.data));

  const self = this;

  // create reaction for mapped state
  const reaction = new Reaction(`page-${+new Date()}`, function () {
    this.track(reactionFn.bind(self, mapState));
  });

  // start reaction
  reaction.runReaction();
  this.$reaction = reaction;
}

/**
 * reactive function
 * will be called each time store changes
 */
function reactionFn(mapState) {
  const store = StoreMgr.getStore();
  let mapped = mapState(store, this.data);
  this.setData(mapped);
}

function startMobxReaction(mapState, mapActions, isComponent) {
  const store = StoreMgr.getStore();
  Object.defineProperty(this, '$store', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: store
  });
  if (mapState) {
    // only setup reaction when store properties has been mapped to data
    setupReaction.call(this, mapState);
  }

  if (mapActions) {
    const actionMount = isComponent ? this.methods = this.methods || {} : this;
    let actions = mapActions(store, this.data) || {};
    Object.keys(actions).forEach(name => {
      warning(actionMount[name] !== undefined, 'Trying to overwrite an existing property.');
      assert(typeof actions[name] !== 'function', 'Actions can only be function.');
      actionMount[name] = actions[name];
    });
  }
}

function stopMobxReaction() {
  if (this.$reaction) {
    this.$reaction.dispose();
  }
}

export default function observer(mapState, mapActions) {
  return function(options = {}, isComponent = false) {
    const opts = { ...options };
    if (isComponent) {
      const { attached, detached } = options;
      opts.attached = function() {
        startMobxReaction.call(this, mapState, mapActions);

        /* istanbul ignore else */
        if (typeof attached === 'function') {
          attached.apply(this, arguments);
        }
      }

      opts.detached = function() {
        stopMobxReaction.call(this);
        /* istanbul ignore else */
        if (typeof detached === 'function') {
          detached.apply(this, arguments);
        }
      }
    } else {
      const { onLoad, onUnload } = options;
      opts.onLoad = function() {
        startMobxReaction.call(this, mapState, mapActions, isComponent);

        /* istanbul ignore else */
        if (typeof onLoad === 'function') {
          onLoad.apply(this, arguments);
        }
      }

      opts.onUnload = function() {
        stopMobxReaction.call(this);
        /* istanbul ignore else */
        if (typeof onUnload === 'function') {
          onUnload.apply(this, arguments);
        }
      }
    }
    return opts;
  }
};
