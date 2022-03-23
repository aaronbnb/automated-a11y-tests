const http = require('http')
const fs = require('fs')

const AxeBuilder = require('@axe-core/webdriverjs');
const WebDriver = require('selenium-webdriver');


const driver = new WebDriver.Builder().forBrowser('chrome').build()

let axeResults

driver.get('https://dequeuniversity.com/demo/mars/').then(() => {
  new AxeBuilder(driver).analyze((err, results) => {
    if (err) {
      // Handle error somehow
    }
  
    console.log(results);
    axeResults = results

  });
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' })
  res.end(JSON.stringify(axeResults))
})
server.listen(process.env.PORT || 3000)
