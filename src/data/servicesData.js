import { ShoppingCart, Wifi, Pets, Computer, People, Place } from '@mui/icons-material';

export const services = [
  { 
    id: 1,
    name: 'Supermercado', 
    description: 'Ayuda con las compras',
    detailedDescription: 'El servicio incluye acompañamiento desde la casa hasta el supermercado deseado, ayuda con la selección de productos y su transporte hasta el domicilio de vuelta.',
    icon: <ShoppingCart />,
    providers: [
      { 
        id: 1,
        name: 'Fernando López', 
        location: 'San Isidro - 25 años', 
        occupation: 'Amante de las mascotas', 
        rating: 4.5,
        description: 'Ofrezco servicios de cuidado y asistencia para garantizar su bienestar. Me dedico a asegurar que cada animal reciba la atención y el cariño que merece.',
        services: ['Supermercado', 'Acompañamiento', 'Mascotas'],
        reviews: [
          { author: 'María Smith', age: 80, rating: 4.5, comment: 'Hermosa persona' },
          { author: 'Elisa Ruiz', age: 87, rating: 4.0, comment: 'Amable' },
        ]
      },
      { name: 'Amadeo Nonso', location: 'San Fernando - 28 años', occupation: 'Estudiante de medicina', rating: 4.1 },
      { name: 'Florencia Sirten', location: 'Martinez - 20 años', occupation: 'Empleada', rating: 4.0 },
      { name: 'Camila Martinez', location: 'Olivos - 26 años', occupation: 'Profesora', rating: 3.5 },
    ]
  },
  { 
    id: 2, 
    name: 'Tecnología', 
    description: 'Ayuda con dispositivos tecnológicos',
    detailedDescription: 'Ayuda con dispositivos tecnológicos, incluyendo la instalación y uso de aplicaciones.', 
    icon: <Wifi />,
    providers: [
      { name: 'Lucas Romero', location: 'Belgrano - 30 años', occupation: 'Técnico en informática', rating: 4.7 },
      { name: 'Sofia González', location: 'Caballito - 22 años', occupation: 'Estudiante de ingeniería en sistemas', rating: 4.2 },
      { name: 'Javier Morales', location: 'Palermo - 35 años', occupation: 'Experto en ciberseguridad', rating: 4.9 },
    ]
  },
  { 
    id: 3, 
    name: 'Mascotas', 
    description: 'Ayuda con el paseo de tu mascota',
    detailedDescription: 'Ayuda con el paseo de tu mascota y cuidados generales.', 
    icon: <Pets />,
    providers: [
      { name: 'María Fernández', location: 'Núñez - 27 años', occupation: 'Cuidadora de mascotas', rating: 4.6 },
      { name: 'Diego Pérez', location: 'San Telmo - 29 años', occupation: 'Adiestrador canino', rating: 4.8 },
    ]
  },
  { 
    id: 4, 
    name: 'Trámites online', 
    description: 'Ayuda con tus trámites online',
    detailedDescription: 'Ayuda con tus trámites online, desde la gestión de documentos hasta la atención al cliente.', 
    icon: <Computer />,
    providers: [
      { name: 'Laura Salazar', location: 'Recoleta - 32 años', occupation: 'Asistente administrativo', rating: 4.4 },
      { name: 'Tomás Alvarado', location: 'La Boca - 26 años', occupation: 'Estudiante de derecho', rating: 4.1 },
    ]
  },
  { 
    id: 5, 
    name: 'Acompañamiento', 
    description: 'Servicio de acompañamiento',
    detailedDescription: 'Servicio de acompañamiento para personas mayores o en situaciones especiales.', 
    icon: <People />,
    providers: [
      { name: 'Estela Ramírez', location: 'Almagro - 60 años', occupation: 'Cuidado geriátrico', rating: 4.9 },
      { name: 'Ricardo López', location: 'Villa Devoto - 45 años', occupation: 'Voluntario en centros comunitarios', rating: 4.3 },
    ]
  },
  { 
    id: 6, 
    name: 'Trámites presenciales', 
    description: 'Ayuda y acompañamiento al lugar',
    detailedDescription: 'Ayuda y acompañamiento al lugar para realizar trámites presenciales.', 
    icon: <Place />,
    providers: [
      { name: 'Gabriela Suárez', location: 'Belgrano - 33 años', occupation: 'Asistente personal', rating: 4.5 },
      { name: 'Carlos Mendoza', location: 'CABA - 50 años', occupation: 'Experto en gestiones burocráticas', rating: 4.6 },
    ]
  },
];
