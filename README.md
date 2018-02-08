# vim-colors

> WIP. Don't use yet

<p align="center">
  <a href="https://travis-ci.org/pablopunk/vim-colors"><img src="https://img.shields.io/travis/pablopunk/vim-colors.svg" /> </a>
  <a href="https://codecov.io/gh/pablopunk/vim-colors"><img src="https://img.shields.io/codecov/c/github/pablopunk/vim-colors.svg" /> </a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" /> </a>
  <a href="https://github.com/pablopunk/miny"><img src="https://img.shields.io/badge/made_with-miny-1eced8.svg" /> </a>
  <a href="https://www.npmjs.com/package/vim-colors"><img src="https://img.shields.io/npm/dt/vim-colors.svg" /></a>
</p>

<p align="center">
  <i>Returns vim color configuration for given inputs</i>
</p>


## Install

```sh
npm install vim-colors
```


## Usage

This results into a `viml` configuration script with a dark background (black) and
a white foreground:

```js
const vimColors = require('vim-colors')

const configString = vimColors('my-scheme', {
  bg: '000000', // black
  fg: 'ffffff'  // white
})


```


## License

MIT


## Author

| ![me](https://gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?size=100)           |
| --------------------------------- |
| [Pablo Varela](https://pablo.life)   |

