import { implantState } from '../../src/lib/index.js'

export default [
  {
    fn: () => implantState({ input: 'hello ${state.name}', state: { name: 'world' } }),
    expect: 'hello world',
    info: 'can substitute a simple state variable',
  },
  {
    fn: () =>
      implantState({
        input: 'name: {{state.name}}\nage: {{state.age}}',
        state: { name: 'bob', age: 30 },
      }),
    expect: 'name: bob\nage: 30',
    info: 'can substitute multiple state variables on separate lines',
  },
  {
    fn: () => implantState({ input: 'no state here', state: {} }),
    expect: 'no state here',
    info: 'returns input unchanged when no state brackets present',
  },
  {
    fn: () => implantState({ input: '', state: {} }),
    expect: '',
    info: 'returns empty string unchanged',
  },
  {
    fn: () =>
      implantState({
        input: 'items: ${state.items}',
        state: { items: ['a', 'b', 'c'] },
      }),
    expect: 'items: a b c',
    info: 'joins array state variables with a space',
  },
  {
    fn: () =>
      implantState({
        input: 'list: {{state.items}}',
        state: { items: ['x', 'y'] },
      }),
    expect: 'list: x y',
    info: 'joins array state variables with a space using {{ }} syntax',
  },
  {
    fn: () => {
      try {
        implantState({
          input: 'x ${state.user.name}',
          state: { user: { name: 'alice' } },
        })
        return 'no-throw'
      } catch (e) {
        return e instanceof Error ? e.message : 'threw-non-error'
      }
    },
    expect: 'Unknown State variable ${state.user.name}, val: undefined, url: undefined',
    info: 'throws for an unknown nested state variable',
  },
  {
    fn: () => {
      try {
        implantState({ input: 'x ${state.missing}', state: {} })
        return 'no-throw'
      } catch (e) {
        return e instanceof Error ? e.message : 'threw-non-error'
      }
    },
    expect: 'Unknown State variable ${state.missing}, val: undefined, url: undefined',
    info: 'throws for a missing state variable',
  },
]
