const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  contrasena: { type: String, required: true },
  userType: { type: String, required: true, enum: ['asistido', 'asistente'] },
  
  // Campos comunes para ambos tipos de usuario
  nombreCompleto: { type: String },
  fechaNacimiento: { type: Date },
  direccion: { type: String },
  localidad: { type: String },
  descripcion: { type: String },
  
  // Campos específicos para "asistido"
  nivelActividad: { type: String, enum: ['Alta', 'Media', 'Baja'] },
  tieneEnfermedad: { type: String, enum: ['Si', 'No'] },
  enfermedad: { type: String },
  
  // Campos específicos para "asistente"
  tareasAsistencia: { type: [String], enum: [
    'Acompañamiento',
    'Ayuda con las compras',
    'Ayuda con trámites online',
    'Ayuda con trámites presenciales',
    'Pasear al perro',
    'Ayuda con la tecnología'
  ] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
