const contrast = require('contrast')

const defaults = {
  bg: '000000',
  fg: 'ffffff'
}

module.exports = (name, colors) => {
  if (!name || typeof name !== 'string') {
    throw new TypeError('Please provide a name for the colorscheme')
  }
  const {bg, fg} = Object.assign({}, defaults, colors)

  return `
set background=${contrast(bg)}
set t_Co=256

hi Normal guifg=#${fg} guibg=#${bg} guisp=#${bg} gui=NONE ctermfg=248
`
}
