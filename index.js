const express=require("express")
const app=express()
const port=8000
const path=require("path")
const {v4:uuid4}=require("uuid")
const methodOverride=require("method-override")
const { send } = require("process")
app.set("view engine","ejs")
app.set("Views",path.join(__dirname,"Views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
let posts=[
    {
        id:uuid4(),
        username:"ashutoshtamboli",
        content:"unlatch your true potential"
    },
    {
        id:uuid4(),
        username:"sushantjain",
        content:"i got my first  intership"
    },
    {
        id:uuid4(),
        username:"ashwinnagapure",
        content:"i got pacakge of 42 LPA"
    }
]
app.listen(port,()=>{
    console.log(`listing on port ${port}`)
})
app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/post/new",(req,res)=>{
    res.render("form.ejs",{posts})
})
app.post("/post",(req,res)=>{
    let id=uuid4()
    let {username,content}=req.body
    posts.push({id,username,content})
    console.log(req.body)
    res.redirect("post")
})
app.get("/post/:id",(req,res)=>{
    let {id}=req.params
    let post=posts.find((p)=>id===p.id)
    res.render("show.ejs" ,{post})
})
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params
    let newContent=req.body.content

    let post=posts.find((p)=>id===p.id)
    post.content=newContent

    res.redirect("/post")
})
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params
    let post=posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post})

})
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params
    posts=posts.filter((p)=>id!==p.id)
    res.redirect("/post")
})