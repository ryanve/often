!function(root, name, make) {
  typeof module != 'undefined' && module.exports ? module.exports = make() : root[name] = make()
}(this, 'often', function() {

  var model = often.prototype

  function often(fn) {
    var o = this instanceof often ? this : new often
    o._recur = true
    o._timer = null
    o._trial = null
    o._wait = 0
    o._function = fn
    return o
  }

  function start(o, delay) {
    o.clear()
    o._timer = setTimeout(recur(o), delay || 0)
    return o
  }

  function recur(o) {
      return function() {
        if (o._recur) {
          o._trial++
          o._function()
          if (o._recur) start(o, o._wait)
        }
      }
  }

  model.use = function(fn) {
    this._function = fn
    return this
  }

  model.wait = function(ms) {
    this._wait = ms
    return this
  }

  model.start = function(delay) {
    this._recur = true
    return start(this, delay)
  }

  model.clear = function() {
    this._timer == null || clearTimeout(this._timer)
    this._timer = null
    return this
  }

  model.stop = function() {
    this._recur = false
    this._trial = null
    return this.clear()
  }

  model.done = function() {
    this.stop()
    this._function = this._recur = this._wait = null
    return this
  }

  return often
});
