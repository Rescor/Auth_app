import express from 'express';
import passport from 'passport';

const router = express.Router();
router.use(express.json());

router.get('/data', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
