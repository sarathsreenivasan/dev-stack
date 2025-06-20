const express = require("express");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const cors = require("cors");
//var jwt=require("jsonwebtoken")
var bodyParser=require("body-parser")
var jsonParser=bodyParser.json()
var urlencodedParser=bodyParser.urlencoded({extended:false})
// Middleware
app.use(cors());

// MySQL Connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hotel"
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API to add room with images
app.post("/addroom", upload.array("images", 4), (req, res) => {
  const {  type, size, capacity, price, requirement, description, extras } = req.body;
  const images = req.files;
  const requirementsJSON = JSON.parse(requirement);

  const insertRoomQuery = `
    INSERT INTO rooms ( roomno,type, size, capacity, price, requirement, description, extras)
    VALUES ( ?, ?, ?, ?, ?, ?, ?,?)
  `;

  con.query(
    insertRoomQuery,
    [ type, size, capacity, price, JSON.stringify(requirementsJSON), description, extras],
    (err, result) => {
      if (err) {
        console.error("Room insert error:", err);
        return res.status(500).send("Error saving room");
      }

      const roomId = result.insertId;

      if (!images || images.length === 0) {
        return res.send("Room added without images");
      }

      const imageInsertQuery = `
        INSERT INTO room_images (room_id, image, image_name) VALUES ?
      `;

      const imageData = images.map(file => [roomId, file.buffer, file.originalname]);

      con.query(imageInsertQuery, [imageData], (err) => {
        if (err) {
          console.error("Image insert error:", err);
          return res.status(500).send("Error saving images");
        }

        res.send("Room and images added successfully!");
      });
    }
  );
});
//get all room data
app.get("/roomlist" ,function(req,res){
    con.query("SELECT * FROM rooms",(err,result,field)=>{
        if (err) throw(err)
            res.send(result)
            console.log(result)
    })
})

//get images of room
app.get("/roomimage/:id", (req, res) => {
  const roomId = req.params.id;
  const sql = "SELECT image FROM room_images WHERE room_id = ? LIMIT 1";

  con.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error("Image fetch error:", err);
      return res.status(500).send("Error fetching image");
    }

    if (result.length === 0) return res.status(404).send("No image found");

    res.setHeader("Content-Type", "image/jpeg");
    res.send(result[0].image); // send image binary
  });
});
//get single room
app.get('/room/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM rooms WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

//update room
app.patch("/update/:id", jsonParser, function (req, res) {
  console.log("Received body:", req.body); 

  const {  type, size, capacity, price, requirement, description, extras } = req.body;
  
  const id=req.params.id

  let qry = `UPDATE rooms SET type=?, size=?, capacity=?, price=? , requirement=? , description=? , extras=? WHERE id=?`;
  con.query(qry, [type, size, capacity, price, requirement, description, extras, id], (err, result) => {
    if (err) {
      console.log("Error during DB update:", err);
      res.send({ error: "operation failed" });
    } else {
      res.send({ success: "operation success" });
    }
  });
  const roomId = result.insertId;

      if (!images || images.length === 0) {
        return res.send("Room added without images");
      }

      const imageInsertQuery = `
        update room_images (room_id, image, image_name) VALUES ?
      `;

      const imageData = images.map(file => [roomId, file.buffer, file.originalname]);

      con.query(imageInsertQuery, [imageData], (err) => {
        if (err) {
          console.error("Image insert error:", err);
          return res.status(500).send("Error saving images");
        }

        res.send("Room and images added successfully!");
      })
});
//delete a room
app.delete("/delete/:id",function(req,res){
    let id=req.params.id
    let qry=`delete from rooms where id=${id} `
    con.query(qry,(err,result)=>{
        if(err){
            res.send({error:"operation failed"})
        }
        else{
            res.send({succes:"operation succes"})
        }
    })
})
//add the customer details
app.post("/details",jsonParser,function(req,res){
    const { firstname, lastname, age, gender, proof, proofno, date } = req.body;

  const qry = `
    INSERT INTO details 
    (firstname, lastname, age, gender, proof, proofno, date) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    con.query(qry, [firstname, lastname, age, gender, proof, proofno, date], (err, result) =>{
        if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ error: "Operation failed" });
    }
    res.send({ success: "Operation success" });
        
    })
    
})
// get details
app.get('/showdetails', (req, res) => {
  const sql = 'SELECT * FROM details';
  con.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});
//check in 
app.get("/details/:id",jsonParser,function(req,res){
  
  const qry = `select NOW() as checktime`
//const qry=`SELECT CONVERT_TZ(NOW(), 'UTC', 'Asia/Kolkata' ) as checktime;`
  con.query(qry, (err, result) => {
  if(err){
    console.log(err)
  }
  else{
    const time=result[0].checktime
    return res.json({ time: time })
  }
})
})
// Start server
app.listen(9000, () => {
  console.log("Server running on port 9000");
});
