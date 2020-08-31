import path from 'path'

const dir = __dirname

export function resolvePathFromSrc (file) {
  return path.resolve(dir, '../', file)
}
