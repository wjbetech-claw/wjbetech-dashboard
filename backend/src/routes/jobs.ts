import express from 'express'
import jobsController from '../controllers/jobsController'

const router = express.Router()
router.get('/', jobsController.listJobs)
router.post('/', jobsController.createJob)
router.patch('/:id', jobsController.updateJob)

export default router
