!function() {
  var often = typeof require == 'function' ? require('./') : this.often
  var model = often.prototype

  function ok(actual, correct) {
    if (actual !== correct) throw new Error(actual + ' should be ' + correct)
  }

  function f1() {}
  function f2() {}

  function tester(msg, test) {
    function f() {
      console.log(msg, 'Test', ++f.times)
      test.apply(this, arguments)
      console.log('Pass =)')
    }

    f.times = 0
    return f
  }

  function basics() {
    if (!(this instanceof often)) ok(this, 'often instance')
    ok(this.hasOwnProperty('_function'), true)
    ok(this.hasOwnProperty('_trial'), true)
    ok(this.hasOwnProperty('_wait'), true)
    ok(this.hasOwnProperty('_timer'), true)
    ok(this.wait, model.wait)
    ok(this.use, model.use)
    ok(this.start, model.start)
    ok(this.stop, model.stop)
    ok(this.done, model.done)
    ok(typeof(this._trial), 'number')
    ok(typeof(this._wait), 'number')
    ok(typeof(this._recur), 'boolean')
  }

  var o0 = often(f1)
  ok(o0._function, f1)
  o0.use(f2)
  ok(o0._function, f2)
  o0.done()
  ok(o0._function, null)

  var o1 = often(tester('Group 1', basics)).start()
  often(o1.done.bind(o1)).start()

  var o2 = often(tester('Group 2', basics)).start().wait(10)
  often(o2.stop.bind(o2)).start(100)

  var o3trial = 0
  var o3max = 5
  var o3 = often(tester('Group 3', function() {
    ok(this._recur, true)
    ok(this._trial, ++o3trial)
    if (this._trial === o3max) {
      this.stop()
      ok(this._trial, null)
      ok(this._recur, false)
      ok(typeof(this._wait), 'number')
      ok(typeof(this._function), 'function')
      this.done()
      ok(this._trial, null)
      ok(this._recur, null)
      ok(this._wait, null)
      ok(this._function, null)
    }
  })).start()

  setTimeout(function() {
    console.log(0, o0)
    console.log(1, o1)
    console.log(2, o2)
    console.log(3, o3)
  }, 1000)
}();
