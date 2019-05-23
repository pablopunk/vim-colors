const defaults = {
  dark: true,
  light: false,
  bg: '000000',
  fg: 'ffffff',
  comments: '444444',
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
  ['StorageClass', 'Type', 'Identifier', 'Delimiter'],
  ['Function', 'Include', 'Constant', 'Number', 'SpecialChar'],
  ['String'],
  ['Label', 'Repeat', 'Conditional', 'StatusLine', 'PMenu'],
  [
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
    'Character',
    'Exception',
    'Statement',
    'Boolean',
    'Keyword',
    'Special',
    'Operator'
  ]
]

const normalizeName = str => {
  let normalized = `${str}`

  normalized = normalized
    .replace(/[^a-zA-Z0-9_]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-/, '')
    .replace(/-$/, '')

  if (/^\d/.test(normalized)) {
    normalized = `-${normalized}`
  }

  return normalized
}

const getFgConfig = ({ scheme, bg }) =>
  fgTypes
    .map((typeArr, typeIndex) =>
      typeArr.reduce(
        (acc, curr) =>
          `${acc}hi ${curr} guifg=#${scheme[typeIndex]} guibg=#${bg}
`,
        ''
      )
    )
    .join('')

module.exports = (name, colors) => {
  if (!name || typeof name !== 'string') {
    throw new TypeError('Please provide a name for the colorscheme')
  }
  const { comments, dark, bg, fg } = Object.assign({}, defaults, colors)
  const scheme = colors ? fillScheme(colors.scheme) : []

  return `
hi clear
syntax reset
let g:colors_name = "${normalizeName(name)}"
set background=${Boolean(dark) ? 'dark' : 'light'}
set t_Co=256
hi Normal guifg=#${fg} guibg=#${bg}
hi Title guifg=#${fg}
hi LineNr guifg=#${comments}
hi Comment guifg=#${comments} gui=italic
hi Search guibg=#1ee8c6 guifg=#000000
${getFgConfig({ scheme, bg })}
`
}
