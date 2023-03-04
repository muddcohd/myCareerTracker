const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const Job = require('../models/jobModel');

router.get('/', (req, res) => {
  res.json({ msg: 'GET all jobs' });
});

router.get('/:id', (req, res) => {
  res.json({ msg: 'GET a single job' });
});

//POST a new job
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, company, salary, location } = req.body;
    if (!title || !company || !location) {
      return res
        .status(400)
        .json({ msg: 'Title, company and location are required' });
    }

    const job = await Job.create({ title, company, salary, location });

    res.status(200).json(job);
  })
);
//UPDATE router.post('/:id', (req,res)=>{
router.patch('/:id', (req, res) => {
  res.json({ msg: 'UPDATE a job' });
});

//DELETE a  job
router.delete('/:id', (req, res) => {
  res.json({ msg: 'DELETE job' });
});
module.exports = router;
