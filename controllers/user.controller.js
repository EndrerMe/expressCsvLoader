const { Router } = require('express');
const userService = require('./../core/services/user.service');
const router = Router();

router.post('/upload', async (req, res) => {
    const file = req.files.file;
    userService.parseFile(file).then(() => {
        res.json({});
    },(err) => {
        res.sendStatus(403);
    });
})

router.get('/getUsers', async (req, res) => {
    userService.getUsers().then((users) => {
        res.json(JSON.stringify(users))
    }, (err) => {
        res.sendStatus(403);
    })
})

router.get('/download', async (req, res) => {
    userService.download().then((csv) => {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Pragma', 'no-cache');
        res.send(csv)
    }, (err) => {
        res.sendStatus(404)
    })
})

module.exports = router;