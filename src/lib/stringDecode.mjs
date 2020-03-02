import entities from '@magic/entities'

export const stringDecode = str => {
  entities.forEach(([num, symbol, name]) => {
    if (symbol) {
      str = str.replace(`&${name};`, symbol).replace(`&#${num};`, symbol)
    }
  })

  return str
}
