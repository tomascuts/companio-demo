const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb+srv://generic:genericcompanio@cluster0.l6eptzc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


// Ruta para obtener usuarios según localidad, tipo de usuario y tarea
app.get('/users', async (req, res) => {
  console.log('Received query parameters:', req.query);  // Para ver qué datos está recibiendo la API
  try {
    const { localidad, tarea, userType } = req.query;
    console.log(`Filtering by localidad: ${localidad}, tarea: ${tarea}, userType: ${userType}`);

    const collection = mongoose.connection.db.collection('users');

    // Construir el filtro
    const query = {
      userType: 'asistente',
      'direccion.localidad': localidad,
      tareas: { $in: [tarea] },  // Buscando si la tarea está en el array 'tareas'
    };

    console.log('MongoDB Query:', query);  // Verifica el query que se está enviando a MongoDB

    const assistants = await collection.find(query).toArray();
    console.log('Found assistants:', assistants);  // Verifica los resultados

    res.json(assistants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});



app.get('/services', async (req, res) => {
  try {
    const services = await mongoose.connection.db.collection('services').find().toArray();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});












































/*const express = require('express');
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

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});*/
