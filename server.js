const express = require('express')

const app = express();
app.set('view engine' ,'ejs')
app.listen(3000)

app.get( '/',(req , res) => {
    const blogs = [
        {title: 'The main man' , snippet: 'Looking forward to life with my brothers'},
        {title: 'The main man' , snippet: 'Looking forward to life with my brothers'},
        {title: 'The main man' , snippet: 'Looking forward to life with my brothers'}
    ]
    res.render('index', {title : 'Home', blogs})
})
app.get('/about' ,(req , res) => {
    res.render('about', {title : 'About' })
})
app.get('/blogs/create' ,(req , res) => {
    res.render('create', {title : 'Create new blog'})
})
app.use((req ,res) =>{
    res.status(404).render('404', {title : 'Error page'})
})