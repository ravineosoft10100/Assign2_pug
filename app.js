//requiring express, its helps to manage server and routes
const express = require('express');
const app = express();
//Setting port
const PORT = 3030;
//requiring fs
const fs = require('fs');

//setting view engine
app.set('view engine','pug');
app.set('task','./views');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/static",express.static("public"));

//define routes
app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/about",(req,res)=>{
    res.render("about", {
        image : './static/about.jpg'
    });
})

app.get("/services",(req,res)=>{
    res.render("services",{
        image: './static/service.jpg'
    });
})

app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.get("/gallery",(req,res)=>{
    // let arr = ;
    res.render("gallery",{
        image:  ['https://picsum.photos/seed/picsum/200/300','https://picsum.photos/200/300?grayscale','https://picsum.photos/id/237/200/300','https://picsum.photos/200/300?grayscale']
    });
})

app.post("/get_contact",(req,res)=>{
    let {name,email,contact,city}=req.body;

    let file = "./public/contacts/"+email;
    let data = ('Name: '+name+'\nEmail: '+email+'\nContact: '+contact+'\nCity: '+city);

    if(!fs.existsSync(file)){
        fs.mkdir(file, (err)=>{
            if(err) throw err;
            else{
                fs.writeFile(file+'/information.txt',data,(err)=>{
                    res.render("welcome");
                    if(err) throw err;
                });
            }
        });

    }else{
        res.render("welcome1");
    }
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`PORT ${PORT}`);
})
