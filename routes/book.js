const express = require('express');
const {createBook, getBookById, getBooks, updateBookById, deleteBook} = require('../controllers/books');


const router = express.Router();

router.post('/addBook', createBook);
router.get('/getBook/:id', getBookById);
router.get('/getBooks', getBooks);
router.put('/updateBook/:id', updateBookById);
router.put('/removeBook/:id', deleteBook);

module.exports = router;