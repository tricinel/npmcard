const path = require('path');
const { compose, join, repeat, subtract, length: len } = require('ramda');

// Define options for Boxen
const boxenOptions = {
  padding: 4,
  margin: 4,
  borderStyle: 'round'
};

// The output file path where we will have the CLI output
const outputFilePath = path.join(process.cwd(), 'bin/output');

const newline = '\n';
const maxSpaces = 8;

// Generate a bunch of empty spaces
// e.g. spaces(3) will get you `'   '` = 3 empty spaces
const spaces = compose(
  join(''),
  repeat(' ')
);

// Count how many spaces to apply based on the length of the word and maxSpaces
// e.g. countSpaces('npm') will get you `maxSpaces - 'npm'.length` = 8 - 3 = 5
// This is fed into spaces to get you the correct number of spaces to apply before a word inside the card
const countSpaces = compose(
  subtract(maxSpaces),
  len
);

const label = v => ({
  before: compose(
    spaces,
    countSpaces
  )(v),
  color: 'gray',
  value: `${v}:`,
  after: ' '
});

const rows = [
  {
    before: spaces(10),
    value: 'Bogdan Lazar',
    color: 'white',
    modifiers: ['bold'],
    after: ' / '
  },
  {
    value: '@tricinel',
    color: 'white',
    modifiers: ['bold', 'underline'],
    after: `${newline}`
  },
  {
    before: spaces(10),
    color: 'green',
    modifiers: ['dim'],
    value: 'Front-end Developer & Designer',
    after: `${newline}${newline}`
  },
  label('GitHub'),
  {
    value: 'https:/github.com/',
    color: 'white'
  },
  {
    value: 'tricinel',
    color: 'blue',
    after: newline
  },
  label('npm'),
  {
    value: 'https:/npmjs.com/',
    color: 'white'
  },
  {
    value: '~tricinel',
    color: 'blue',
    after: newline
  },
  label('Twitter'),
  {
    value: 'https://twitter.com/',
    color: 'white'
  },
  {
    value: 'tricinel',
    color: 'blue',
    after: newline
  },
  label('LinkedIn'),
  {
    value: 'https:/linkedin.com/in/',
    color: 'white'
  },
  {
    value: 'tricinel',
    color: 'blue',
    after: newline
  },
  label('Web'),
  {
    value: 'https:/bogdanlazar.com/',
    color: 'green',
    modifiers: ['bold'],
    after: newline
  },
  {
    value: '',
    color: 'white',
    after: newline
  },
  label('Card'),
  {
    value: 'npx',
    color: 'red',
    after: ' '
  },
  {
    value: 'tricinel',
    color: 'blue',
    after: newline
  }
];

module.exports = { rows, outputFilePath, boxenOptions, newline };
