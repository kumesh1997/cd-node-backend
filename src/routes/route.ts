import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.middleware";
import users from "../mockData/users.json";

router.get('/:id', authMiddleware, (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id==userId)
    res.send(user);
});

router.get('/contact', (Request, Response) => {
    Response.send('Contact Page');
});

module.exports = router;
