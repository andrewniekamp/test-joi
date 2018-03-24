const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/details', (req, res) => res.send('Here are the details!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
