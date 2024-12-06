const names = ['María Smith', 'Elisa Ruiz', 'Carlos Gómez', 'Ana Martínez', 'Pedro Sánchez', 'Lucía Fernández', 'Jorge Herrera', 'Sofía López', 'Manuel Castro', 'Teresa García', 'Roberto Díaz', 'Gabriela Vargas', 'Luis Ortega', 'Isabel Navarro', 'Alberto Mendoza', 'Patricia Ramos', 'Miguel Pérez', 'Rosa Ortiz', 'Daniela Soto', 'Andrés Vega', 'Laura Jiménez', 'Felipe Morales', 'Claudia Romero', 'Francisco Silva', 'Valeria Torres'];

const comments = [
    'Una persona increíblemente amable y siempre dispuesta a ayudar en todo momento, mostrando una gran empatía con los demás.',
    'Siempre se muestra atento y dispuesto a escuchar, ofreciendo un apoyo incondicional en cualquier circunstancia.',
    'Una persona de gran paciencia, siempre con una sonrisa y dispuesta a ayudar sin importar la situación.',
    'Puntual en todo momento, siempre cumpliendo con su horario y siendo muy confiable en el día a día.',
    'Una compañía excelente, siempre brindando tranquilidad y haciendo más llevadero el día con su presencia.',
    'Un gran comunicador, capaz de explicar las cosas con claridad y de entender las necesidades de los demás.',
    'Muy atenta y cuidadosa, asegurándose siempre de que todo esté bien antes de tomar cualquier acción.',
    'Demuestra una gran profesionalidad, siempre manejando cada situación con seriedad y respeto.',
    'Una persona que inspira con su actitud positiva y su dedicación al ayudar a los demás a sentirse mejor.',
    'Siempre motivando a las personas a seguir adelante, ofreciendo palabras de aliento en todo momento.',
    'Una persona cálida y afectuosa, capaz de transmitir mucha confianza y cercanía a quienes la rodean.',
    'Con un gran corazón, siempre disponible para ayudar y hacer que los demás se sientan bien cuidados.',
    'Siempre con una sonrisa en el rostro, es capaz de alegrar el día de cualquiera solo con su presencia.',
    'Una asistente excelente, siempre con una disposición increíble para facilitar cualquier tarea diaria.',
    'Un apoyo invaluable, siempre dispuesto a hacer todo lo necesario para brindar una mano amiga.',
    'Encantadora en todo momento, mostrando una actitud positiva y agradable en todas sus interacciones.',
    'Muy respetuosa y considerada con los demás, siempre manteniendo una actitud cordial y educada.',
    'Siempre disponible para ayudar, sin importar la hora, siempre con una actitud abierta y dispuesta.',
    'Una persona muy amigable, siempre con un trato cercano y accesible, generando un ambiente de confianza.',
    'Honesto en todo momento, mostrando transparencia y sinceridad en todas sus acciones y palabras.',
    'Una persona responsable y comprometida, siempre cumpliendo con sus tareas y asegurándose de que todo se haga correctamente.',
    'Generosa y siempre dispuesta a dar lo mejor de sí misma para ayudar a los demás, sin esperar nada a cambio.',
    'De total confianza, siempre cumpliendo sus promesas y estando presente cuando más se necesita.',
    'Con un excelente sentido del humor, capaz de hacer reír a todos y aliviar cualquier situación con su actitud positiva.',
    'Empática en su trato, comprendiendo las necesidades de los demás y brindando apoyo sin juicios ni reservas.'
  ];

const generateRandomReview = () => {
  const randomName = names.splice(Math.floor(Math.random() * names.length), 1)[0];
  const randomAge = Math.floor(Math.random() * (90 - 65 + 1)) + 65; // Edad entre 65 y 90
  const randomRating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1); // Rating entre 3.5 y 5
  const randomComment = comments.splice(Math.floor(Math.random() * comments.length), 1)[0];

  return { author: randomName, age: randomAge, rating: parseFloat(randomRating), comment: randomComment };
};

export const randomReviews = Array.from({ length: 2 }, () => generateRandomReview());