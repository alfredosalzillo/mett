# meet (boring-event-emitter)
[![CD](https://github.com/alfredosalzillo/mett/workflows/CD/badge.svg)](https://github.com/alfredosalzillo/mett/actions/workflows/CD.yml)
[![CI](https://github.com/alfredosalzillo/mett/workflows/CI/badge.svg)](https://github.com/alfredosalzillo/mett/actions/workflows/CI.yml)
[![codecov](https://codecov.io/gh/alfredosalzillo/mett/branch/main/graph/badge.svg)](https://codecov.io/gh/alfredosalzillo/mett)
[![npm version](https://badge.fury.io/js/boring-event-emitter.svg)](https://badge.fury.io/js/boring-event-emitter)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A boring typed event emitter library.

## Install

This project uses node and npm. Go check them out if you don't have them locally installed.

```bash
npm install --save mett
# or 
yarn add mett
```

## Usage

```typescript
// using ES6 modules
import mett from 'boring-event-emitter'

// using CommonJS modules
const mett = require('boring-event-emitter')
```

Create a single-event event emitter.

```typescript
import mett from 'boring-event-emitter'

// create a new event with numeric values
const event = mett<number>()

// listen to an event
const dispose = event.listen((value) => console.log(`value is ${value}`))

// dispose a listener
dispose()

// emit a value
event.emit(1)

// read the last emitted value
const currentValue = event.lastEmittedValue
```

### Options

`mett` accept the following options:

- `initialValue` the initialValue of the event emitter. Will be emitted on the listen if `replayLast` is `true`.
- `replayLast` emit to newly added listener the `lastEmittedValue`.
