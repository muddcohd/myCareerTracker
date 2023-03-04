const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'GET all jobs' });
});

router.get('/:id', (req, res) => {
  res.json({ msg: 'GET a single job' });
});

//POST a new job
router.post('/', (req, res) => {
  res.json({ msg: 'POST a new job' });
});
//UPDATE router.post('/:id', (req,res)=>{
router.patch('/:id', (req, res) => {
  res.json({ msg: 'UPDATE a job' });
});

//DELETE a  job
router.delete('/:id', (req, res) => {
  res.json({ msg: 'DELETE job' });
});
module.exports = router;
