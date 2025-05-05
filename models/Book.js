import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    titulo: {type: String, required : true},
    descripcion: {type: String},
    genero: { type : String , required: true},
    publicacion: { type : Date , required : true},
    disponible: { type : Boolean , required : true}
})

export default mongoose.model('libros' , bookSchema) 