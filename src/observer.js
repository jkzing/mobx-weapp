import {autorun, Reaction} from 'mobx';

export default function observer(mapState, mapActions) {
  return function(view = {}) {
    return {
      ...view,
      /**
       * overwrite onLoad lifecycle hook
       * start data reaction
       */
      onLoad() {
        let __store = this.$store;

        // map initial state
        this.setData(mapState(__store));

        const self = this;

        // create reaction for mapped state
        const __reaction = new Reaction(`page-${+new Date()}`, function () {
          this.track(self.__reactionFn.bind(self));
        });

        // start reaction
        __reaction.runReaction();
        this.$reaction = __reaction;

        if (typeof view.onLoad === 'function') view.onLoad();
      },

      /**
       * overwrite onUnload lifecycle hook
       * dispose reactions
       */
      onUnload() {
        this.$reaction.dispose();
        if (typeof view.onUnload === 'function') view.onUnload();
      },

      /**
       * reactive function
       * will be called each time store changes
       */
      __reactionFn() {
        let store = this.$store;
        let mapped = mapState(store);
        this.setData(mapped);
      },
    };
  }
};
