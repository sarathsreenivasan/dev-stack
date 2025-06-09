var express=require("express")
var app=express()
var mysql=require("mysql")
var cors=require("cors")
app.use(cors())
var jwt=require("jsonwebtoken")
var bodyParser=require("body-parser")
var jsonParser=bodyParser.json()
var urlencodedParser=bodyParser.urlencoded({extended:false})

//db creation
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"library"
})
con.connect((err)=>{
    if(err) throw err
    console.log("connected to the server")
})
//Add User
app.post("/adduser",jsonParser,function(req,res){
    let username=req.body.username
    let password=req.body.password
    let displayname=req.body.displayname
    let Age=req.body.Age
    let place=req.body.place
    let qry = `INSERT INTO user (username, password, displayname, Age, place) VALUES ('${username}', SHA1('${password}'), '${displayname}', ${Age}, '${place}')`;
     con.query(qry,(err,result)=>{
        if(err){
            console.log(result)
            res.send({error:"operation failed"})
        }
        else{
            res.send({succes:"add new user"})
        }
    })
})
//get user
app.get("/user" ,function(req,res){
    con.query("SELECT * FROM user",(err,result,field)=>{
        if (err) throw(err)
            res.send(result)
            console.log(result)
    })
})
//login
app.post("/login",jsonParser,function(req,res){
    const { username, password } = req.body;

    if(!username||!password){
       return res.status(400).send({error:"username and password required"})
    }
    const qry=`select Roll,id from user where username='${username}' and password=sha1('${password}')`
    con.query(qry,(err,result)=>{
        if(err){
            return res.status(500).send({error:"internal server error"})
        }
        if(result.length===0){
            return res.status(200).send({error:"invalid username or password"})
        }
        const user = result[0];
        const payload ={
            id:user.id,
            Roll:user.Roll
        }

        const token = jwt.sign(payload,"123",{expiresIn:'1d'})
        res.status(200).send({
            auth:true,
            token:token,
            Roll:user.Roll
        })
    })
})
//get books
app.get("/books" ,function(req,res){
    con.query("SELECT * FROM mybook",(err,result,field)=>{
        if (err) throw(err)
            res.send(result)
            console.log(result)
    })
})
//get a single book
app.get("/books/:id",function(req,res){
    let id=req.params.id
    con.query("SELECT * FROM mybook  where id="+id,(err,result,field)=>{
        if (err) throw(err)
            res.send(result)
            console.log(result)
    })
})
//add a new book
app.post("/Addbook",jsonParser,function(req,res){
    let book_name=req.body.book_name
    let author=req.body.author
    let discription=req.body.discription
    let price=req.body.price
    let qry=`insert into mybook(book_name,author,discription,price)values('${book_name}','${author}','${discription}',${price})`
    con.query(qry,(err,result)=>{
        if(err){
            console.log(result)
            res.send({error:"operation failed"})
        }
        else{
            res.send({succes:"add new book"})
        }
    })
    
})
//update book
app.get("/books/:id", function(req, res) {
    let id = req.params.id;
    let qry = `SELECT * FROM mybook WHERE id = ?`;
    con.query(qry, [id], function(err, result) {
        if (err) {
            res.status(500).send({ error: "Failed to fetch book" });
        } else {
            res.send(result[0]);
        }
    });
});


app.patch("/update", jsonParser, function (req, res) {
  console.log("Received body:", req.body); 

  let book_name = req.body.book_name;
  let id = req.body.id;
  let author = req.body.author;
  let discription = req.body.discription;
  let price = req.body.price;

  let qry = `UPDATE mybook SET book_name=?, author=?, discription=?, price=? WHERE id=?`;
  con.query(qry, [book_name, author, discription, price, id], (err, result) => {
    if (err) {
      console.log("Error during DB update:", err);
      res.send({ error: "operation failed" });
    } else {
      res.send({ success: "operation success" });
    }
  });
});
//delete a book
app.delete("/delete/:id",function(req,res){
    let id=req.params.id
    let qry=`delete from mybook where id=${id} `
    con.query(qry,(err,result)=>{
        if(err){
            res.send({error:"operation failed"})
        }
        else{
            res.send({succes:"operation succes"})
        }
    })
})
app.listen(9000,function(){
    console.log("server started")
})