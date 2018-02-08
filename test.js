const test = require('ava')
const m = require('.')

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
