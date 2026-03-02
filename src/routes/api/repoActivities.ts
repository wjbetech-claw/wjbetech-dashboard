import { Router } from 'express'

const router = Router()

// Stub implementation for local development — returns 501 Not Implemented
router.use((req, res) => res.status(501).json({ error: 'Not implemented (stub)' }))

export default router
