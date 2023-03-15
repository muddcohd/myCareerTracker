const express = require('express');
const {
  createJob,
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
} = require('../controllers/jobController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//require auth for all jobs
router.use(requireAuth);

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
