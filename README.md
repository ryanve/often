# often
Async recursive timers

```sh
npm install often --save
```
## Example

```js
var often = require('often')

often(function() {
  console.log(new Date)
  if ('someCondition') {
    this.done()
  }
}).start().wait(1000)

often(function() {
  console.info(this)
  if (this._trial === 3) {
    this.stop()
    console.warn(this)
  }
}).start(1000).wait(200)

often(function() {
  if ('Not Ready Yet') {
    this.wait(1000 + this._wait)
    console.info('Slowing down')
  } else {
    console.info('Ready!')
  }
}).start()
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

### Properties
- `._function`: `fn`|null
- `._recur`: boolean|null
- `._trial`: integer|null
- `._wait`: `ms`|null

## Develop

```sh
git clone https://github.com/ryanve/often.git
cd often
npm install
npm test
```

## License
MIT
