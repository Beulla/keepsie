const db=require("../models")
const Notes=db.Notes
const mysql=require("mysql2")

const connection = mysql.createConnection({ host: "localhost",port: 3306,database: "assessment",user: "root",password: "#Increaseby2."});
connection.connect(function (err) {
    if(err){
        console.log("error occurred while connecting");
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });
function generateDate(){
    const defaultDate = new Date();
    const year = defaultDate.getFullYear();
    const month = String(defaultDate.getMonth() + 1).padStart(2, '0');
    const day = String(defaultDate.getDate()).padStart(2, '0');
    const hours = String(defaultDate.getHours()).padStart(2, '0');
    const minutes = String(defaultDate.getMinutes()).padStart(2, '0');
    const seconds = String(defaultDate.getSeconds()).padStart(2, '0');

    const formattedDefaultTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDefaultTime
}
function checkUserExistance(userId) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE id=${userId}`;
    
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(true);
                } else {
                    resolve(false); 
                }
            }
        });
    });
}
function checkNoteExistance(noteId){
    return new Promise((resolve,reject)=>{
        const sql=`select *from notes where id=${noteId};`
        connection.query(sql,(err,result)=>{
        if(err) {
            console.error("Error executing SQL query: ",err)
            reject(err)
        }
        else{
            if(result.length>0){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }
        
    })
    })
    
}
exports.create=async(req,res)=>{
    const userId=req.params.id
    const noteTitle=req.body.noteTitle
    const noteDescription=req.body.noteDescription
    const createdAt=generateDate()
    const updatedAt=generateDate()
    if(checkUserExistance(userId)){
        const sql=`insert into notes (userId, noteTitle, noteDescription, createdAt, updatedAt) values ('${userId}','${noteTitle}','${noteDescription}','${createdAt}','${updatedAt}');`
        connection.query(sql,(err)=>{
            if(err) {
                throw err
            }
            else{
                res.send({message:"Successfully created note!"})
            }
        })
    }
    else{
        res.send({message:"user does not exist."})
    }
}
exports.findAll = (req, res) => {
    const userId = req.params.id;
    const sql = `SELECT * FROM notes WHERE userId=${userId}`;
    if(checkUserExistance(userId)){
        connection.query(sql, (err, results) => {
            if (err) {
              console.error('Error executing SQL query:', err);
              res.status(500).send({ message: 'Internal Server Error' });
            } else {
              res.send(results);
            }
          });
    }
    else{
        res.send({message:"failed operation"})
    }
};
exports.update=(req,res)=>{
    console.log(req.params)
    const id=req.params.userId
    console.log(checkUserExistance(id))
    const sql = `update notes set noteTitle = '${req.body.noteTitle}',noteDescription = '${req.body.noteDescription}',updatedAt = '${generateDate()}' where userId = '${id}' and id='${req.params.id}';`; 
    if(checkUserExistance(id)&&checkNoteExistance(req.params.id)){
        connection.query(sql,(err)=>{
            if(err){
                console.error("Error updating note")
            }
            else{
                res.send({message:"successfully updated note"}).status(200)
            }
        })
    }
    else{
        res.send({mesage:"failed operation"})
    }
}
exports.delete=(req,res)=>{
    const id=req.params.userId
    const sql = `delete from notes where userId = '${id}' and id='${req.params.id}';`; 
    if(checkUserExistance(id)&&checkNoteExistance(req.params.id)){
        connection.query(sql,(err)=>{
            if(err) throw err
            res.send({message:"successfully deleted note"})
        })
    }
    else{
        res.send()
        return
    }
}