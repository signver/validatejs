# validatejs

This library simply aims to bring a little structure to validating objects.

# Guides

## Installation guide

To install

`npm i @signver/validatejs`

## Usage guide

```typescript
import { validate } from '@signver/validatejs';

const myObject = {
  //...
  shallow1: 1
  shallow2: 1
  shallow3: [ /* ... */ ]
  deep1: {
    deeper1A: 1
    deeper1B: {
      // ...
      deeper2A: 1
    }
    deeper1C: {
      // ...
    }
  }
};

// Validate the whole object directly in a function
const result = validate<ErrorDetails, typeof myObject>(myObject, (value) => {
  // Test the object
  return [
    // ... any error format
  ];
});
// result is ErrorDetails[]

// Define a mirror object containing smaller validations
const nestedValidationResults = validate<ErrorDetails, typeof myObject>(
  myObject,
  {
    shallow1: (value: (typeof myObject)['shallow1']) => { /* ... */ },
    /* shallow2 can be skipped if it is not defined */
    // arrays will be evaluated as a whole
    shallow3: (value: (typeof myObject)['shallow3']) => { /* ... */ },
    deep1: {
      // validation can be nested
      deeper1A: (value) => { /* ... */ },
      // nested objects can be validated as an object
      deeper1B: (value: (typeof myObject)['deep1']['deeper1b']) => { /* ... */ },
      // nest deeper as needed
      deeper1C: {
        /* ... */
      }
    }
  }
});
/*  expected result
  {
    shallow1: [ ... ],
    shallow3: [ ... ],
    deep1: {
      deeper1A: [ ... ],
      deeper1B: [ ... ],
      deeper1C: {
        ...
      },
    }
  }
*/
```

A utility function is provided to flatten the nested results if that is preferred.
`root` defines the starting point of the `path` property, and can be any string.
If the validation returns an empty array, the entry will not be included.

```typescript
import { flatpack } from '@signver/validatejs';

const flattenedList = flatpack<ErrorDetails, typeof myObject>(myObject, {
  //
  root: 'myObject',
});
// flattenedList is [ { path: 'myObject.shallow1', data: [ ... ] }, ... ]
```
