var express = require('express');
var router = express.Router();
var helpers=require('../helpers/helpers')

/* GET home page. */
router.get('/',(req,res)=>{
  res.render('index')
})
router.post('/',(req,res)=>{
  console.log(req.body);
  helpers.addUsers(req.body).then((response)=>{
   
    res.redirect('/')
  })
  })
  router.get('/users',async (req,res)=>{
    await helpers.getUsers().then((users)=>{
     res.render('users',{users})
    })
    router.post('/search',async(req,res)=>{
     console.log(req.body);
     await  helpers.findUser(req.body).then((users)=>{
        res.render('users',{users})
      })
    })
  
    
    
  })

module.exports = router;
