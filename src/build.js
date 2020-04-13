const fs = require('fs');
const chalk = require('chalk');
const boxen = require('boxen');
const handlebars = require('handlebars');
const {
  compose,
  view,
  lensPath,
  concat,
  map,
  join,
  defaultTo
} = require('ramda');

const {
  rows,
  outputFilePath,
  boxenOptions,
  indexHtmlFilePath
} = require('./config');

// Pick the right color and modifiers from chalk for each item
const stylize = compose(view, lensPath, concat);

const defaultToEmpty = (v) =>
  typeof v === 'string' ? defaultTo('', v) : defaultTo([], v);

// Each item gets its own line, properly stylized
const toTemplate = ({ color, modifiers, value, after, before }) =>
  `${defaultToEmpty(before)}${stylize(
    [color],
    defaultToEmpty(modifiers)
  )(chalk)(value)}${defaultToEmpty(after)}`;

// Create the entire output
const output = compose(join(''), map(toTemplate));

const compileHtml = (data) =>
  handlebars.compile(fs.readFileSync('./src/index.hbs', 'utf8'), data);

// Write to the bin/output file
fs.writeFileSync(
  outputFilePath,
  chalk.green(boxen(output(rows), boxenOptions))
);

fs.writeFileSync(indexHtmlFilePath, compileHtml(rows));
