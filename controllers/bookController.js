import Book from '../models/Book.js'
import Author from '../models/Author.js'

export const getAllBooks = async (req ,res) => {
    try {
        const books = await Book.find()
        if(!books) return res.status(404).json( {error : "No hay libros"})
        console.log(books)
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ error : "Error interno del servidor"})
    }
}

export const getBookById = async (req , res) => {
    const {id} = req.params

    try {
        const book = await Book.findById(id)
        if(!book) return res.status(404).json( {error : "No se encontro"})
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json( {error : "ID no válido"})
    }
}

export const createBook = async (req , res) => {
    try {
        const book = new Book(req.body)
        await book.save()
        res.status(201).json(book)
    } catch (error) {
        res.status(400).json( {error : "Datos incorrectos"})
    }
}

export const updateBook = async (req , res) => {
    const { id } = req.params

    try {
        const book = await Book.findByIdAndUpdate( id , req.body , { new : true})
        if(!book) return res.status(404).json( {error : "No se encontro"})
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json( { error: "ID no valido o datos no válidos"})
    }
}

export const deleteBook = async (req ,res ) => {
    const {id} = req.params

    try {
        const authorAssign = await Author.find( {libros : id})
        if(authorAssign.lenght>0){
            return res.status(400).json( { error : "Esta asignado a un autor"})
        }
        const book = await Book.findByIdAndDelete(id)
        if(!book) return res.status(404).json( {error : "No se encontro"})
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json( {error : "ID no válido"})
    }
}