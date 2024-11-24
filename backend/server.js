const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb+srv://generic:genericcompanio@cluster0.l6eptzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Definición del esquema Service
const { Schema } = mongoose;

const serviceSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    detailedDescription: { type: String },
    icon: { type: String, required: true },
    providers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }] // Relaciona con el modelo Provider
});
  
const Service = mongoose.model('Service', serviceSchema);

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

const Provider = mongoose.model('Provider', providerSchema);

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
    enum: ['Pending', 'In Progress', 'Completed', null],
    default: null
  },
  paymentDescription: {
    type: String,
    default: null
  },
  icon: {
    type: String, // Nombre del icono representado como string.
    required: true
  }
});

const Request = mongoose.model('Request', requestSchema);

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

const RequestProvider = mongoose.model('RequestProvider', requestProviderSchema);

// Ruta para obtener todos los servicios
app.get('/services', async (req, res) => {
    try {
        const services = await Service.find().populate('providers');
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener todos los proveedores de un servicio específico
app.get('/providers/:serviceId', async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const service = await Service.findById(serviceId).populate('providers');
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service.providers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener los pedidos por providerId
app.get('/requests/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;

    // Busca el documento del proveedor con el ID proporcionado.
    const provider = await RequestProvider.findOne({ providerId: parseInt(providerId, 10) });

    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    // Devuelve el provider con sus requests.
    res.status(200).json(provider);
  } catch (error) {
    console.error('Error al obtener los requests:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener todos los servicios
app.get('/requests', async (req, res) => {
  try {
      const requests = await RequestProvider.find().populate('requests');
      res.json(requests);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
