const express = require('express')
const morgan = require('morgan') 
const mongoose = require('mongoose');
const blogRouters = require('./routers/blogRouter')


const app = express();

const dbURI = 'mongodb+srv://agafina:agafina12@cluster0.2iuve6p.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result) =>  {
    app.listen(3000)
    console.log("Connected to DB")
})
.catch(err => console.log(err))


app.set('view engine' ,'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(morgan('dev'))



app.get( '/',(req , res) => {
    res.redirect('/blogs')
})
app.get('/about' ,(req , res) => {
    res.render('about', {title : 'About' })
})
// blog routes
app.use('/blogs', blogRouters)

app.use((req ,res) =>{
    res.status(404).render('404', {title : 'Error page'})
})