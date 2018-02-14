const contrast = require('contrast')

const SCHEME_LENGTH = 6

const defaults = {
  bg: '000000',
  fg: 'ffffff',
  scheme: []
}

const fillScheme = scheme => {
  if (!scheme || !Array.isArray(scheme)) {
    scheme = []
  }

  const newScheme = []
  for (let i = 0; i < SCHEME_LENGTH; i++) {
    if (i < scheme.length) {
      newScheme.push(scheme[i])
    } else {
      newScheme.push(defaults.fg)
    }
  }

  return newScheme
}

module.exports = (name, colors) => {
  if (!name || typeof name !== 'string') {
    throw new TypeError('Please provide a name for the colorscheme')
  }
  const {bg, fg} = Object.assign({}, defaults, colors)
  const scheme = colors ? fillScheme(colors.scheme) : []

  return `
set background=${contrast(bg)}
set t_Co=256
hi Normal guifg=#${fg} guibg=#${bg} guisp=#${bg}
hi Comment guifg=#5e6c70 guibg=#${bg} guisp=#${bg}
hi StorageClass guifg=#${scheme[0]} guisp=#${bg}
hi Function guifg=#${scheme[0]} guisp=#${bg}
hi Type guifg=#${scheme[0]} guisp=#${bg}
hi Include guifg=#${scheme[1]} guisp=#${bg}
hi Constant guifg=#${scheme[1]} guisp=#${bg}
hi String guifg=#${scheme[2]} guisp=#${bg}
hi Label guifg=#${scheme[3]} guisp=#${bg}
hi Repeat guifg=#${scheme[3]} guisp=#${bg}
hi Conditional guifg=#${scheme[3]} guisp=#${bg}
hi Boolean guifg=#${scheme[4]} guisp=#${bg}
hi Keyword guifg=#${scheme[4]} guisp=#${bg}
hi Special guifg=#${scheme[4]} guisp=#${bg}
hi Operator guifg=#${scheme[4]} guisp=#${bg}
hi Statement guifg=#${scheme[5]} guisp=#${bg}
hi Delimiter guifg=#${scheme[5]} guisp=#${bg}
hi jsBraces guifg=#${scheme[5]} guisp=#${bg}
hi jsFuncBraces guifg=#${scheme[5]} guisp=#${bg}
hi jsIfElseBraces guifg=#${scheme[5]} guisp=#${bg}
hi jsTryCatchBraces guifg=#${scheme[5]} guisp=#${bg}
hi jsModuleBraces guifg=#${scheme[5]} guisp=#${bg}
hi jsObjectBraces guifg=#${scheme[5]} guisp=#${bg}
hi jsFinallyBraces guifg=#${scheme[5]} guisp=#${bg}
hi jsSwitchBraces guifg=#${scheme[5]} guisp=#${bg}
hi jsTemplateBraces guifg=#${scheme[5]} guisp=#${bg}
hi jsParens guifg=#${scheme[5]} guisp=#${bg}
hi jsFuncParens guifg=#${scheme[5]} guisp=#${bg}
hi jsBrackets guifg=#${scheme[5]} guisp=#${bg}
`
}
