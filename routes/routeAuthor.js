import express from 'express'
import {getAllAuthors , getAuthorById , createAuthor , updateAuthor , deleteAuthor , addBookToAuthor} from '../controllers/authorController.js'

const router = express.Router()

router.get('/' , getAllAuthors)
router.get('/:id' , getAuthorById)
router.post('/' , createAuthor)
router.put('/:id' , updateAuthor)
router.delete('/:id' , deleteAuthor)
router.put('/:id/addBook/:bookId' , addBookToAuthor)

export default router