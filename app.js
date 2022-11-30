//requiring express, its helps to manage server and routes
const express = require('express');
const app = express();
//Setting port
const PORT = 1030;
//requiring fs
const fs = require('fs');

//setting view engine
app.set('view engine', 'pug');
app.set('task', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static("public"));

//define routes
app.get("/", (req, res) => {
    res.render("home");
})

app.get("/about", (req, res) => {
    res.render("about", {
        image: './static/about.jpg'
    });
})

app.get("/services", (req, res) => {
    res.render("services", {
        image: './static/service.jpg'
    });
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/details", (req, res) => {
    if (!fs.existsSync('./public/contacts/info.txt'))
        res.send("<h2>file is not available</h2>");
    let array = fs.readFileSync('./public/contacts/info.txt').toString().split('\n');
    const newArray = filerArray(array);
    res.render("details", {
        result: newArray
    });
})

function filerArray(arr){
    const allDetails = [];
    arr.forEach(data => {
        if(data === ''){}
        else allDetails.push(data);
    })
    return allDetails;
}

app.get("/gallery", (req, res) => {
    // let arr = ;
    res.render("gallery", {
        image: ['https://picsum.photos/seed/picsum/200/300', 'https://picsum.photos/200/300?grayscale', 'https://picsum.photos/id/237/200/300', 'https://picsum.photos/200/300?grayscale']
    });
})

const check = [];
app.post("/get_contact", (req, res) => {
    let { name, email, contact, city } = req.body;

    if (name === '' || email === '' || contact === '' || city === ''){
        return res.send('<h1> Fields are missing... </h1>');
    }
    else if (emailExist(check, email)){
        res.render('welcome1');
    }
    else {
        check.push(email);
        let data = (name + ',' + email + ',' + contact + ',' + city);
        fs.appendFile('./public/contacts/info.txt', data +'\n', err => {
            if (err) throw err;
            res.redirect('./details');
            
        })
    }
 

})

function emailExist(check, data) {
    for (let i of check) {
        console.log(i + " === " + data);
        if (i == data) {
            return true;
        }
    }
    return false;
}

app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log(`PORT ${PORT}`);
})
