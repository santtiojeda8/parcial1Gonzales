import mongoose from 'mongoose'

const authorSchema = mongoose.Schema({
    nombre: { type : String , required : true},
    bio: { type : String},
    fechanacimiento: { type : Date , required : true},
    nacionalidad: { type : String , required: true},
    libros: {type: [{type : mongoose.Schema.Types.ObjectId , ref: 'libros'}] , default : []}
})

export default mongoose.model('autors' , authorSchema) 