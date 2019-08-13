# vim-colors

<p align="center">
  <a href="https://github.com/pablopunk/miny"><img src="https://img.shields.io/badge/made_with-miny-1eced8.svg" /> </a>
  <a href="https://www.npmjs.com/package/vim-colors"><img src="https://img.shields.io/npm/dt/vim-colors.svg" /></a>
</p>

<p align="center">
  <i>Returns vim color configuration for given inputs</i>
</p>

> This is an npm package so you can use it in your Javascript projects. If you only want to generate a scheme, use [vimcolors.org](https://vimcolors.org)

## Install

```sh
npm install vim-colors
```

## Usage

This results into a `viml` configuration script with a dark background (black) and
a white foreground

```js
const vimColors = require('vim-colors')

const configString = vimColors('my-scheme', {
  dark: true,
  bg: '000000', // black
  fg: 'ffffff', // white
  menus: '002244', // navy blue
  comments: 'cccccc', // gray
  scheme: [
    '4169e1',
    'ff6347'
    // You can add up to 6 colors
  ]
})
```

## Related

- [vimcolors.org](https://vimcolors.org): The website that uses this module

## License

MIT

## Author

| ![me](https://gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?size=100) |
| ---------------------------------------------------------------------------- |
| [Pablo Varela](https://pablo.life)                                           |
