const express = require('express');
const mongoose = require('mongoose');

const app = express();

const Articles = require('./models/Articles')
mongoose.connect("mongodb+srv://engrayanhnide98:rayanrama123321@firstdatabase.9cnoxyg.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('Success Connect');
    })
    .catch((err) => {
        console.log(`Error Connect: ${err}`);
    });
app.use(express.json())
//api
//Articles End Point
//ADD Articles
app.post('/articles',async(req,res)=>{
    const articleTitle = req.body.title
const artileBody = req.body.body
 
    const newArticle = new Articles()
    newArticle.title=articleTitle
    newArticle.body=artileBody
    newArticle.numberOfLike=200
    await newArticle.save()
    res.json(newArticle)

})

//View Articles

app.get('/viewArticle',async(req,res)=>{
    // const id =  req.params
    // const article =await Articles.findById(id)
    const allArticles= await Articles.find()
       res.json(allArticles)
})
//Delete Articles
app.delete('/deleteArticles/:articleId',async(req,res)=>{
    const id  = req.params.articleId
    try{
        const article = await Articles.findByIdAndDelete(id)
        res.send(article)
        return
    }
    catch(err){
        res.send(`Error : ${err}`)
    }

})

app.get('/showArticles',async(req,res)=>{
    const articles = await Articles.find()
    res.render('allArticles.ejs',{
        allArticles : articles
    })
})



////////////////////////////////////////////
// app.get('/hello',(req,res)=>{
   
//     let numbers = ''
//     for (let i=0 ; i<=100; i++){
//         numbers +=i +  ','

//     }
//     res.send(`the numbers are ${numbers}`)
// })
// app.get('/hi',(req,res)=>{
//     res.send('Vistited Hi ')
// })

// app.get('/test',(req,res)=>{
//     res.send('Vistited test ')
// })
// app.post('/addComment',(req,res)=>{
//     res.send('post Request to add')
// })

// app.delete('/testingDelete',(req,res)=>{
//     res.send('Deleted Done')
// })

//importanty Example

//path parameter
// app.get('/add/:number1/:number2',(req,res)=>{
//      const num1 = req.params.number1
//      const num2 = req.params.number2
//      const total = Number(num1) + Number(num2)
//     res.send(`the total is   : ${total}`)
// })
/////////////////
//body parameter

/////////////////
// app.get('/addFromPostman',(req,res)=>{
//     console.log(req.query);
//     let numbers = ''
//     for (let i=0 ; i<=100; i++){
//         numbers +=i +  ','

//     }
//         res.render('numbers.ejs',{
//             name:'rayan',
//             age:40,
//             numbers:numbers
//         })
   
//    res.send(`the name is ${req.body.name}, age is ${req.query.age   }`)

// JSON
// res.json({
//     name:req.body.name,
//     age:req.query.age,
//     language:'arabic'
// })

//EJS
// res.sendFile(__dirname + '/views/numbers.ejs')

// })

// Server
app.listen(3000,()=>{
    console.log('listen in port 3000');
})



