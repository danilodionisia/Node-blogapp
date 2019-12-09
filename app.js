const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express();
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {    
    console.log("connected")
}).catch((err) => {
    console.log("Error while try to connect " + err)
})


app.use(express.static(path.join(__dirname, 'public')))





app.use('/admin', admin)
const port = 8080
app.listen(port, () => {
    console.log('Server running on 8080 port')
})