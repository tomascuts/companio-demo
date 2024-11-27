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
  providers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }] // Referencia correcta
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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
        const service = await Service.findById({ id: serviceId });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const providers = await Provider.find({ _id: { $in: service.providers } });
        res.json(providers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener los pedidos por providerId
app.get('/requests/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;

    // Busca el documento del proveedor con el ID proporcionado.
    const provider = await RequestProvider.findOne({ providerId: parseInt(providerId, 10) }).populate('requests');

    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    // Devuelve el provider con sus requests.
    res.status(200).json(provider);
  } catch (error) {
    console.error('Error al obtener el proveedor con sus requests:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/requests/:providerId/requests', async (req, res) => {
  try {
    const { providerId } = req.params;

    // Busca el documento del proveedor con el ID proporcionado.
    const provider = await RequestProvider.findOne({ providerId: parseInt(providerId, 10) }).populate('requests');

    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    // Devuelve el provider con sus requests.
    res.status(200).json(provider.requests);  
  } catch (error) {
    console.error('Error al obtener los requests:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/requests/:providerId/request/:requestId', async (req, res) => {
  try {
    const { providerId, requestId } = req.params;

    // Busca el documento del proveedor con el ID proporcionado.
    const provider = await RequestProvider.findOne({ providerId: parseInt(providerId, 10) }).populate('requests');

    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    // Busca el request dentro del provider
    const request = provider.requests.find(req => req.requestId === Number(requestId));

    console.log('Provider:', provider);
    console.log('Requests:', provider.requests);
    console.log('RequestId buscado:', requestId);
    console.log('Request encontrado:', request);
    console.log('provider.requests:', provider.requests.map(req => req.requestId));
    console.log('RequestId recibido como parámetro:', requestId);
    console.log('RequestId convertido a número:', Number(requestId));

    // Manejo del caso en que no se encuentra el request
    if (!request) {
      return res.status(404).json({ message: 'Request no encontrado' });
    }

    // Devuelve el request encontrado
    res.status(200).json(request);
  } catch (error) {
    console.error('Error al obtener los requests:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


// Endpoint para actualizar el estado del request dentro de un provider
app.put('/requests/:providerId/request/:requestId', async (req, res) => {
  try {
    const { providerId, requestId } = req.params;
    const { state } = req.body;

    // Actualiza el estado del request en el subdocumento
    const provider = await RequestProvider.findOneAndUpdate(
      { providerId: parseInt(providerId, 10), 'requests.requestId': parseInt(requestId, 10) },
      { $set: { 'requests.$.state': state } }, // Actualiza solo el campo `state`
      { new: true, runValidators: true } // Devuelve el documento actualizado y valida los cambios
    );

    if (!provider) {
      return res.status(404).json({ message: 'Proveedor no encontrado o request no encontrado' });
    }

    // Devuelve el documento actualizado
    res.status(200).json(provider);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Ruta para obtener todos los requests
app.get('/requests', async (req, res) => {
  try {
      const requests = await RequestProvider.find();
      console.log("Data from MongoDB:", requests); // Verifica qué devuelve MongoDB.
      res.json(requests);
  } catch (err) {
      console.error("Error fetching requests:", err); // Registra cualquier error.
      res.status(500).json({ message: err.message });
  }
});