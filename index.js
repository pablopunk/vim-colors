const defaults = {
  dark: true,
  light: false,
  bg: '000000',
  fg: 'ffffff',
  menus: '222222',
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
    'cssIncludeKeyword',
    'Keyword'
  ],
  [
    'IncSearch',
    'Title',
    'PreCondit',
    'Debug',
    'SpecialChar',
    'Conditional',
    'Todo',
    'Special',
    'Label',
    'Delimiter',
    'Number',
    'CursorLineNR',
    'Define',
    'MoreMsg',
    'Tag',
    'String',
    'MatchParen',
    'Macro',
    'DiffChange',
    'GitGutterChange',
    'cssColor'
  ],
  ['Function'],
  [
    'Directory',
    'markdownLinkText',
    'javaScriptBoolean',
    'Include',
    'Storage',
    'cssClassName',
    'cssClassNameDot'
  ],
  ['Statement', 'Operator', 'cssAttr']
]

const normalizeName = str => {
  let normalized = `${str}`

  normalized = normalized
    .replace(/[^a-zA-Z0-9_]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-/, '')
    .replace(/-$/, '')

  return normalized
}

const getFgConfig = scheme =>
  fgTypes
    .map((typeArr, typeIndex) =>
      typeArr.reduce(
        (acc, curr) =>
          `${acc}hi ${curr} guifg=#${scheme[typeIndex]} guibg=NONE\n`,
        ''
      )
    )
    .join('')

module.exports = (name, colors) => {
  if (!name || typeof name !== 'string') {
    throw new TypeError('Please provide a name for the colorscheme')
  }
  const { comments, dark, bg, fg, menus } = { ...defaults, ...colors }
  const scheme = colors ? fillScheme(colors.scheme) : []

  return `hi clear
syntax reset
let g:colors_name = "${normalizeName(name)}"
set background=${dark ? 'dark' : 'light'}
set t_Co=256
hi Normal guifg=#${fg} ctermbg=NONE guibg=#${bg} gui=NONE

${getFgConfig(scheme)}

hi Pmenu guifg=#${fg} guibg=#${menus}
hi SignColumn guibg=#${bg}
hi Title guifg=#${fg}
hi LineNr guifg=#${comments} guibg=#${bg}
hi NonText guifg=#${comments} guibg=#${bg}
hi Comment guifg=#${comments} gui=italic guibg=#${bg}
hi SpecialComment guifg=#${comments} gui=italic guibg=#${bg}
hi CursorLine guibg=#${menus}
hi TabLineFill gui=NONE
hi TabLine guibg=#${menus}
hi StatusLine gui=bold guibg=#${menus} guifg=#${fg}
hi StatusLineNC gui=NONE guibg=#${bg} guifg=#${fg}
hi Search guibg=#${comments} guifg=#${dark ? fg : bg}
hi VertSplit gui=NONE guifg=#${menus} guibg=NONE
hi Visual gui=NONE guibg=#${menus}
`
}
