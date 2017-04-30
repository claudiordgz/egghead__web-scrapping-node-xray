const Xray = require('x-ray')
const fs = require('fs')
const winston = require('winston')
const magnetLink = require('magnet-link')
const xray = new Xray()

function getMagnetLink (item) {
  return new Promise((resolve, reject) => {
    magnetLink(item.torrentUri, (err, link) => {
      if (err) {
        winston.log('error', 'couldn\'t get magnet link')
        reject(err)
      }
      resolve(link)
    })
  })
}

function mergeMagnetArrayToResults (magnetArray, results) {
  let lResults = results
  magnetArray.forEach((magnetUri, index) => {
    lResults[index].magnetUri = magnetUri
  })
  return lResults
}

xray('http://bt.ocremix.org/index.php?order=date&sort=descending', '.trkInner tr:not(:first-child)',
  [{
    name: '.colName a',
    torrentUri: '.colName a@href',
    size: '.colSize',
    info: '.colName .torrentTag:last-child a@href',
    added: '.colAdded',
    category: '.colCategory'
  }])((err, results) => {
    if (err) {
      winston.error('no results from ocremix', err)
    }

    results = results
          .filter((item) => item.torrentUri.length !== 0)
    let promises = results
            .map(getMagnetLink)

    Promise.all(promises)
          .then((magnets) => {
            const resJSON = mergeMagnetArrayToResults(magnets, results)
            const resString = JSON.stringify(resJSON, null, '\t')
            fs.writeFile('./results.json', resString, 'utf8', (err) => {
              if (err) {
                winston.log('error', 'couldn\'t write results')
              } else {
                winston.log('info', 'wrote results json')
              }
            })
          })
  })
