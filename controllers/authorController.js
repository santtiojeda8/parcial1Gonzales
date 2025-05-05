import Book from "../models/Book.js";
import Author from "../models/Author.js";

export const getAllAuthors = async (req, res) => {
  try {
    const autor = await Author.find().populate('libros');
    if (!autor) return res.status(404).json({ error: "No hay libros" });
    console.log(autor);
    res.status(200).json(autor);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAuthorById = async (req, res) => {
  const { id } = req.params;

  try {
    const autor = await Author.findById(id).populate('libros');
    if (!autor) return res.status(404).json({ error: "No se encontro" });
    res.status(200).json(autor);
  } catch (error) {
    res.status(400).json({ error: "ID no válido" });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const autor = new Author(req.body);
    await autor.save();
    res.status(201).json(autor);
  } catch (error) {
    res.status(400).json({ error: "Datos incorrectos" });
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const autor = await Author.findByIdAndUpdate(id, req.body, { new: true });
    if (!autor) return res.status(404).json({ error: "No se encontro" });
    res.status(200).json(autor);
  } catch (error) {
    res.status(400).json({ error: "ID no valido o datos no válidos" });
  }
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Author.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ error: "No se encontro" });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: "ID no válido" });
  }
};

export const addBookToAuthor = async (req, res) => {
  const { id, bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book)
      return res.status(404).json({ error: "No se encontro el libro" });

    const autor = await Author.findById(id).populate('libros');
    if (!autor)
      return res.status(404).json({ error: "No se encontro el autor" });

    if (!autor.libros.includes(bookId)) {
      return res
        .status(400)
        .json({ error: "El investigador ya esta asignado al proyecto" });
    }

    autor.libros.push(bookId);
    await autor.save();
    res.status(200).json(autor);
  } catch (error) {
    res.status(400).json({ error: "ID no válido" });
  }
};
