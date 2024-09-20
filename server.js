const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/post', upload.single('image'), (req, res) => {
    const post = {
        content: req.body.content,
        image: req.file ? `/uploads/${req.file.filename}` : null
    };
    // 这里可以将帖子保存到数据库
    res.json(post);
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});