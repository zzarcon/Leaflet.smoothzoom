L.Map.SmothZoom = L.Handler.extend({
  smothZoomDelay: 1000,
  isThrottling: false,

  addHooks: function () {
    this._map.scrollWheelZoom.removeHooks();
    L.DomEvent.on(this._map._container, 'mousewheel', this.onMouseWheel, this);
  },

  removeHooks: function () {
    L.DomEvent.off(this._map._container, 'mousewheel', this.onMouseWheel, this);
  },

  onMouseWheel: function(e) {
    console.log('onMouseWheel')
    e.preventDefault();
    e.stopPropagation();
    if (this.isThrottling) return;

    console.log('setTimeout')

    this.isThrottling = true;
    this.setSmothZoom(e);

    setTimeout(() => {
      this.isThrottling = false;
      this.setSmothZoom(e);
    }, this.smothZoomDelay);
  },

  setSmothZoom(e) {
    console.log('setSmothZoom');
    const delta = L.DomEvent.getWheelDelta(e);
    const map = this._map;

    if (!delta) return;

    const newZoom = delta > 0 ? 1 : -1;

    map.setZoom(map.getZoom() + newZoom)
  }
});

L.Map.addInitHook('addHandler', 'smothZoom', L.Map.SmothZoom);
