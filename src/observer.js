import {autorun, Reaction} from 'mobx';
import {assert, warning} from './utils';

/**
 * setup reaction observer
 */
function setupReaction(mapState) {
  const store = this.$store;
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
  let store = this.$store;
  let mapped = mapState(store, this.data);
  this.setData(mapped);
}

export default function observer(mapState, mapActions) {
  return function(view = {}) {
    return {
      ...view,
      /**
       * overwrite onLoad lifecycle hook
       * start data reaction
       */
      onLoad() {
        if (mapState) {
          // only setup reaction when store properties has been mapped to data
          setupReaction.call(this, mapState);
        }

        if (mapActions) {
          let actions = mapActions(this.$store, this.data) || {};
          Object.keys(actions).forEach(name => {
            warning(this[name] !== undefined, 'trying to overwrite an existing property');
            this[name] = actions[name];
          });
        }

        if (typeof view.onLoad === 'function') view.onLoad.call(this);
      },

      /**
       * overwrite onUnload lifecycle hook
       * dispose reactions
       */
      onUnload() {
        if (this.$reaction) {
          this.$reaction.dispose();
        }
        if (typeof view.onUnload === 'function') view.onUnload();
      }
    };
  }
};
