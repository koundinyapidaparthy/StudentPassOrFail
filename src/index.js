const express= require('express');
const path=require('path');
const hbs=require("hbs");
const app= express();
const staticPath=path.join(__dirname,"../public");
const viewsPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");
const fetch=require("node-fetch");
const port=process.env.Port ;


app.use(express.static(staticPath))
app.use(express.json());
app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    res.render("index");
})
app.post("/details",async(req, res)=>{
    try{
        const val=req.body.value;      
        const values=val.split(",");
        const lenght= values.length;
        console.log("Data u have Entered Stored in a Array "+values);
        console.log("And Array lenght is "+lenght);
        
        var Array=[];
        for(let  i=0 ;i<lenght;i++){
            console.log("fetching data from "+ values[i]+"\nWaiting for Api....");
             await fetch(`https://terriblytinytales.com/testapi?rollnumber=${values[i]}`)
            .then(res=>res.text()).then(data=>{
                Array[i]=data
            });
        }
        console.log("fetched Array Information "+Array);
        var newArray = [];
        for(let i=0;i<lenght;i++){
            newArray[i]=i;
        }
        res.send(`<table style="border:1px solid black;border-collapse: collapse;">
                     <tr>
                     <th style="border:1px solid black">StudentNo</th>
                     <th style="border:1px solid black">Result</th>
                     <tr>
                    ${newArray.map(i=>{
                        return  (`<tr>
                       <td style="border:1px solid black"> ${values[i]}</td>
                       <td style="border:1px solid black">${Array[i]}</td>
                       </tr>`)
                    })}
                        </table>`)
    }
    catch(e){console.log(e)}
})

app.listen(port,()=>{console.log("successfully started")})