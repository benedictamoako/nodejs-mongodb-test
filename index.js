var express = require('express');
var mongoose = require('mongoose');
var userModel = require('./models/user');

var app = express();

//setting view engine
app.set('view engine', 'ejs');
app.use('/public', express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    userModel.find((err,users) => {
        //handling error
        if(err != null) {
            return res.send(err.message);
        }

        res.render('index', {
            users: users
        });
    })

   
})

app.post('/', (req, res) => {
    //save to the datbase
    console.log('request body =', req.body);

    var new_user = new userModel({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    })


    //anonymous function
    new_user.save(err => {
        if (err != null) 
        { 
            return res.send(err.message) 
        } 
        // redirect back to form 
        res.redirect('/') }) 
})

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log('server started');

        //connecting to DB
        mongoose.connect(
            "mongodb+srv://webtech:itlvl300@spectrumplayground.ngcyt.gcp.mongodb.net/webtech?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    });