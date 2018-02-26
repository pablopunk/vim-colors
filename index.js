const contrast = require('contrast')

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
  for (let i = 0; i < fgTypes.length; i++) {
    if (i < scheme.length) {
      newScheme.push(scheme[i])
    } else {
      newScheme.push(defaults.fg)
    }
  }

  return newScheme
}

const fgTypes = [
  [
    'StorageClass',
    'Type',
    'Identifier',
    'Delimiter',
    'jsBraces',
    'jsFuncBraces',
    'jsIfElseBraces',
    'jsTryCatchBraces',
    'jsModuleBraces',
    'jsObjectBraces',
    'jsFinallyBraces',
    'jsSwitchBraces',
    'jsTemplateBraces',
    'jsParens',
    'jsFuncParens',
    'jsBrackets'
  ],
  [
    'Function',
    'Include',
    'Constant',
    'Number',
    'SpecialChar'
  ],
  [
    'String',
    'Label',
    'Repeat',
    'Conditional',
    'StatusLine',
    'PMenu'
  ],
  [
    'Character',
    'Exception',
    'Statement',
    'Boolean',
    'Keyword',
    'Special',
    'Operator'
  ]
]

const getFgConfig = ({scheme, bg}) =>
    fgTypes.map((typeArr, typeIndex) =>
      typeArr.reduce((acc, curr) =>
        `${acc} hi ${curr} guifg=#${scheme[typeIndex]} guibg=#${bg}
`
      , '')).join('')

module.exports = (name, colors) => {
  if (!name || typeof name !== 'string') {
    throw new TypeError('Please provide a name for the colorscheme')
  }
  const {bg, fg} = Object.assign({}, defaults, colors)
  const scheme = colors ? fillScheme(colors.scheme) : []

  return `
set background=${contrast(bg)}
set t_Co=256
hi Normal guifg=#${fg} guibg=#${bg}
hi LineNr guifg=#5e6c70 guibg=#${bg}
hi Comment guifg=#5e6c70 guibg=#${bg} gui=italic
hi StorageClass guifg=#${scheme[0]} guibg=#${bg}
hi Type guifg=#${scheme[0]} guibg=#${bg}
${getFgConfig({scheme, bg})}
`
}
