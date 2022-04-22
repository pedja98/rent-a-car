require('dotenv').config()
const path = require('path');
const express = require('express')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const apiRoutes = require('./routes/apiRoutes')

app.use('/images', express.static(path.join('images')));
app.use("/", apiRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`LISTENING PORT ${port}`)
})