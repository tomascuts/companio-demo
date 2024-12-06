const mongoose = require('mongoose');

// Definición del esquema Service
const { Schema } = mongoose;

const serviceSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String },
  icon: { type: String, required: true },
  providers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }]
});

// Definición del esquema Provider
const providerSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    occupation: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    description: { type: String },
    services: [{ type: String }],
    reviews: [{
      author: { type: String },
      age: { type: Number },
      rating: { type: Number, min: 0, max: 5 },
      comment: { type: String }
    }]
});

const requestSchema = new mongoose.Schema({
  services: {
    type: String,
    required: true
  },
  assisted: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: null
  },
  state: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Rejected', null],
    default: null
  },
  paymentDescription: {
    type: String,
    default: null
  },
  icon: {
    type: Object, // Nombre del icono representado como string.
    required: true
  },
  description: {
    type: String,
    required: false
  },
  methodPayment: {
    type: String,
    required: false
  },
  amountPayment: {
    type: Number,
    required: false
  },
  requestId: {
    type: Number,
    required: true
  }
});

const requestProviderSchema = new mongoose.Schema({
    providerId: {
      type: Number,
      required: true,
      unique: true
    },
    providerName: {
      type: String,
      required: true
    },
    requests: {
      type: [requestSchema], // Subdocumentos para las solicitudes.
      default: []
    }
});

const ReviewSchema = new mongoose.Schema({
  author: String,
  age: Number,
  rating: Number,
  comment: String,
});

const AddressSchema = new mongoose.Schema({
  localidad: String,
  calle: String,
  numero: Number,
});

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  fecha_nacimiento: Date,
  direccion: AddressSchema,
  descripcion: String,
  tareas: [String],
  userType: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  reviews: [ReviewSchema],
  rating: { type: String, required: true },
});

const Service = mongoose.model('Service', serviceSchema);
const Provider = mongoose.model('Provider', providerSchema);
const Request = mongoose.model('Request', requestSchema);
const RequestProvider = mongoose.model('requestproviderprueba', requestProviderSchema);
const User = mongoose.model('User', userSchema);
const UserPrueba = mongoose.model('userpruebas', userSchema);

module.exports = {
    Service,
    Provider,
    Request,
    RequestProvider,
    User,
    UserPrueba
};