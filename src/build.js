const fs = require('fs');
const chalk = require('chalk');
const boxen = require('boxen');
const {
  compose,
  view,
  lensPath,
  concat,
  map,
  join,
  defaultTo
} = require('ramda');

const { rows, outputFilePath, boxenOptions } = require('./config');

// Pick the right color and modifiers from chalk for each item
const stylize = compose(
  view,
  lensPath,
  concat
);

const defaultToEmpty = v =>
  typeof v === 'string' ? defaultTo('', v) : defaultTo([], v);

// Each item gets its own line, properly stylized
const toTemplate = ({ color, modifiers, value, after, before }) =>
  `${defaultToEmpty(before)}${stylize([color], defaultToEmpty(modifiers))(
    chalk
  )(value)}${defaultToEmpty(after)}`;

// Create the entire output
const output = compose(
  join(''),
  map(toTemplate)
);

// Write to the bin/output file
fs.writeFileSync(
  outputFilePath,
  chalk.green(boxen(output(rows), boxenOptions))
);
