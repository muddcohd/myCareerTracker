const Job = require('../models/jobModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

//get all jobs
const getAllJobs = asyncHandler(async (req, res) => {
  const user_id = req.user_id;
  const jobs = await Job.find({ user_id }).sort({ createdAt: -1 });

  if (!jobs) {
    res.status(404).json({ error: 'There are no jobs found' });
  }

  res.status(200).json(jobs);
});

//get single job
const getJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such job' });
  }

  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ error: 'No such job' });
  }

  return res.status(200).json(job);
});

//create new job
const createJob = asyncHandler(async (req, res) => {
  const { title, company, location, salary } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!company) {
    emptyFields.push('company');
  }
  if (!location) {
    emptyFields.push('location');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  const user_id = req.user._id;
  const job = await Job.create({ title, company, salary, location, user_id });

  res.status(200).json(job);
});

//delete job
const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such job' });
  }

  const job = await Job.findOneAndDelete({ _id: id });

  if (!job) {
    return res.status(404).json({ error: 'No such job' });
  }
  res.status(200).json(job);
});
//update a job
const updateJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such job' });
  }

  const job = await Job.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!job) {
    return res.send(404).json({ error: 'No such job' });
  }
  res.status(200).json(job);
});

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
};
