# often
Async recursive timers

```sh
npm install often --save
```

```sh
var often = require('often')
```

## API
### `often(fn=undefined)`
- Get an `often` instance with `fn` as recursion function
- All methods are chainable

### `.wait(ms=0)`
Set interval to wait between recursions

### `.start(ms=0)`
Start recursing after optional ms delay

### `.stop()`
Immediately stop recursing

### `.done()`
Immediately stop recursing and void instance

### `.use(fn=undefined)`
Replace the recursion function

### `.clear()` **internal**
Clear active timer

### `.clean()` **internal**
Nullify [properties](#properties)

### `.init(fn=undefined)` **internal**
Initialize instance

### Properties
- `._function`: `fn`|null
- `._recur`: boolean|null
- `._timer`: integer|null
- `._trial`: integer|null
- `._wait`: `ms`|null

## Examples
### Poll condition
```js
var often = require('often')

often(function() {
  console.log(new Date)
  if ('someCondition') {
    this.done()
  }
}).wait(1000).start()
```

### Limit attempts
```js
var often = require('often')

often(function() {
  console.info(this)
  if (this._trial === 3) {
    this.stop()
    console.warn(this)
  }
}).start(1000).wait(200)
```

### Decay task
```js
var often = require('often')

often(function() {
  if ('Not Ready Yet') {
    this.wait(1000 + this._wait)
    console.info('Slowing down')
  } else {
    console.info('Ready!')
  }
}).start()
```

### Heartbeat
```js
var often = require('often')
var energy = require('energy')
var emitter = energy()
var heartbeat = often(function() {
  emitter.emit('heartbeat')
}).wait(1000).start()

emitter.on('heartbeat', function() {
  console.log('I run every second')
})
```

## Develop
```sh
git clone https://github.com/ryanve/often.git
cd often
npm install
npm test
```

## License
MIT
