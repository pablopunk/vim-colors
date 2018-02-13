const test = require('ava')
const m = require('.')

const stringMe = (str, color) =>
  `hi ${str} guifg=#${color}`

const testTypeAndColor = (t, types, scheme, color) => {
  const output = m('name', { scheme })
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

test('Highlights const/var/let/function', t => {
  testTypeAndColor(t, ['Function', 'StorageClass', 'Type'], ['123456'], '123456')
})

test('Highlights export/import/from/require', t => {
  testTypeAndColor(t, ['Include', 'Constant'], [
    '000000',
    '123456'
  ], '123456')
})

test('Highlights strings', t => {
  testTypeAndColor(t, 'String', [
    '000000',
    '000000',
    '123456'
  ], '123456')
})

test('Highlights if/switch/case/default/for', t => {
  testTypeAndColor(t, ['Label', 'Repeat', 'Conditional'], [
    '000000',
    '000000',
    '000000',
    '123456'
  ], '123456')
})

test('Highlights true/false/class/this/extends/operators', t => {
  testTypeAndColor(t, ['Boolean', 'Keyword', 'Special', 'Operator'], [
    '000000',
    '000000',
    '000000',
    '000000',
    '123456'
  ], '123456')
})

test('Highlights return/{}/()/[]', t => {
  testTypeAndColor(t, [
    'Statement',
    'Delimiter',
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
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '123456'
  ], '123456')
})

test('Highlights comments with default', t => {
  testTypeAndColor(t, 'Comment', [], '5e6c70')
})
