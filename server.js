// external imports 
const express = require('express')
const port = 3000

// init app
const app = express()

app.get("/", (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
