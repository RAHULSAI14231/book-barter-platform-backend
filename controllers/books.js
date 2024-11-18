const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Book = require('../models/Book');
const { query } = require('express');
const { MongoClient } = require('mongodb');

// @desc    Register User
// @route   POST /addBook
// @access  Public

exports.createBook = asyncHandler(async(req, res) => {
    let book = req.body;
    let response = await Book.create(book);

    res.status(201).json({
        success: true,
        data: response
    })
});

// @desc    Register User
// @route   GET /getBook/:id
// @access  Public

exports.getBookById = asyncHandler(async(req, res, next) => {
    let book = req.params.id;
    let response = await Book.findById(book);
    if(!response){
        return next(new ErrorResponse('No book found with the given id', 404))
    }
    res.status(200).json({
        success: true,
        data: response,
        message: 'Book fetched successfully'
    })
});

// @desc    Register User
// @route   GET /getBooks
// @access  Public

exports.getBooks = asyncHandler(async(req, res, next) => {
    let query;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalBooks = await Book.countDocuments();
    const searchTerm = req.query.searchTerm;
    
    queryWithSearchTerm = Book.find({
        $text: {
            $search: searchTerm
        }
    }).skip(startIndex).limit(limit);

    queryWithoutSearchTerm = Book.find().skip(startIndex).limit(limit);
    query = (!searchTerm) ? queryWithoutSearchTerm : queryWithSearchTerm;
    let books = await query;

    if(!books){
        return next(new ErrorResponse('Books not found'), 404);
    }

    res.status(200).json({
        success: true,
        data: books,
        currentPage: page,
        totalBooks,
        totalPages: Math.ceil(totalBooks / limit),
        count: books.length
    });
});

// @desc    Register User
// @route   PUT /getBooks/getBooks
// @access  Public

exports.updateBookById = asyncHandler(async(req, res, next) => {
    let book = req.params.id;
    let response = await Book.findByIdAndUpdate(book, req.body, {
        new: true,
        runValidators: true
    });
    if(!response){
        return next(new ErrorResponse('No book found with the given id', 404))
    }
    res.status(200).json({
        success: true,
        message: 'Book updated successfully'
    })
});

// @desc    Register User
// @route   PUT /removeBook/:id
// @access  Public

exports.deleteBook = asyncHandler(async(req, res, next) => {
    let book = req.params.id;
    let response = await Book.findByIdAndDelete(book);
    if(!response){
        return next(new ErrorResponse('No book found with the given id', 404))
    }
    res.status(200).json({
        success: true,
        message: 'Book removed successfully'
    })
});
