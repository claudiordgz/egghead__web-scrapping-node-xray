# The OverClocked ReMix Audio Player

What started as watching a tutorial on how to use X-Ray and Nightmare to scrap a website ended up being a project I've been wanting to try out for a while.

Basically we retrieve the albums as follows:

```javascript
    const xray = new Xray()
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
            resolve(resString)
          })
              .catch((err) => {
                reject(err)
              })
      })
```

Please do not overload OCReMix with requests, they don't like their site being scrapped. 

I want to combine the following technologies:

  - Serverless and AWS Lambda
  - Redis
  - AWS Dynamo
  - GraphQL
  
That is for the backend, which basically is going to be two cron jobs. The first checks if there is new jamz on OverClocked ReMix once a day. The second one is to check a cache, if that cache has new items, retrieve goodies from MusicBrainz and save it all to a database and S3 (for the album pictures).

Once the cron jobs are done in AWS Lambda we want another Lambda with a REST API to read the data and a GraphQL Schema to pull that API however I want.

The plumbing is the easy part.


