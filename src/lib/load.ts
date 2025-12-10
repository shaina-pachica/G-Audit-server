import fs from 'fs'
import path from 'path'

async function getModelFiles(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        return getModelFiles(fullPath)
      } else if (entry.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.js'))) {
        return [fullPath]
      }

      return []
    })
  );

  return files.flat()
}
export async function load(): Promise<any[]> {
  const modelsDir = path.join(__dirname, '../models')
  const modelFiles = await getModelFiles(modelsDir)

  const modelModules = await Promise.all(
    modelFiles.map(async (file) => {
      const mod = await import(file)
      return Object.values(mod)
    })
  );

  return modelModules.flat()
}
