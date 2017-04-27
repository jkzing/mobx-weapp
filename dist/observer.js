'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = observer;

var _mobx = require('mobx');

var _utils = require('./utils');

/**
 * setup reaction observer
 */
function setupReaction(mapState) {
  var store = this.$store;
  // map initial state
  this.setData(mapState(store, this.data));

  var self = this;

  // create reaction for mapped state
  var reaction = new _mobx.Reaction('page-' + +new Date(), function () {
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
  var store = this.$store;
  var mapped = mapState(store, this.data);
  this.setData(mapped);
}

function observer(mapState, mapActions) {
  return function () {
    var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _extends({}, view, {
      /**
       * overwrite onLoad lifecycle hook
       * start data reaction
       */
      onLoad: function onLoad() {
        var _this = this;

        if (mapState) {
          // only setup reaction when store properties has been mapped to data
          setupReaction.call(this, mapState);
        }

        if (mapActions) {
          var actions = mapActions(this.$store, this.data) || {};
          Object.keys(actions).forEach(function (name) {
            (0, _utils.warning)(_this[name] !== undefined, 'trying to overwrite an existing property');
            (0, _utils.assert)(typeof actions[name] === 'function', 'Actions can only be function');
            _this[name] = actions[name];
          });
        }

        if (typeof view.onLoad === 'function') view.onLoad.call(this);
      },


      /**
       * overwrite onUnload lifecycle hook
       * dispose reactions
       */
      onUnload: function onUnload() {
        if (this.$reaction) {
          this.$reaction.dispose();
        }
        if (typeof view.onUnload === 'function') view.onUnload();
      }
    });
  };
};