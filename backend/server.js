const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

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

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  userType: { type: String, required: true }, // 'asistido' o 'asistente'
  nombre: { type: String, required: true }, // Nombre del usuario
});

const User = mongoose.model('User', userSchema);

//Endpoint Lara

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

//Endpoints Fabry
// Ruta para obtener todos los proveedores de un servicio específico
app.get('/providers/:serviceId', async (req, res) => {
  try {
      const serviceId = req.params.serviceId;
      const service = await Service.findOne({ id: parseInt(serviceId, 10) });
      if (!service) {
          return res.status(404).json({ message: 'Service not found' });
      }
      console.log("Service found:", service); // Verifica el servicio encontrado.
      const providers = await Provider.find({ services: service.name });
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


app.post('/auth/login', async (req, res) => {
const { email, contrasena } = req.body;

try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar contraseñas (si están en texto plano, simplemente compara directamente)
    if (user.contrasena !== contrasena) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.json({ userType: user.userType, nombre: user.nombre }); // Retorna datos necesarios
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
}
});