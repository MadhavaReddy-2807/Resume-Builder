const express=require('express')
var cors = require('cors')
const bodyparser=require('body-parser');
const {MongoClient}=require('mongodb');
const { error } = require('console');
const app=express();
app.use(cors())
require('dotenv').config()
app.use(bodyparser.json())
const port=process.env.PORT||4000;
console.log(process.env.MONGO)
const url=process.env.MONGO
const client=new MongoClient(url);
app.post('/resumes',async (req,res)=>{
    const resume=req.body;
    const dbname="ResumeBuilder";
    const db=client.db(dbname);
    const collection=db.collection("resumes");
     const insert= await collection.insertOne(resume);
    res.send({"success":"true"});
})
app.get('/resumelist',async(req,res)=>{
    const {email}=req.query;
    const dbname="ResumeBuilder";
    const db=client.db(dbname);
    const collection=db.collection("resumes");
    const resumelist=await collection.find({email:email}).toArray();
    res.json(resumelist);
})
app.get('/',(req,res)=>{
    res.send('Hello')
})
// app.get('/')
app.listen(port,()=>{
  console.log("hello")
})
app.get('/resumes',async(req,res)=>{
    const {id}=req.query;
    const dbname="ResumeBuilder";
    const db=client.db(dbname);
    const collection=db.collection("resumes");
    const resumelist=await collection.findOne({id:id})
    res.json(resumelist);
})
app.put('/resumes',async(req,res)=>{
    const { id, resumeinfo } = req.body;
    const {_id,...updateddata}=resumeinfo;
    console.log(updateddata.education[0]);
    //extract data other than _id because put changes the data but _id is immutable
     const dbname="ResumeBuilder";
     const db=client.db(dbname);
     const collection=db.collection("resumes");
     const result = await collection.updateOne(
        { id },
        { $set: updateddata })
        res.status(200).send({succes:true})

    //  res.send(1); we cnanot send data to the res in put request
})
app.delete('/resumes',async(req,res)=>{
     const {id}=req.body;
     const dbname="ResumeBuilder";
     const db=client.db(dbname);
     const collection=db.collection("resumes");
      const result=await collection.deleteOne({id:id});
      res.send({success:true})

})