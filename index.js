const contrast = require('contrast')

const SCHEME_LENGTH = 4

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
hi Normal guifg=#${fg} guibg=#${bg} guibg=#${bg}
hi LineNr guifg=#5e6c70 guibg=#${bg} guibg=#${bg}
hi Comment guifg=#5e6c70 guibg=#${bg} guibg=#${bg}
hi StorageClass guifg=#${scheme[0]} guibg=#${bg}
hi Function guifg=#${scheme[0]} guibg=#${bg}
hi Type guifg=#${scheme[0]} guibg=#${bg}
hi Identifier guifg=#${scheme[0]} guibg=#${bg}
hi Delimiter guifg=#${scheme[0]} guibg=#${bg}
hi jsBraces guifg=#${scheme[0]} guibg=#${bg}
hi jsFuncBraces guifg=#${scheme[0]} guibg=#${bg}
hi jsIfElseBraces guifg=#${scheme[0]} guibg=#${bg}
hi jsTryCatchBraces guifg=#${scheme[0]} guibg=#${bg}
hi jsModuleBraces guifg=#${scheme[0]} guibg=#${bg}
hi jsObjectBraces guifg=#${scheme[0]} guibg=#${bg}
hi jsFinallyBraces guifg=#${scheme[0]} guibg=#${bg}
hi jsSwitchBraces guifg=#${scheme[0]} guibg=#${bg}
hi jsTemplateBraces guifg=#${scheme[0]} guibg=#${bg}
hi jsParens guifg=#${scheme[0]} guibg=#${bg}
hi jsFuncParens guifg=#${scheme[0]} guibg=#${bg}
hi jsBrackets guifg=#${scheme[0]} guibg=#${bg}
hi Include guifg=#${scheme[1]} guibg=#${bg}
hi Constant guifg=#${scheme[1]} guibg=#${bg}
hi Number guifg=#${scheme[1]} guibg=#${bg}
hi SpecialChar guifg=#${scheme[1]} guibg=#${bg}
hi String guifg=#${scheme[2]} guibg=#${bg}
hi Label guifg=#${scheme[2]} guibg=#${bg}
hi Repeat guifg=#${scheme[2]} guibg=#${bg}
hi Conditional guifg=#${scheme[2]} guibg=#${bg}
hi StatusLine guifg=#${scheme[2]} guibg=#${bg}
hi Character guifg=#${scheme[3]} guibg=#${bg}
hi Exception guifg=#${scheme[3]} guibg=#${bg}
hi Statement guifg=#${scheme[3]} guibg=#${bg}
hi Boolean guifg=#${scheme[3]} guibg=#${bg}
hi Keyword guifg=#${scheme[3]} guibg=#${bg}
hi Special guifg=#${scheme[3]} guibg=#${bg}
hi Operator guifg=#${scheme[3]} guibg=#${bg}
`
}
