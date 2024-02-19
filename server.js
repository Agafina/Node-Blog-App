const express = require('express')
const morgan = require('morgan') 
const blogs = require('./models/blogs')
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

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
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt : -1})
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result})
    })
})
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
    .then(result => {
        res.redirect('/blogs')
    })
    .catch(err => {
        console.log(err)
    })
})
app.get('/blogs/create' ,(req , res) => {
    res.render('create', {title : 'Create new blog'})
})
app.use((req ,res) =>{
    res.status(404).render('404', {title : 'Error page'})
})