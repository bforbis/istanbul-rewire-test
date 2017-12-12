# istanbul-rewire-test
A test repository for debugging why istanbul and rewire are fighting with each other

## Introduction
I noticed in one of my projects that I was getting some weird behavior while using the `nyc` test coverage in the same project that included a dependency for `rewire@3`. In this repository, I am trying to provide an example demo for this problem with the minimum setup I can create.

The following tests were performed on mac OS using node version 8.9.1 and npm version 5.5.1


## With rewire@3

### Failing nyc tests (foo -> baz)
Run the following test: `npm run nyc-test-fail`. This should have the following coverage output
```
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |    57.14 |      100 |        0 |    57.14 |                |
 bar.js   |       50 |      100 |        0 |       50 |              4 |
 baz.js   |      100 |      100 |      100 |      100 |                |
 foo.js   |       50 |      100 |        0 |       50 |            6,7 |
----------|----------|----------|----------|----------|----------------|
```

Notice that only 50% of the lines in `foo.js` are marked as covered.

### Passing nyc tests (baz -> foo)
Run the following test: `npm run nyc-test-pass`. This should have the following coverage output
```
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |    85.71 |      100 |    66.67 |    85.71 |                |
 bar.js   |       50 |      100 |        0 |       50 |              4 |
 baz.js   |      100 |      100 |      100 |      100 |                |
 foo.js   |      100 |      100 |      100 |      100 |                |
----------|----------|----------|----------|----------|----------------|
```

Notice that only 100% of the lines in `foo.js` are marked as covered.

### Passing istanbul test (foo -> baz)
Run the following test: `npm run istanbul-test-pass1`
```
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
 app/     |     87.5 |      100 |       50 |     87.5 |                |
  bar.js  |       50 |      100 |        0 |       50 |              4 |
  baz.js  |      100 |      100 |      100 |      100 |                |
  foo.js  |      100 |      100 |      100 |      100 |                |
----------|----------|----------|----------|----------|----------------|
All files |     87.5 |      100 |       50 |     87.5 |                |
----------|----------|----------|----------|----------|----------------|
```
Notice that unlike with `nyc`, `istanbul` is able to cover all lines in `foo.js`

### Passing istanbul test (baz -> foo)
Run the following test: `npm run istanbul-test-pass2`
```
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
 app/     |     87.5 |      100 |       50 |     87.5 |                |
  bar.js  |       50 |      100 |        0 |       50 |              4 |
  baz.js  |      100 |      100 |      100 |      100 |                |
  foo.js  |      100 |      100 |      100 |      100 |                |
----------|----------|----------|----------|----------|----------------|
All files |     87.5 |      100 |       50 |     87.5 |                |
----------|----------|----------|----------|----------|----------------|
```

This test passes for both `nyc` and `istanbul`

## With rewire@2
Next, run `npm install rewire@2` and re-run the above tests. With `rewire@2`, both `nyc` and `istanbul` code cover tools work as expected and cover 100% of the lines in `foo.js`