const express=require('express')

const app=express();
app.get("/",(req,res)=>{
    return res.send("i am running")
});

app.listen(8000,()=>{
    console.log("server started");
})
