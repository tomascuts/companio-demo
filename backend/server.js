const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Service, Provider, Request, RequestProvider, User, UserPrueba } = require('./models');

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
      userType: 'asistir',
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


app.post('/register/Create/User', async (req, res) => {

  console.log(req.body);
  const collection = mongoose.connection.db.collection('userpruebas');

  try {
    const existingUser = await collection.findOne({ email: req.body.email });
    
    if (existingUser) {
        return res.status(409).json({ message: 'El usuario ya existe, por favor verifique el email ingresado.' });
    }

    const newUser = new UserPrueba({
      nombre: req.body.nombre,
      fecha_nacimiento: req.body.fecha_nacimiento,
      direccion: {
        localidad: req.body.direccion.localidad,
        calle: req.body.direccion.calle,
        numero: req.body.direccion.numero, //repetido o no segmentado el dato desde el front
      },
      descripcion: req.body.descripcion, 
      tareas: req.body.tareas,
      userType: req.body.userType,
      email: req.body.email,
      contrasena: req.body.contrasena,
      reviews: req.body.reviews,
    });

    await collection.insertOne(newUser);
    res.status(201).json(newUser);

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocurrio un error al intentar registrar al usuario.' });
  }
});