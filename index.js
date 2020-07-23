const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware 1
// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     next();
// });

var contactList = [
    {
        name: "Arpan",
        phone:"1111111111"
    },{
        name: "Tony Stark",
        phone: "1234567890"
    },{
        name: "abhishek",
        phone:"8963962486"
    }
]


app.get('/',function(req, res){
    
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home',{
            title:"contacts list",
            contact_list: contacts
        });
    })


    
}); 

app.get('/practice', function(req,res){
    return res.render('practice', {
        title: "let us play with ejs"
    })
})

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('error in creating a contact!')
        return;}

        console.log('********',newContact);
        return res.redirect('back');
    })
    
}); 

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('yup! My express server is running on Port:', port);
})

app.get('/delete-contact/', function(req, res){
    console.log(req.query.id);
    let id = req.query.id

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an bject from database');
            return;
        }

        return res.redirect('back');

    });

});
