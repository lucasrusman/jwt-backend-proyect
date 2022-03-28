const express = require("express");
const checkAuth = require("../middleware/check-auth")
const multer = require("multer");
const conexion = require("../database");

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid){
      error = null;
    }
    cb(error, "backend/images");
  },
  filename:(req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


router.post('',checkAuth, multer({storage: storage}).single("image") ,(req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  title = req.body.title,
  content = req.body.content,

  conexion.query('INSERT INTO posteo (title, content) VALUES (?, ?); ', [title, content], (error, rows)=>{
    if(error){console.log(error)}
    res.json({Status : "Posteo creado"})
  })
});

router.put('/:id',checkAuth, (req, res, next) => {
  _id = req.params.id,
  title =req.body.title,
  content = req.body.content
  conexion.query('UPDATE posteo SET title = ?, content = ? [WHERE id = ?];', [title, content, _id])
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'Update successful'});
    })
});


router.get("/:id", (req, res, next) =>{
  id = req.params.id
  conexion.query('SELECT * FROM posteo WHERE id = ?', [id], (error, rows)=>{
    if(error || rows.length == 0){
      res.status(404).json({Status: "Post not found"})
      }
    res.status(200).json(rows[0]);
    })
  })

// router.get('',(req, res) => {
//   const pageSize = +req.query.pagesize;
//   const currentPage = +req.query.page;
//   const postQuery = Post.find();
//   if (pageSize && currentPage){
//     postQuery
//       .skip(pageSize * (currentPage - 1))
//       .limit(pageSize)
//   }
//   postQuery.then(documents => {
//       res.status(200).json({
//         message: 'Post fetched succesfullly!',
//         posts: documents
//       });
//     });

// });

router.delete("/:id",checkAuth,(req,res,next) => {
  id = req.params.id
  conexion.query('DELETE FROM posteo WHERE id = ?;', [id], (error, rows)=>{
    if(error || rows.affectedRows == 0){
      console.log(error);
      res.status(404).json({Status: "Post not found"})
      }else{
        res.status(200).json({Status : "Post delete"});
      }
    })
  })

module.exports = router;
