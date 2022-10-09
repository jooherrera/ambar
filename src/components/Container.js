import { cliError, cliSuccess, cliWarn } from '../libs/index.js'
import fs from 'fs'
import path from 'path'

class Container {
  constructor(fileDir) {
    this.fileDir = `${path.resolve()}/src${fileDir}`
    this.readOrCreateFile()
  }

  /* ------------------------------------------ */
  /*                   Methods                  */
  /* ------------------------------------------ */

  /* --------- Begin readOrCreateFile --------- */
  async readOrCreateFile() {
    try {
      await fs.promises.readFile(this.fileDir, 'utf-8')
    } catch (err) {
      if (err.code === 'ENOENT') {
        cliWarn(`File ${this.fileDir} does not exists\n${err.message}`)
        await fs.promises.writeFile(this.fileDir, '[]', 'utf-8')
        cliSuccess(`New file ${this.fileDir} created`)
      } else {
        cliError(`Error Code: ${err.code} | There was an unexpected error when trying to read ${this.fileDir}\n${err.message}`)
      }
    }
  }
  /* ---------- End readOrCreateFile ---------- */

  /* --------------- Begin save --------------- */
  async save(data) {
    try {
      const jsonData = JSON.parse(await fs.promises.readFile(this.fileDir, 'utf8'))
      const newData = data
      if (jsonData.length) {
        const lastItem = jsonData[jsonData.length - 1]
        const lastId = lastItem.id ? lastItem.id : undefined
        newData['id'] = lastId ? lastId + 1 : 1
      } else {
        newData['id'] = 1
      }
      const jsonNewData = jsonData
      jsonNewData.push(newData)
      await fs.promises.writeFile(this.fileDir, JSON.stringify(jsonNewData))
      cliSuccess('Product saved!')
      return await newData['id']
    } catch (err) {
      cliError(err.message)
    }
  }
  /* ---------------- End save ---------------- */

  /* -------------- Begin getById ------------- */
  async get(id) {
    try {
      const jsonData = JSON.parse(await fs.promises.readFile(this.fileDir, 'utf8'))
      const filteredData = jsonData.filter((elem) => elem.id === id)
      cliSuccess(`Object with id ${id} retrieved!`)
      return filteredData[0]
    } catch (err) {
      cliError(err.message)
    }
  }
  /* --------------- End getById -------------- */

  /* -------------- Begin getAll -------------- */
  async getAll() {
    try {
      const jsonData = JSON.parse(await fs.promises.readFile(this.fileDir, 'utf-8'))
      cliSuccess('Array retrieved!')
      return jsonData
    } catch (err) {
      cliError(err.message)
    }
  }
  /* --------------- End getAll --------------- */

  /* ------------ Begin deleteById ------------ */
  async delete(id) {
    try {
      const jsonData = JSON.parse(await fs.promises.readFile(this.fileDir, 'utf8'))
      const jsonNewData = jsonData.filter((elem) => elem.id != id)
      await fs.promises.writeFile(this.fileDir, JSON.stringify(jsonNewData))
      cliSuccess(`Object with id ${id} deleted!`)
    } catch (err) {
      cliError(err.message)
    }
  }
  /* ------------- End deleteById ------------- */

  /* ------------- Begin deleteAll ------------ */
  async deleteAll() {
    try {
      await fs.promises.unlink(this.fileDir)
      cliSuccess('Array deleted!')
    } catch (err) {
      cliError(err.message)
    } finally {
      fs.promises.writeFile(this.fileDir, '[]', 'utf8')
      cliSuccess(`File ${this.fileDir} cleared`)
    }
  }
  /* -------------- End deleteAll ------------- */
}

export { Container }
