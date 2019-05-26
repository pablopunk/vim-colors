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
  [
    'DiffText',
    'ErrorMsg',
    'WarningMsg',
    'PreProc',
    'Exception',
    'Error',
    'DiffDelete',
    'GitGutterDelete',
    'GitGutterChangeDelete',
    'cssIdentifier',
    'cssImportant',
    'Type',
    'Identifier'
  ],
  [
    'PMenuSel',
    'Constant',
    'Repeat',
    'DiffAdd',
    'GitGutterAdd',
    'cssIncludeKeyword'
  ],
  [
    'IncSearch',
    'SpecialComment',
    'Title',
    'PreCondit',
    'Include',
    'Debug',
    'SpecialChar',
    'Conditional',
    'Todo',
    'Special',
    'Label',
    'Delimiter',
    'Number',
    'CursorLineNR',
    ' Define',
    'MoreMsg',
    'Tag',
    'String',
    'MatchParen',
    'Macro',
    'DiffChange',
    'GitGutterChange',
    'cssColor'
  ],
  ['Function', 'StorageClass'],
  [
    'Directory',
    'markdownLinkText',
    'javaScriptBoolean',
    'cssClassName',
    'cssClassNameDot'
  ],
  ['Statement', 'Operator', 'Keyword', 'cssAttr']
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
          `${acc}hi ${curr} guifg=#${scheme[typeIndex]} guibg=NONE
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
hi Normal guifg=#${fg} ctermbg=NONE guibg=NONE
hi Title guifg=#${fg}
hi LineNr guifg=#${comments}
hi Comment guifg=#${comments} gui=italic
hi Search guibg=#1ee8c6 guifg=#000000
${getFgConfig({ scheme, bg })}
`
}
