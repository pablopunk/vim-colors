const test = require('ava')
const m = require('.')

const stringMe = (str, color) =>
  `hi ${str} guifg=#${color}`

const testTypeAndColor = (t, types, scheme, color, bg = false) => {
  let output

  if (bg) {
    output = m('name', {bg, scheme})
  } else {
    output = m('name', {scheme})
  }

  if (Array.isArray(types)) {
    types.map(type => t.regex(output, new RegExp(stringMe(type, color))))
  } else {
    t.regex(output, new RegExp(stringMe(types, color)))
  }
}

test('Sets dark background for black', t => {
  t.regex(m('name', {bg: '000000'}), /set background=dark/)
})

test('Sets light background for white', t => {
  t.regex(m('name', {bg: 'ffffff'}), /set background=light/)
})

test('Sets default background as dark', t => {
  t.regex(m('name', {}), /set background=dark/)
})

test('Sets default foreground as white', t => {
  t.regex(m('name', {}), /hi Normal guifg=#ffffff/)
})

test('Sets black background in regular font', t => {
  t.regex(m('name', {bg: '000000'}), /hi Normal guifg=#[a-z0-9]{6,} guibg=#000000/i)
})

test('Sets t_Co to 256', t => {
  t.regex(m('name'), /set t_Co=256/)
})

test('Fails without a name', t => {
  const err = t.throws(() => m(), TypeError)

  t.regex(err.message, /provide a name/i)
})

test('Highlights function/var/const/let/{}/()/[]', t => {
  testTypeAndColor(t, [
    'StorageClass',
    'Type',
    'Identifier',
    // {}
    'jsBraces',
    'jsFuncBraces',
    'jsIfElseBraces',
    'jsTryCatchBraces',
    'jsModuleBraces',
    'jsObjectBraces',
    'jsFinallyBraces',
    'jsSwitchBraces',
    'jsTemplateBraces',
    // ()
    'jsParens',
    'jsFuncParens',
    // []
    'jsBrackets'
  ], [
    '123456'
  ], '123456')
})

test('Highlights export/import/from/require/numbers/special-chars/function-name', t => {
  testTypeAndColor(t, ['Include', 'Constant', 'Number', 'SpecialChar', 'Function'], [
    '000000',
    '123456'
  ], '123456')
})

test('Highlights strings/if/switch/case/default/for', t => {
  testTypeAndColor(t, ['String', 'Label', 'Repeat', 'Conditional'], [
    '000000',
    '000000',
    '123456'
  ], '123456')
})

test('Highlights status line and popup menu', t => {
  const output = m('name', {
    bg: 'bbbbbb',
    fg: 'ffffff',
    scheme: ['', '', '123456']
  })
  // Uses guibg for font and guifg for background
  t.regex(output, /hi StatusLine guifg=#123456 guibg=#bbbbbb/)
  t.regex(output, /hi PMenu guifg=#123456 guibg=#bbbbbb/)
})

test('Highlights characters/try/catch/throw/return/new/bool/class/this/extends/operators', t => {
  testTypeAndColor(t, [
    'Character',
    'Exception',
    'Statement',
    'Boolean',
    'Keyword',
    'Special',
    'Operator'
  ], [
    '000000',
    '000000',
    '000000',
    '123456'
  ], '123456')
})

test('Highlights comments and line numbers with default (black bg)', t => {
  testTypeAndColor(t, 'Comment', [], '5e6c70')
  testTypeAndColor(t, 'LineNr', [], '5e6c70')
})

test('Highlights comments and line numbers with default (white bg)', t => {
  testTypeAndColor(t, 'Comment', [], 'a0a0a0', 'ffffff')
  testTypeAndColor(t, 'LineNr', [], 'a0a0a0', 'ffffff')
})

test('Comments are italic', t => {
  const output = m('name')
  t.regex(output, /hi Comment guifg=#[a-z0-9]{6,} guibg=#[a-z0-9]{6,} gui=italic/)
})

test('It contains the given name', t => {
  const output = m('custom-name')
  t.regex(output, /let g:colors_name = "custom-name"/)
})

test('The name does not contain spaces', t => {
  const output = m('my custom name')
  t.regex(output, /let g:colors_name = "my-custom-name"/)
})
