import { Property, Booking, User, Review } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Ana Sokolova',
  email: 'ana.sokolova@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  phone: '+34 912 123 456',
  bio: 'Me encanta viajar y compartir mi hogar. ¡Me gusta conocer gente nueva!',
  isHost: true,
};

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Apartamento moderno en el centro',
    description: 'Hermoso apartamento moderno en el corazón de la ciudad con vistas impresionantes. Perfecto para viajeros de negocios o parejas que buscan una escapada romántica.',
    type: 'apartment',
    price: 350000,
    location: {
      city: 'Córdoba',
      country: 'Argentina',
      address: 'Av. Colón 125, Centro',
      coordinates: {
        lat: -31.4201,
        lng: -64.1888,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MTM4ODg0NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1680187287371-340b4b12745f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYXBhcnRtZW50JTIwdmlld3xlbnwxfHx8fDE3NjA3MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1603072819161-e864800276cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MTQ0NTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'Calefacción', 'TV', 'Lavadora'],
    host: {
      id: '1',
      name: 'Iván Pérez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      joinedDate: '2020-01-15',
      rating: 4.9,
      reviewCount: 6,
      reviews: [
        {
          id: '1',
          author: {
            name: 'Carlos Martínez',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2024-03-15',
          comment: 'Iván es un propietario excepcional. Siempre disponible para resolver cualquier duda, muy respetuoso con los tiempos de respuesta y profesional en todos los aspectos. Facilita mucho el proceso de alquiler.',
        },
        {
          id: '2',
          author: {
            name: 'Laura Fernández',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-03-10',
          comment: 'Excelente propietario, muy comunicativo y transparente. No hubo sorpresas durante todo el contrato. Siempre atento a mantener la propiedad en perfectas condiciones. Lo recomiendo totalmente.',
        },
        {
          id: '3',
          author: {
            name: 'Miguel Ángel Torres',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-02-28',
          comment: 'Iván es muy profesional y comprensivo. Cuando tuvimos un problema con el calentador, lo solucionó en menos de 24 horas. Es el tipo de propietario que todos los inquilinos desearían tener.',
        },
        {
          id: '4',
          author: {
            name: 'Sofia González',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-02-20',
          comment: 'Un placer tratar con Iván. Es justo, honesto y muy respetuoso con la privacidad de los inquilinos. La devolución del depósito fue rápida y sin inconvenientes. Propietario de 10.',
        },
        {
          id: '5',
          author: {
            name: 'David Ruiz',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2024-02-10',
          comment: 'Iván es un propietario modelo. Responde rápidamente a los mensajes, es flexible cuando es necesario y siempre mantiene una comunicación clara. Muy recomendable.',
        },
        {
          id: '6',
          author: {
            name: 'Ana Belén López',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 4,
          date: '2024-01-30',
          comment: 'Buen propietario en general. Respeta los acuerdos y es accesible. Hubo algunos retrasos en reparaciones menores pero nada grave. En general, una buena experiencia.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Casa de lujo frente al mar',
    description: 'Casa espaciosa frente al mar con acceso directo a la playa. Disfruta de impresionantes vistas al océano y puestas de sol inolvidables.',
    type: 'house',
    price: 850000,
    location: {
      city: 'Mar del Plata',
      country: 'Argentina',
      address: 'Av. Costanera 450, La Perla',
      coordinates: {
        lat: -38.0055,
        lng: -57.5426,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1601019404210-8bb5dd3ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwdmFjYXRpb258ZW58MXx8fHwxNzYwODAyNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDc1NzA1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1625579002297-aeebbf69de89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMzYxMjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: ['WiFi', 'Piscina', 'Acceso a la playa', 'Parrilla', 'Estacionamiento', 'Cocina', 'Aire acondicionado'],
    host: {
      id: '2',
      name: 'Elena Volkova',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      joinedDate: '2019-05-20',
      rating: 5.0,
      reviewCount: 5,
      reviews: [
        {
          id: '7',
          author: {
            name: 'Martín Gómez',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2024-04-05',
          comment: 'Elena es una propietaria excepcional. Siempre disponible, muy profesional y atenta a todos los detalles. Ha sido un placer alquilar con ella.',
        },
        {
          id: '8',
          author: {
            name: 'Patricia Sánchez',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2024-03-28',
          comment: 'Excelente propietaria. Muy comprensiva y flexible. La comunicación fue fluida durante todo el contrato. Totalmente recomendable.',
        },
        {
          id: '9',
          author: {
            name: 'Jorge Ramírez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-03-15',
          comment: 'Elena es una persona de confianza. Resolvió todas nuestras dudas rápidamente y fue muy transparente con todos los acuerdos.',
        },
        {
          id: '10',
          author: {
            name: 'Claudia Vargas',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-02-22',
          comment: 'Propietaria modelo. Muy respetuosa con la privacidad y siempre pendiente del mantenimiento de la propiedad. Una experiencia excelente.',
        },
        {
          id: '11',
          author: {
            name: 'Roberto Silva',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2024-02-10',
          comment: 'Impecable en todo sentido. Elena es justa, honesta y muy profesional. La recomiendo sin dudas.',
        },
      ],
    },
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Cabaña acogedora en la montaña',
    description: 'Escapa a las montañas en esta encantadora cabaña. Perfecto para amantes de la naturaleza y aquellos que buscan tranquilidad.',
    type: 'cabin',
    price: 420000,
    location: {
      city: 'Bariloche',
      country: 'Argentina',
      address: 'Av. Pioneros km 8, Cerro Catedral',
      coordinates: {
        lat: -41.1462,
        lng: -71.4005,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1482192505345-5655af888cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmlufGVufDF8fHx8MTc2MDcxNTMwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1743008019164-2d810a54915e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMHJlbnRhbHxlbnwxfHx8fDE3NjA4MjYwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1635713481276-65ae79b1a24f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmluJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxNDQ1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['WiFi', 'Chimenea', 'Calefacción', 'Vista a la montaña', 'Estacionamiento', 'Cocina'],
    host: {
      id: '3',
      name: 'Miguel Smirnov',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      joinedDate: '2021-03-10',
      rating: 4.7,
      reviewCount: 4,
      reviews: [
        {
          id: '12',
          author: {
            name: 'Andrea Costa',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-03-20',
          comment: 'Miguel es un propietario muy atento y responsable. Siempre respondió rápido a nuestras consultas.',
        },
        {
          id: '13',
          author: {
            name: 'Fernando López',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-02-15',
          comment: 'Excelente trato. Miguel fue muy profesional y nos hizo sentir cómodos desde el primer día.',
        },
        {
          id: '14',
          author: {
            name: 'Natalia Rivas',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 4,
          date: '2024-01-28',
          comment: 'Buen propietario. Hubo algunos retrasos en mantenimiento pero siempre con buena disposición.',
        },
        {
          id: '15',
          author: {
            name: 'Pablo Moreno',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2024-01-10',
          comment: 'Miguel es una persona confiable y justa. Recomiendo alquilar con él.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Loft urbano elegante',
    description: 'Loft de estilo industrial en un barrio de moda. A poca distancia de restaurantes, cafés y galerías.',
    type: 'apartment',
    price: 480000,
    location: {
      city: 'Rosario',
      country: 'Argentina',
      address: 'Bv. Oroño 1230, Pichincha',
      coordinates: {
        lat: -32.9442,
        lng: -60.6505,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA3NjQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1631248988030-141c05a37dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2Z0JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTQ0NTk2OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjEzOTM1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'Espacio de trabajo', 'Acceso al gimnasio'],
    host: {
      id: '4',
      name: 'Darya Kuznetsova',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      joinedDate: '2020-08-22',
      rating: 4.8,
      reviewCount: 4,
      reviews: [
        {
          id: '16',
          author: {
            name: 'Gabriel Ortiz',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2024-04-01',
          comment: 'Darya es muy profesional y atenta. Excelente comunicación durante todo el proceso.',
        },
        {
          id: '17',
          author: {
            name: 'Valeria Díaz',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-03-10',
          comment: 'Propietaria excelente. Siempre disponible y muy respetuosa. Totalmente recomendable.',
        },
        {
          id: '18',
          author: {
            name: 'Sebastián Torres',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 4,
          date: '2024-02-18',
          comment: 'Buena propietaria en general. Algunas demoras en responder pero siempre amable.',
        },
        {
          id: '19',
          author: {
            name: 'Marina Castro',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-01-25',
          comment: 'Darya es confiable y justa. Una excelente experiencia de alquiler.',
        },
      ],
    },
    isFavorite: true,
  },
  {
    id: '5',
    title: 'Villa elegante con piscina',
    description: 'Villa impresionante con piscina privada, jardín y zona de comedor al aire libre. Ideal para familias o grupos.',
    type: 'villa',
    price: 720000,
    location: {
      city: 'Mendoza',
      country: 'Argentina',
      address: 'Calle Los Andes 550, Chacras de Coria',
      coordinates: {
        lat: -33.0117,
        lng: -68.8815,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDc1NzA1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1642068338024-beb9d132ef1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHBvb2wlMjBhcmVhfGVufDF8fHx8MTc2MTQ0NTk2OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1600488999806-8efb986d87b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGRpbmluZyUyMHJvb218ZW58MXx8fHwxNzYxNDQ1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 5,
    bathrooms: 4,
    guests: 10,
    amenities: ['WiFi', 'Piscina', 'Jardín', 'Parrilla', 'Estacionamiento', 'Cocina', 'Aire acondicionado', 'Cine en casa'],
    host: {
      id: '5',
      name: 'Dmitri Novikov',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      joinedDate: '2018-11-05',
      rating: 5.0,
      reviewCount: 5,
      reviews: [
        {
          id: '20',
          author: {
            name: 'Lucía Romero',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2024-04-08',
          comment: 'Dmitri es un propietario excepcional. Profesional, atento y muy transparente. Lo mejor que nos pudo pasar.',
        },
        {
          id: '21',
          author: {
            name: 'Ricardo Benítez',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-03-25',
          comment: 'Impresionante. Dmitri resuelve todo de inmediato y es muy justo en todos los aspectos. Altamente recomendado.',
        },
        {
          id: '22',
          author: {
            name: 'Camila Herrera',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-03-05',
          comment: 'El mejor propietario que hemos tenido. Comunicación perfecta, mantenimiento excelente y siempre con buena disposición.',
        },
        {
          id: '23',
          author: {
            name: 'Alejandro Vega',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2024-02-12',
          comment: 'Dmitri es un profesional de primera. Todo el proceso fue impecable y sin sorpresas.',
        },
        {
          id: '24',
          author: {
            name: 'Daniela Rojas',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-01-20',
          comment: 'Excelente en todos los sentidos. Dmitri se merece las 5 estrellas. Un propietario modelo.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Estudio encantador en el centro',
    description: 'Estudio compacto y funcional, perfecto para viajeros solitarios. Excelente ubicación con fácil acceso al transporte público.',
    type: 'apartment',
    price: 300000,
    location: {
      city: 'Salta',
      country: 'Argentina',
      address: 'Calle Caseros 450, Centro',
      coordinates: {
        lat: -24.7859,
        lng: -65.4117,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1680187287371-340b4b12745f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYXBhcnRtZW50JTIwdmlld3xlbnwxfHx8fDE3NjA3MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1702014861736-d62834317c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MTQ0NTk2OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1638799869566-b17fa794c4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbXxlbnwxfHx8fDE3NjE0NDU5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 1,
    bathrooms: 1,
    guests: 1,
    amenities: ['WiFi', 'Cocina', 'Calefacción', 'Espacio de trabajo'],
    host: {
      id: '1',
      name: 'Iván Pérez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      joinedDate: '2020-01-15',
      rating: 4.9,
      reviewCount: 6,
      reviews: [
        {
          id: '1',
          author: {
            name: 'Carlos Martínez',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2024-03-15',
          comment: 'Iván es un propietario excepcional. Siempre disponible para resolver cualquier duda, muy respetuoso con los tiempos de respuesta y profesional en todos los aspectos. Facilita mucho el proceso de alquiler.',
        },
        {
          id: '2',
          author: {
            name: 'Laura Fernández',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-03-10',
          comment: 'Excelente propietario, muy comunicativo y transparente. No hubo sorpresas durante todo el contrato. Siempre atento a mantener la propiedad en perfectas condiciones. Lo recomiendo totalmente.',
        },
        {
          id: '3',
          author: {
            name: 'Miguel Ángel Torres',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-02-28',
          comment: 'Iván es muy profesional y comprensivo. Cuando tuvimos un problema con el calentador, lo solucionó en menos de 24 horas. Es el tipo de propietario que todos los inquilinos desearían tener.',
        },
        {
          id: '4',
          author: {
            name: 'Sofia González',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-02-20',
          comment: 'Un placer tratar con Iván. Es justo, honesto y muy respetuoso con la privacidad de los inquilinos. La devolución del depósito fue rápida y sin inconvenientes. Propietario de 10.',
        },
        {
          id: '5',
          author: {
            name: 'David Ruiz',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2024-02-10',
          comment: 'Iván es un propietario modelo. Responde rápidamente a los mensajes, es flexible cuando es necesario y siempre mantiene una comunicación clara. Muy recomendable.',
        },
        {
          id: '6',
          author: {
            name: 'Ana Belén López',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 4,
          date: '2024-01-30',
          comment: 'Buen propietario en general. Respeta los acuerdos y es accesible. Hubo algunos retrasos en reparaciones menores pero nada grave. En general, una buena experiencia.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '7',
    title: 'Departamento 2 ambientes en Palermo',
    description: 'Departamento luminoso con balcón en el corazón de Palermo. Cerca de parques, restaurantes y transporte público. Ideal para parejas o profesionales.',
    type: 'apartment',
    price: 450000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Av. Santa Fe 3450, Palermo',
      coordinates: {
        lat: -34.5881,
        lng: -58.4055,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1630699376682-84df40131d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiYWxjb255JTIwdmlld3xlbnwxfHx8fDE3NjEzNjc3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 2,
    bathrooms: 1,
    guests: 3,
    totalArea: 65,
    coveredArea: 52,
    rooms: 2,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'Calefacción', 'Balcón', 'Lavadora'],
    host: {
      id: '6',
      name: 'Laura Méndez',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      joinedDate: '2019-04-12',
      rating: 4.7,
      reviewCount: 4,
      reviews: [
        {
          id: '25',
          author: {
            name: 'Gustavo Peralta',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-03-18',
          comment: 'Laura es muy profesional y atenta. Resolvió todas nuestras dudas antes de firmar el contrato.',
        },
        {
          id: '26',
          author: {
            name: 'Carla Benítez',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-02-25',
          comment: 'Excelente propietaria. Muy comunicativa y flexible. Recomiendo alquilar con ella.',
        },
        {
          id: '27',
          author: {
            name: 'Javier Ríos',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 4,
          date: '2024-02-05',
          comment: 'Buena propietaria. Algunos pequeños inconvenientes en mantenimiento pero siempre dispuesta a solucionarlos.',
        },
        {
          id: '28',
          author: {
            name: 'Silvana García',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-01-15',
          comment: 'Laura es honesta y transparente. Una muy buena experiencia de alquiler.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Casa con jardín en Belgrano',
    description: 'Amplia casa familiar con jardín y parrilla. Zona residencial tranquila, perfecta para familias. Espacios luminosos y bien distribuidos.',
    type: 'house',
    price: 580000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Calle Juramento 2890, Belgrano',
      coordinates: {
        lat: -34.5632,
        lng: -58.4583,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600488999806-8efb986d87b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGRpbmluZyUyMHJvb218ZW58MXx8fHwxNzYxNDQ1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    totalArea: 140,
    coveredArea: 115,
    rooms: 4,
    amenities: ['WiFi', 'Jardín', 'Parrilla', 'Estacionamiento', 'Cocina', 'Aire acondicionado', 'Calefacción'],
    host: {
      id: '7',
      name: 'Roberto Fernández',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      joinedDate: '2018-07-20',
      rating: 4.9,
      reviewCount: 5,
      reviews: [
        {
          id: '29',
          author: {
            name: 'Florencia Acosta',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-04-02',
          comment: 'Roberto es un propietario ejemplar. Muy responsable, atento y siempre dispuesto a ayudar. Excelente experiencia.',
        },
        {
          id: '30',
          author: {
            name: 'Martín Suárez',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-03-12',
          comment: 'Impecable en todos los aspectos. Roberto es justo, profesional y mantiene la propiedad en excelentes condiciones.',
        },
        {
          id: '31',
          author: {
            name: 'Gabriela Núñez',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-02-28',
          comment: 'Propietario de primera. Comunicación excelente y muy respetuoso. Totalmente recomendable.',
        },
        {
          id: '32',
          author: {
            name: 'Ezequiel Vargas',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-02-08',
          comment: 'Roberto responde siempre rápido y es muy transparente en todos los acuerdos. Excelente.',
        },
        {
          id: '33',
          author: {
            name: 'Paula Medina',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 4,
          date: '2024-01-22',
          comment: 'Muy buen propietario. Profesional y confiable. Una experiencia muy positiva.',
        },
      ],
    },
    isFavorite: true,
  },
  {
    id: '9',
    title: 'Monoambiente en Recoleta',
    description: 'Monoambiente moderno y funcional en zona céntrica. Perfecto para estudiantes o profesionales que buscan comodidad y ubicación estratégica.',
    type: 'apartment',
    price: 380000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Av. Callao 1250, Recoleta',
      coordinates: {
        lat: -34.5965,
        lng: -58.3926,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1603072819161-e864800276cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MTQ0NTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    totalArea: 42,
    coveredArea: 38,
    rooms: 1,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'Calefacción', 'Espacio de trabajo'],
    host: {
      id: '8',
      name: 'Carolina Méndez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      joinedDate: '2020-02-18',
      rating: 4.6,
      reviewCount: 3,
      reviews: [
        {
          id: '34',
          author: {
            name: 'Diego Herrera',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-03-05',
          comment: 'Carolina es muy atenta y profesional. Siempre dispuesta a resolver cualquier inconveniente.',
        },
        {
          id: '35',
          author: {
            name: 'Verónica Castro',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 4,
          date: '2024-02-12',
          comment: 'Buena propietaria, comunicación clara y respeta los acuerdos.',
        },
        {
          id: '36',
          author: {
            name: 'Lucas Domínguez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-01-18',
          comment: 'Carolina es muy confiable y responde rápidamente. Muy recomendable.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '10',
    title: 'Departamento luminoso en Caballito',
    description: 'Departamento amplio con excelente iluminación natural. Barrio tradicional con todos los servicios. Muy buena conectividad.',
    type: 'apartment',
    price: 420000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Av. Rivadavia 5890, Caballito',
      coordinates: {
        lat: -34.6212,
        lng: -58.4370,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjEzOTM1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    totalArea: 68,
    coveredArea: 58,
    rooms: 2,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'Calefacción', 'Balcón', 'Lavadora'],
    host: {
      id: '9',
      name: 'Andrés Morales',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      joinedDate: '2019-09-14',
      rating: 4.8,
      reviewCount: 4,
      reviews: [
        {
          id: '37',
          author: {
            name: 'Cecilia Romero',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-03-22',
          comment: 'Andrés es un propietario responsable y muy transparente. Excelente trato.',
        },
        {
          id: '38',
          author: {
            name: 'Nicolás Paz',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2024-02-18',
          comment: 'Muy buen propietario. Comunicación fluida y siempre atento.',
        },
        {
          id: '39',
          author: {
            name: 'Romina Aguilar',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-01-30',
          comment: 'Andrés es justo y profesional. Lo recomiendo sin dudas.',
        },
        {
          id: '40',
          author: {
            name: 'Maximiliano Cruz',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 4,
          date: '2024-01-08',
          comment: 'Buen propietario. Siempre disponible para consultas.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '11',
    title: 'Loft en Villa Crespo',
    description: 'Loft moderno tipo industrial con techos altos. Barrio bohemio y artístico. A pasos de cafés, bares y centros culturales.',
    type: 'apartment',
    price: 400000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Av. Corrientes 5600, Villa Crespo',
      coordinates: {
        lat: -34.5992,
        lng: -58.4364,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1631248988030-141c05a37dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2Z0JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTQ0NTk2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    totalArea: 55,
    coveredArea: 48,
    rooms: 2,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'Calefacción', 'Espacio de trabajo', 'TV'],
    host: {
      id: '10',
      name: 'Valeria Torres',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      joinedDate: '2021-01-08',
      rating: 4.5,
      reviewCount: 3,
      reviews: [
        {
          id: '41',
          author: {
            name: 'Federico Iglesias',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-03-08',
          comment: 'Valeria es muy profesional y atenta. Excelente propietaria.',
        },
        {
          id: '42',
          author: {
            name: 'Marcela Sosa',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 4,
          date: '2024-02-15',
          comment: 'Buena propietaria, comunicación clara y honesta.',
        },
        {
          id: '43',
          author: {
            name: 'Hernán Giménez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 4,
          date: '2024-01-22',
          comment: 'Valeria es confiable y responde bien. Recomendable.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '12',
    title: 'Departamento en Núñez',
    description: 'Departamento espacioso cerca del río. Barrio tranquilo con espacios verdes. Ideal para familias que buscan tranquilidad.',
    type: 'apartment',
    price: 390000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Av. Libertador 7200, Núñez',
      coordinates: {
        lat: -34.5448,
        lng: -58.4510,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1638799869566-b17fa794c4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbXxlbnwxfHx8fDE3NjE0NDU5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 3,
    bathrooms: 2,
    guests: 5,
    totalArea: 90,
    coveredArea: 78,
    rooms: 3,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'Calefacción', 'Balcón', 'Estacionamiento', 'Lavadora'],
    host: {
      id: '11',
      name: 'Gabriel Suárez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      joinedDate: '2020-06-22',
      rating: 4.7,
      reviewCount: 4,
      reviews: [
        {
          id: '44',
          author: {
            name: 'Adriana Molina',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-03-14',
          comment: 'Gabriel es un propietario excelente. Muy responsable y atento.',
        },
        {
          id: '45',
          author: {
            name: 'Tomás Villalba',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-02-20',
          comment: 'Impecable. Gabriel es profesional y muy transparente.',
        },
        {
          id: '46',
          author: {
            name: 'Lorena Cabrera',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 4,
          date: '2024-01-28',
          comment: 'Buen propietario, comunicación clara y honesta.',
        },
        {
          id: '47',
          author: {
            name: 'Ignacio Pereyra',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2024-01-10',
          comment: 'Gabriel es confiable y justo. Muy recomendable.',
        },
      ],
    },
    isFavorite: true,
  },
  {
    id: '13',
    title: 'Departamento en Almagro',
    description: 'Departamento tradicional en barrio residencial. Excelente ubicación con fácil acceso a transporte público. Zona comercial muy activa.',
    type: 'apartment',
    price: 330000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Av. Corrientes 4200, Almagro',
      coordinates: {
        lat: -34.6032,
        lng: -58.4202,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1625579002297-aeebbf69de89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMzYxMjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 2,
    bathrooms: 1,
    guests: 3,
    totalArea: 60,
    coveredArea: 52,
    rooms: 2,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'Calefacción', 'Balcón'],
    host: {
      id: '12',
      name: 'Paula Giménez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      joinedDate: '2019-11-30',
      rating: 4.4,
      reviewCount: 3,
      reviews: [
        {
          id: '48',
          author: {
            name: 'Esteban Ríos',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 4,
          date: '2024-03-01',
          comment: 'Paula es una buena propietaria. Responde bien y es transparente.',
        },
        {
          id: '49',
          author: {
            name: 'Bárbara Ortega',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-02-08',
          comment: 'Excelente propietaria. Muy atenta y profesional.',
        },
        {
          id: '50',
          author: {
            name: 'Rodrigo Benítez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 4,
          date: '2024-01-12',
          comment: 'Buen trato. Paula es confiable y cumple con los acuerdos.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '14',
    title: 'Casa en Villa Urquiza',
    description: 'Casa con patio y quincho en barrio familiar. Ambiente tranquilo y seguro. Perfecta para quienes buscan espacio y comodidad.',
    type: 'house',
    price: 520000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Calle Blanco Encalada 5200, Villa Urquiza',
      coordinates: {
        lat: -34.5721,
        lng: -58.4836,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800',
      'https://images.unsplash.com/photo-1642068338024-beb9d132ef1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHBvb2wlMjBhcmVhfGVufDF8fHx8MTc2MTQ0NTk2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    totalArea: 125,
    coveredArea: 105,
    rooms: 4,
    amenities: ['WiFi', 'Jardín', 'Parrilla', 'Estacionamiento', 'Cocina', 'Aire acondicionado', 'Calefacción', 'Patio'],
    host: {
      id: '13',
      name: 'Fernando Castro',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      joinedDate: '2018-03-15',
      rating: 4.8,
      reviewCount: 4,
      reviews: [
        {
          id: '51',
          author: {
            name: 'Mónica Palacios',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-03-28',
          comment: 'Fernando es un propietario excelente. Muy responsable y atento a todo.',
        },
        {
          id: '52',
          author: {
            name: 'Claudio Medina',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-02-22',
          comment: 'Impecable. Fernando es profesional y muy transparente.',
        },
        {
          id: '53',
          author: {
            name: 'Silvia Romero',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-01-30',
          comment: 'Excelente propietario. Comunicación perfecta y muy justo.',
        },
        {
          id: '54',
          author: {
            name: 'Oscar Navarro',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 4,
          date: '2024-01-15',
          comment: 'Muy buen propietario. Confiable y cumplidor.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '15',
    title: 'Departamento en San Telmo',
    description: 'Departamento con encanto histórico en el barrio de San Telmo. Cerca de la feria dominical y centros culturales. Arquitectura única.',
    type: 'apartment',
    price: 360000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Calle Defensa 850, San Telmo',
      coordinates: {
        lat: -34.6217,
        lng: -58.3724,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1630699376682-84df40131d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiYWxjb255JTIwdmlld3xlbnwxfHx8fDE3NjEzNjc3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 2,
    bathrooms: 1,
    guests: 3,
    totalArea: 72,
    coveredArea: 60,
    rooms: 2,
    amenities: ['WiFi', 'Cocina', 'Aire acondicionado', 'Calefacción', 'Balcón', 'TV'],
    host: {
      id: '14',
      name: 'Mariana Vega',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      joinedDate: '2020-08-05',
      rating: 4.6,
      reviewCount: 3,
      reviews: [
        {
          id: '55',
          author: {
            name: 'Ariel Godoy',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-03-11',
          comment: 'Mariana es muy profesional y atenta. Excelente propietaria.',
        },
        {
          id: '56',
          author: {
            name: 'Julieta Campos',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 4,
          date: '2024-02-16',
          comment: 'Buena propietaria, comunicación clara y honesta.',
        },
        {
          id: '57',
          author: {
            name: 'Raúl Flores',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-01-25',
          comment: 'Mariana es confiable y responde rápido. Muy recomendable.',
        },
      ],
    },
    isFavorite: false,
  },
  {
    id: '16',
    title: 'PH en Colegiales',
    description: 'PH moderno con terraza propia. Barrio residencial tranquilo con excelente calidad de vida. Espacio al aire libre único.',
    type: 'house',
    price: 500000,
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Calle Virrey del Pino 3100, Colegiales',
      coordinates: {
        lat: -34.5742,
        lng: -58.4540,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1702014861736-d62834317c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MTQ0NTk2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    totalArea: 95,
    coveredArea: 75,
    rooms: 3,
    amenities: ['WiFi', 'Terraza', 'Parrilla', 'Cocina', 'Aire acondicionado', 'Calefacción', 'Lavadora', 'TV'],
    host: {
      id: '15',
      name: 'Sebastián Ríos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      joinedDate: '2019-05-28',
      rating: 4.9,
      reviewCount: 4,
      reviews: [
        {
          id: '58',
          author: {
            name: 'Pablo Mendoza',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-03-05',
          comment: 'Sebastián es un propietario ejemplar. Muy profesional y atento.',
        },
        {
          id: '59',
          author: {
            name: 'Carolina Ruiz',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-02-18',
          comment: 'Excelente propietario, siempre disponible y muy responsable.',
        },
        {
          id: '60',
          author: {
            name: 'Martín Silva',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-01-22',
          comment: 'Muy buen propietario. Comunicación clara y honesta.',
        },
        {
          id: '61',
          author: {
            name: 'Ana Belén Castro',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-01-10',
          comment: 'Sebastián es confiable y justo. Muy recomendable.',
        },
      ],
    },
    isFavorite: true,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    property: mockProperties[0],
    checkIn: '2025-10-25',
    checkOut: '2025-10-30',
    guests: 2,
    totalPrice: 600,
    status: 'upcoming',
  },
  {
    id: 'b2',
    property: mockProperties[1],
    checkIn: '2025-09-10',
    checkOut: '2025-09-15',
    guests: 4,
    totalPrice: 1750,
    status: 'completed',
  },
  {
    id: 'b3',
    property: mockProperties[2],
    checkIn: '2025-11-05',
    checkOut: '2025-11-08',
    guests: 6,
    totalPrice: 285,
    status: 'upcoming',
  },
];

export interface RentalProposal {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyPrice: number;
  propertyAddress: string;
  tenant: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    reviews: Review[];
    aiSummary: string;
  };
  message: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected' | 'replied';
  moveInDate?: string;
  premiumUnlocked?: boolean;
  visitScheduled?: boolean;
}

export const mockRentalProposals: RentalProposal[] = [
  {
    id: 'p1',
    propertyId: '1',
    propertyTitle: 'Apartamento moderno en el centro',
    propertyImage: 'https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MTM4ODg0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    propertyPrice: 350000,
    propertyAddress: 'Av. Colón 125, Centro, Córdoba, Argentina',
    tenant: {
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+54 11 5678-9012',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 4.8,
      reviewCount: 7,
      aiSummary: 'María es una inquilina ejemplar con excelente historial de alquiler. Los propietarios destacan su responsabilidad en los pagos puntuales, cuidado excepcional de las propiedades y comunicación proactiva. Mantiene los espacios en perfecto estado, respeta las normas y es una persona tranquila y considerada con los vecinos. Altamente recomendada para contratos de largo plazo.',
      reviews: [
        {
          id: 'r1',
          author: {
            name: 'Roberto Sánchez',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-08-15',
          comment: 'María fue una inquilina excepcional durante 3 años. Siempre pagó puntual, cuidó la propiedad como si fuera propia y mantuvo excelente comunicación. Al finalizar el contrato, entregó el departamento en perfectas condiciones. Sin dudas la recomendaría a cualquier propietario.',
        },
        {
          id: 'r2',
          author: {
            name: 'Carmen López',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2023-12-20',
          comment: 'Muy responsable y cuidadosa. Durante los dos años que alquiló mi propiedad nunca tuve ningún problema. Pagos siempre a tiempo y mantuvo todo en excelente estado. Es el tipo de inquilina que todo propietario desea.',
        },
        {
          id: 'r3',
          author: {
            name: 'Diego Martínez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2023-06-10',
          comment: 'Excelente inquilina. Muy ordenada, respetuosa y cumplida con todos los términos del contrato. La comunicación fue siempre fluida y profesional.',
        },
        {
          id: 'r4',
          author: {
            name: 'Patricia Romero',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 5,
          date: '2022-11-05',
          comment: 'María es una persona muy confiable. Pagos puntuales, cuidado impecable de la propiedad y excelente relación con vecinos. 100% recomendable.',
        },
        {
          id: 'r5',
          author: {
            name: 'Jorge Castro',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 4,
          date: '2022-03-22',
          comment: 'Buena inquilina en general. Responsable con los pagos y el cuidado del inmueble. Muy recomendable.',
        },
        {
          id: 'r6',
          author: {
            name: 'Ana Fernández',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2021-09-18',
          comment: 'Una inquilina modelo. Siempre atenta y cuidadosa con la propiedad. Los 3 años de contrato fueron impecables.',
        },
        {
          id: 'r7',
          author: {
            name: 'Luis Ramírez',
            avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150',
          },
          rating: 5,
          date: '2021-01-12',
          comment: 'María demostró ser una inquilina responsable y confiable. Pagos siempre puntuales y cuidó muy bien el departamento.',
        },
      ],
    },
    message: 'Hola, estoy muy interesada en alquilar tu propiedad. Soy profesional, trabajo en el sector IT y busco un lugar tranquilo cerca del centro. Me gustaría coordinar una visita para conocer el departamento. Planeo mudarme aproximadamente a mediados de noviembre. Quedo atenta a tu respuesta. Saludos cordiales.',
    date: '2025-10-24T14:30:00',
    status: 'pending',
    moveInDate: '2025-11-15',
  },
  {
    id: 'p2',
    propertyId: '3',
    propertyTitle: 'Casa de playa en la costa',
    propertyImage: 'https://images.unsplash.com/photo-1678691372122-cdf194a1b1fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwY29hc3RhbHxlbnwxfHx8fDE3NjE0NTQ1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    propertyPrice: 420000,
    propertyAddress: 'Av. Pioneros km 8, Cerro Catedral, Bariloche, Argentina',
    tenant: {
      name: 'Roberto Fernández',
      email: 'roberto.fernandez@email.com',
      phone: '+54 223 456-7890',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 4.9,
      reviewCount: 5,
      aiSummary: 'Roberto y su familia son inquilinos ideales para propiedades familiares. Mantienen un hogar impecable, son extremadamente responsables con los pagos y el mantenimiento básico. Los propietarios valoran su excelente trato, respeto por las propiedades y su actitud colaborativa. Una familia confiable y tranquila, perfecta para contratos de largo plazo.',
      reviews: [
        {
          id: 'r8',
          author: {
            name: 'Silvina Torres',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 5,
          date: '2024-07-30',
          comment: 'Roberto y su familia alquilaron mi casa por 3 años. Fueron inquilinos ejemplares. La familia es muy respetuosa, cuidadosa con la propiedad y siempre cumplieron con los pagos. Los niños son educados y no hubo ninguna queja de los vecinos. Excelentes inquilinos.',
        },
        {
          id: 'r9',
          author: {
            name: 'Marcos Gutiérrez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2023-11-15',
          comment: 'Una familia ejemplar. Roberto siempre se comunicó de manera clara y resolvió cualquier tema de mantenimiento básico. Dejaron la propiedad en perfectas condiciones. Los recomiendo completamente.',
        },
        {
          id: 'r10',
          author: {
            name: 'Claudia Benítez',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2022-09-08',
          comment: 'Excelente inquilino. Muy responsable con los pagos y el cuidado de la casa. Su familia es muy ordenada y respetuosa.',
        },
        {
          id: 'r11',
          author: {
            name: 'Fernando Ríos',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2021-12-20',
          comment: 'Roberto fue un inquilino modelo durante los 3 años de contrato. Familia responsable y cuidadosa. 100% recomendable.',
        },
        {
          id: 'r12',
          author: {
            name: 'Mónica Sosa',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2020-08-14',
          comment: 'Una familia maravillosa. Cuidaron mi propiedad como si fuera suya. Muy confiables y respetuosos.',
        },
      ],
    },
    message: 'Buenos días, somos una familia de 4 personas (matrimonio con dos hijos de 8 y 12 años) y estamos buscando una casa para alquilar por tres años. Ambos trabajamos de forma remota y necesitamos un espacio tranquilo. Contamos con excelentes referencias de nuestro anterior propietario. ¿Podríamos coordinar una visita esta semana? Muchas gracias.',
    date: '2025-10-23T10:15:00',
    status: 'pending',
    moveInDate: '2025-12-01',
  },
  {
    id: 'p3',
    propertyId: '5',
    propertyTitle: 'Apartamento luminoso en Palermo',
    propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    propertyPrice: 450000,
    propertyAddress: 'Av. Santa Fe 3450, Palermo, Buenos Aires, Argentina',
    tenant: {
      name: 'Lucía Ramírez',
      email: 'lucia.ramirez@email.com',
      phone: '+54 11 4321-5678',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4.6,
      reviewCount: 4,
      aiSummary: 'Lucía es una inquilina confiable con buen historial de pagos. Como freelance que trabaja desde casa, valora y cuida especialmente los espacios. Los propietarios destacan su responsabilidad y comunicación fluida, aunque ocasionalmente puede haber pequeños retrasos en los pagos. En general, es una inquilina recomendable para propietarios que busquen estabilidad.',
      reviews: [
        {
          id: 'r13',
          author: {
            name: 'Pablo Medina',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-05-12',
          comment: 'Lucía fue una excelente inquilina. Muy cuidadosa con el departamento y siempre mantuvo una buena comunicación. Pagos puntuales durante todo el contrato de 3 años.',
        },
        {
          id: 'r14',
          author: {
            name: 'Gabriela Paz',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 5,
          date: '2023-08-25',
          comment: 'Muy buena inquilina. Ordenada, responsable y respetuosa. La recomendaría sin dudas.',
        },
        {
          id: 'r15',
          author: {
            name: 'Hernán Silva',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 4,
          date: '2022-10-18',
          comment: 'Buena inquilina en general. Ocasionalmente los pagos se demoraban unos días, pero siempre cumplió. Cuidó bien la propiedad.',
        },
        {
          id: 'r16',
          author: {
            name: 'Verónica Lagos',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2021-11-30',
          comment: 'Lucía es una persona muy responsable y tranquila. Cuidó muy bien mi departamento durante los 3 años de contrato.',
        },
      ],
    },
    message: 'Hola! Vi tu propiedad y me encantó. Soy diseñadora gráfica freelance, trabajo desde casa y busco un lugar luminoso y tranquilo en Palermo. Tengo ingresos demostrables y garantía propietaria. Me gustaría visitarla lo antes posible. ¿Cuándo estarías disponible? Gracias!',
    date: '2025-10-22T16:45:00',
    status: 'replied',
    moveInDate: '2025-11-01',
  },
  {
    id: 'p4',
    propertyId: '2',
    propertyTitle: 'Villa con jardín privado',
    propertyImage: 'https://images.unsplash.com/photo-1629079447777-1e605162dc8d?w=800',
    propertyPrice: 350000,
    propertyAddress: 'Calle Los Álamos 850, Nordelta, Buenos Aires, Argentina',
    tenant: {
      name: 'Diego Martínez',
      email: 'diego.martinez@email.com',
      phone: '+54 11 2345-6789',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 5.0,
      reviewCount: 6,
      aiSummary: 'Diego es un inquilino premium con historial impecable. Como ejecutivo multinacional, demuestra alta responsabilidad financiera con pagos siempre adelantados. Mantiene propiedades en condiciones excepcionales y tiene excelente relación con vecinos. Los propietarios destacan su profesionalismo, comunicación proactiva y el cuidado meticuloso de las viviendas. Ideal para propiedades de alto nivel y contratos de largo plazo.',
      reviews: [
        {
          id: 'r17',
          author: {
            name: 'Alejandra Moreno',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 5,
          date: '2024-09-20',
          comment: 'Diego y su familia fueron inquilinos excepcionales. Siempre pagaron adelantado, mantuvieron la casa impecable y hasta mejoraron algunas cosas del jardín por su cuenta. Una familia modelo, no puedo recomendarlos más.',
        },
        {
          id: 'r18',
          author: {
            name: 'Ricardo Valdés',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2023-12-10',
          comment: 'Inquilino impecable. Profesional, responsable y muy cuidadoso con la propiedad. Los 3 años de contrato fueron perfectos en todos los aspectos.',
        },
        {
          id: 'r19',
          author: {
            name: 'Sofía Navarro',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2023-03-15',
          comment: 'Excelente inquilino. Pagos siempre puntuales, comunicación fluida y dejó la propiedad en perfectas condiciones. Su familia es muy educada y respetuosa.',
        },
        {
          id: 'r20',
          author: {
            name: 'Julián Herrera',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2022-07-22',
          comment: 'Diego es el tipo de inquilino que todo propietario desea. Responsable, ordenado y muy confiable. 100% recomendable.',
        },
        {
          id: 'r21',
          author: {
            name: 'Natalia Campos',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2021-10-05',
          comment: 'Inquilino excepcional. Cuidó mi propiedad de manera impecable y siempre fue muy profesional en todo.',
        },
        {
          id: 'r22',
          author: {
            name: 'Gustavo Peralta',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2020-11-18',
          comment: 'Tres años de contrato perfecto. Diego es un inquilino modelo en todos los sentidos. Altamente recomendable.',
        },
      ],
    },
    message: 'Buenas tardes, estoy interesado en alquilar su propiedad. Soy ejecutivo en una empresa multinacional, recién transferido a Buenos Aires. Busco una casa amplia y segura para mi familia (esposa y dos hijos). Tengo seguro de alquiler y puedo proporcionar toda la documentación necesaria. ¿Podemos coordinar una visita? Saludos.',
    date: '2025-10-21T11:20:00',
    status: 'accepted',
    moveInDate: '2025-11-10',
    premiumUnlocked: false,
    visitScheduled: true,
  },
  {
    id: 'p5',
    propertyId: '7',
    propertyTitle: 'Loft moderno en Recoleta',
    propertyImage: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
    propertyPrice: 380000,
    propertyAddress: 'Av. Callao 1250, Recoleta, Buenos Aires, Argentina',
    tenant: {
      name: 'Valeria Torres',
      email: 'valeria.torres@email.com',
      phone: '+54 11 6789-0123',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      rating: 4.7,
      reviewCount: 5,
      aiSummary: 'Valeria es una inquilina profesional y responsable. Como arquitecta, aprecia y cuida especialmente los espacios bien diseñados. Los propietarios valoran su puntualidad en los pagos, su orden y el excelente estado en que mantiene las propiedades. Es comunicativa y respetuosa con las normas. Recomendada para propiedades que requieran cuidado especial del diseño y espacios modernos.',
      reviews: [
        {
          id: 'r23',
          author: {
            name: 'Martín Ríos',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-06-18',
          comment: 'Valeria fue una inquilina excelente. Como arquitecta, realmente apreciaba y cuidaba los detalles del loft. Pagos siempre puntuales y comunicación muy profesional.',
        },
        {
          id: 'r24',
          author: {
            name: 'Elena Vargas',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2023-09-10',
          comment: 'Muy buena inquilina. Responsable, ordenada y muy cuidadosa con el espacio. La recomiendo totalmente.',
        },
        {
          id: 'r25',
          author: {
            name: 'Federico Luna',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2022-11-22',
          comment: 'Excelente inquilina. Valeria es muy profesional y cuidadosa. Durante los 3 años no tuve ningún problema.',
        },
        {
          id: 'r26',
          author: {
            name: 'Carolina Díaz',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 4,
          date: '2021-12-08',
          comment: 'Buena inquilina. Responsable con los pagos y cuidadosa con la propiedad. Recomendable.',
        },
        {
          id: 'r27',
          author: {
            name: 'Andrés Molina',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2020-08-15',
          comment: 'Valeria es una persona muy confiable y ordenada. Fue un placer tenerla como inquilina durante 3 años.',
        },
      ],
    },
    message: 'Hola, me interesa mucho tu loft. Soy arquitecta y el espacio me parece ideal para vivir y trabajar. Actualmente alquilo en Belgrano pero busco algo más cerca de mis proyectos. Tengo recibos de sueldo y referencias. ¿Está disponible para ver esta semana?',
    date: '2025-10-20T09:30:00',
    status: 'rejected',
    moveInDate: '2025-11-20',
  },
];

// Propuestas desde la perspectiva del inquilino
export interface TenantProposalResponse {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyPrice: number;
  propertyAddress: string;
  owner: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    rating: number;
    reviewCount: number;
    reviews: Review[];
  };
  message: string;
  sentDate: string;
  status: 'pending' | 'accepted' | 'rejected' | 'replied';
  responseDate?: string;
  responseMessage?: string;
  moveInDate?: string;
  premiumUnlocked?: boolean;
  visitScheduled?: boolean;
}

export const mockTenantProposals: TenantProposalResponse[] = [
  {
    id: 'tp1',
    propertyId: '1',
    propertyTitle: 'Apartamento moderno en el centro',
    propertyImage: 'https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MTM4ODg0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    propertyPrice: 350000,
    propertyAddress: 'Av. Colón 125, Centro, Córdoba, Argentina',
    owner: {
      name: 'Iván Pérez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      email: 'ivan.perez@email.com',
      phone: '+54 11 4567-8901',
      rating: 4.9,
      reviewCount: 6,
      reviews: [
        {
          id: '1',
          author: {
            name: 'Carlos Martínez',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2024-03-15',
          comment: 'Iván es un propietario excepcional. Siempre disponible para resolver cualquier duda, muy respetuoso con los tiempos de respuesta y profesional en todos los aspectos. Facilita mucho el proceso de alquiler.',
        },
        {
          id: '2',
          author: {
            name: 'Laura Fernández',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          },
          rating: 5,
          date: '2024-03-10',
          comment: 'Excelente propietario, muy comunicativo y transparente. No hubo sorpresas durante todo el contrato. Siempre atento a mantener la propiedad en perfectas condiciones. Lo recomiendo totalmente.',
        },
        {
          id: '3',
          author: {
            name: 'Miguel Ángel Torres',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-02-28',
          comment: 'Iván es muy profesional y comprensivo. Cuando tuvimos un problema con el calentador, lo solucionó en menos de 24 horas. Es el tipo de propietario que todos los inquilinos desearían tener.',
        },
        {
          id: '4',
          author: {
            name: 'Sofia González',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-02-20',
          comment: 'Un placer tratar con Iván. Es justo, honesto y muy respetuoso con la privacidad de los inquilinos. La devolución del depósito fue rápida y sin inconvenientes. Propietario de 10.',
        },
        {
          id: '5',
          author: {
            name: 'David Ruiz',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2024-02-10',
          comment: 'Iván es un propietario modelo. Responde rápidamente a los mensajes, es flexible cuando es necesario y siempre mantiene una comunicación clara. Muy recomendable.',
        },
        {
          id: '6',
          author: {
            name: 'Ana Belén López',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 4,
          date: '2024-01-30',
          comment: 'Buen propietario en general. Respeta los acuerdos y es accesible. Hubo algunos retrasos en reparaciones menores pero nada grave. En general, una buena experiencia.',
        },
      ],
    },
    message: 'Hola, estoy muy interesada en alquilar tu propiedad. Soy profesional, trabajo en el sector IT y busco un lugar tranquilo cerca del centro. Me gustaría coordinar una visita para conocer el departamento. Planeo mudarme aproximadamente a mediados de noviembre. Quedo atenta a tu respuesta. Saludos cordiales.',
    sentDate: '2025-10-24T14:30:00',
    status: 'accepted',
    responseDate: '2025-10-25T09:15:00',
    responseMessage: '¡Hola María! Me alegra tu interés. Tu perfil me parece excelente y veo que tienes muy buenas referencias. Me gustaría coordinar una visita para esta semana. ¿Te viene bien el miércoles por la tarde? Podemos hablar más detalles del contrato en persona. Saludos!',
    moveInDate: '2025-11-15',
    premiumUnlocked: false,
    visitScheduled: true,
  },
  {
    id: 'tp2',
    propertyId: '8',
    propertyTitle: 'Departamento 2 ambientes en Palermo',
    propertyImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    propertyPrice: 320000,
    propertyAddress: 'Avenida Santa Fe 3450, Palermo, Buenos Aires, Argentina',
    owner: {
      name: 'Laura Sánchez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      email: 'laura.sanchez@email.com',
      phone: '+54 11 3456-7890',
      rating: 4.8,
      reviewCount: 12,
      reviews: [
        {
          id: '1',
          author: {
            name: 'Roberto Díaz',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-09-15',
          comment: 'Laura es una propietaria excepcional. Muy comunicativa y siempre dispuesta a ayudar. El proceso de alquiler fue muy fluido y sin complicaciones.',
        },
        {
          id: '2',
          author: {
            name: 'Valentina Russo',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-08-20',
          comment: 'Excelente experiencia alquilando con Laura. Es muy profesional, responde rápido y mantiene la propiedad en perfectas condiciones. Totalmente recomendable.',
        },
        {
          id: '3',
          author: {
            name: 'Javier Moreno',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          },
          rating: 5,
          date: '2024-07-10',
          comment: 'Laura es muy atenta y resolutiva. Cuando surgió un problema con el aire acondicionado, lo solucionó inmediatamente. Gran propietaria.',
        },
        {
          id: '4',
          author: {
            name: 'Camila Torres',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2024-06-25',
          comment: 'Muy buena propietaria, flexible y comprensiva. Siempre respeta los acuerdos y es muy transparente en todo. La recomiendo al 100%.',
        },
        {
          id: '5',
          author: {
            name: 'Andrés Silva',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-05-18',
          comment: 'Laura es una propietaria modelo. Comunicación excelente, muy profesional y siempre disponible cuando se la necesita.',
        },
        {
          id: '6',
          author: {
            name: 'Lucía Ramírez',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          },
          rating: 5,
          date: '2024-04-12',
          comment: 'Muy contenta con Laura como propietaria. Es justa, honesta y muy atenta a las necesidades de los inquilinos.',
        },
        {
          id: '7',
          author: {
            name: 'Federico Gómez',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2024-03-08',
          comment: 'Propietaria excelente. Laura es muy comunicativa, profesional y facilita mucho todo el proceso de alquiler.',
        },
        {
          id: '8',
          author: {
            name: 'Martina López',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 5,
          date: '2024-02-14',
          comment: 'Laura responde siempre de manera rápida y eficiente. Es muy respetuosa y profesional en todo momento.',
        },
        {
          id: '9',
          author: {
            name: 'Sebastián Flores',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 4,
          date: '2024-01-20',
          comment: 'Buena propietaria en general. Algunas demoras menores en ciertos trámites pero nada grave. Recomendable.',
        },
        {
          id: '10',
          author: {
            name: 'Isabella Medina',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2023-12-15',
          comment: 'Laura es muy profesional y atenta. Siempre mantiene una comunicación clara y resuelve cualquier inconveniente rápidamente.',
        },
        {
          id: '11',
          author: {
            name: 'Tomás Castro',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 4,
          date: '2023-11-10',
          comment: 'Muy buena experiencia en general. Laura es comunicativa y profesional. Hubo un pequeño retraso en una reparación pero lo solucionó.',
        },
        {
          id: '12',
          author: {
            name: 'Sofía Benítez',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2023-10-05',
          comment: 'Excelente propietaria. Laura es confiable, transparente y muy respetuosa. La recomiendo totalmente para alquilar.',
        },
      ],
    },
    message: 'Buenas tardes, me encantó tu departamento. Trabajo de forma remota y busco un lugar luminoso y tranquilo. Cuento con recibos de sueldo, garantía propietaria y excelentes referencias. ¿Podríamos coordinar una visita? Estoy disponible cualquier día de la semana. Muchas gracias!',
    sentDate: '2025-10-23T11:20:00',
    status: 'pending',
    moveInDate: '2025-12-01',
  },
  {
    id: 'tp3',
    propertyId: '12',
    propertyTitle: 'Loft moderno con balcón',
    propertyImage: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
    propertyPrice: 310000,
    propertyAddress: 'Calle Gorriti 5632, Palermo Soho, Buenos Aires, Argentina',
    owner: {
      name: 'Sebastián Ríos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      email: 'sebastian.rios@email.com',
      phone: '+54 11 5678-9012',
      rating: 4.7,
      reviewCount: 9,
      reviews: [
        {
          id: '1',
          author: {
            name: 'María Fernández',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-08-12',
          comment: 'Sebastián es un propietario muy profesional y comunicativo. Siempre disponible para resolver dudas y muy respetuoso.',
        },
        {
          id: '2',
          author: {
            name: 'Diego Ortiz',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-07-05',
          comment: 'Excelente propietario. Sebastián es transparente en todo y mantiene la propiedad en muy buen estado.',
        },
        {
          id: '3',
          author: {
            name: 'Carolina Vega',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2024-06-18',
          comment: 'Muy buen propietario, atento y profesional. Responde rápido y es muy claro en los acuerdos.',
        },
        {
          id: '4',
          author: {
            name: 'Lucas Pérez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-05-22',
          comment: 'Sebastián es un propietario ejemplar. Muy comunicativo y siempre dispuesto a solucionar cualquier inconveniente.',
        },
        {
          id: '5',
          author: {
            name: 'Florencia Ruiz',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          },
          rating: 4,
          date: '2024-04-10',
          comment: 'Buen propietario en general. Algunas demoras en responder pero siempre cumplió con lo acordado.',
        },
        {
          id: '6',
          author: {
            name: 'Mateo Sosa',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2024-03-15',
          comment: 'Sebastián es muy profesional y confiable. La comunicación fue excelente durante todo el contrato.',
        },
        {
          id: '7',
          author: {
            name: 'Catalina Méndez',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 4,
          date: '2024-02-08',
          comment: 'Buena experiencia. Sebastián es atento aunque a veces tardó un poco en resolver algunos temas de mantenimiento.',
        },
        {
          id: '8',
          author: {
            name: 'Nicolás Rojas',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-01-12',
          comment: 'Muy buen propietario. Sebastián es honesto, claro y muy profesional en todo momento.',
        },
        {
          id: '9',
          author: {
            name: 'Valentina Herrera',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 4,
          date: '2023-12-05',
          comment: 'Propietario correcto y responsable. Cumplió con todo lo pactado aunque podría mejorar los tiempos de respuesta.',
        },
      ],
    },
    message: 'Hola! Vi tu loft y me pareció perfecto. Soy diseñadora gráfica y trabajo desde casa, por lo que valoro mucho la luz natural y el espacio. Tengo muy buenas referencias de mis anteriores propietarios y estabilidad laboral comprobable. ¿Está disponible para visitarlo esta semana?',
    sentDate: '2025-10-22T16:45:00',
    status: 'rejected',
    responseDate: '2025-10-23T10:30:00',
    responseMessage: 'Hola María, gracias por tu interés. Lamentablemente ya acepté una propuesta de otro inquilino que se ajustaba mejor a mis necesidades actuales. Te deseo mucha suerte en tu búsqueda y te recomiendo seguir viendo otras opciones en la zona.',
    moveInDate: '2025-11-20',
  },
  {
    id: 'tp4',
    propertyId: '15',
    propertyTitle: 'Apartamento luminoso en Recoleta',
    propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    propertyPrice: 105000,
    propertyAddress: 'Avenida Callao 1850, Recoleta',
    owner: {
      name: 'Patricia Vega',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      email: 'patricia.vega@email.com',
      phone: '+54 11 6789-0123',
      rating: 4.9,
      reviewCount: 15,
      reviews: [
        {
          id: '1',
          author: {
            name: 'Fernando López',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-09-10',
          comment: 'Patricia es una propietaria excepcional. Muy atenta, comunicativa y profesional. Todo el proceso fue impecable.',
        },
        {
          id: '2',
          author: {
            name: 'Agustina Morales',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-08-25',
          comment: 'Excelente propietaria. Patricia es muy transparente y respetuosa. Siempre disponible cuando se la necesita.',
        },
        {
          id: '3',
          author: {
            name: 'Rodrigo Benítez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-07-18',
          comment: 'Patricia es muy profesional y confiable. La comunicación fue excelente y siempre cumplió con todo lo acordado.',
        },
        {
          id: '4',
          author: {
            name: 'Jimena Castro',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2024-06-12',
          comment: 'Excelente experiencia. Patricia es muy atenta y resuelve cualquier problema de manera rápida y eficiente.',
        },
        {
          id: '5',
          author: {
            name: 'Ezequiel Sánchez',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2024-05-08',
          comment: 'Patricia es una propietaria modelo. Muy comunicativa, profesional y justa en todos los aspectos.',
        },
        {
          id: '6',
          author: {
            name: 'Micaela Torres',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          },
          rating: 5,
          date: '2024-04-15',
          comment: 'Muy buena propietaria. Patricia es clara, honesta y siempre responde de manera rápida.',
        },
        {
          id: '7',
          author: {
            name: 'Facundo Díaz',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-03-20',
          comment: 'Patricia es excelente como propietaria. Muy profesional, atenta y facilita mucho todo el proceso.',
        },
        {
          id: '8',
          author: {
            name: 'Brenda Romero',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 5,
          date: '2024-02-14',
          comment: 'Propietaria excepcional. Patricia es muy comunicativa y siempre dispuesta a ayudar en lo que se necesite.',
        },
        {
          id: '9',
          author: {
            name: 'Gonzalo Medina',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-01-10',
          comment: 'Muy buen trato y excelente comunicación. Patricia es una propietaria muy profesional y confiable.',
        },
        {
          id: '10',
          author: {
            name: 'Celeste Vargas',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2023-12-18',
          comment: 'Patricia es muy atenta y profesional. Siempre responde rápido y mantiene todo en orden.',
        },
        {
          id: '11',
          author: {
            name: 'Damián Acosta',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2023-11-22',
          comment: 'Excelente propietaria. Patricia es muy comunicativa, transparente y siempre cumple con lo acordado.',
        },
        {
          id: '12',
          author: {
            name: 'Antonella Silva',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 4,
          date: '2023-10-15',
          comment: 'Buena propietaria en general. Hubo un pequeño retraso en una reparación pero lo solucionó bien.',
        },
        {
          id: '13',
          author: {
            name: 'Ignacio Pereyra',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 5,
          date: '2023-09-10',
          comment: 'Patricia es muy profesional y confiable. La comunicación fue excelente durante todo el contrato.',
        },
        {
          id: '14',
          author: {
            name: 'Martina Navarro',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 5,
          date: '2023-08-05',
          comment: 'Excelente experiencia. Patricia es muy atenta, comunicativa y resuelve todo de manera eficiente.',
        },
        {
          id: '15',
          author: {
            name: 'Thiago Blanco',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2023-07-20',
          comment: 'Patricia es una propietaria ejemplar. Muy profesional, justa y siempre mantiene una buena comunicación.',
        },
      ],
    },
    message: 'Buenos días, estoy interesada en alquilar tu apartamento. Me encantó la ubicación y las características del inmueble. Soy profesional del sector IT con ingresos estables y excelentes referencias. Me gustaría visitarlo lo antes posible. Quedo atenta.',
    sentDate: '2025-10-21T09:15:00',
    status: 'replied',
    responseDate: '2025-10-21T14:20:00',
    responseMessage: 'Hola María, gracias por contactarte. Me gustaría saber un poco más sobre tu situación laboral actual y si cuentas con garantía. También quisiera coordinar una visita para que veas el departamento en persona. ¿Te viene bien el viernes a las 17hs?',
    moveInDate: '2025-11-10',
  },
  {
    id: 'tp5',
    propertyId: '9',
    propertyTitle: 'Monoambiente en Belgrano',
    propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    propertyPrice: 75000,
    propertyAddress: 'Calle Juramento 2145, Belgrano',
    owner: {
      name: 'Marcelo Fuentes',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      email: 'marcelo.fuentes@email.com',
      phone: '+54 11 7890-1234',
      rating: 4.6,
      reviewCount: 8,
      reviews: [
        {
          id: '1',
          author: {
            name: 'Camila Ortiz',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          },
          rating: 5,
          date: '2024-08-05',
          comment: 'Marcelo es un propietario muy comunicativo y profesional. Siempre disponible y atento a las necesidades.',
        },
        {
          id: '2',
          author: {
            name: 'Santiago Ríos',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 5,
          date: '2024-07-12',
          comment: 'Excelente propietario. Marcelo es muy transparente y cumple con todo lo acordado.',
        },
        {
          id: '3',
          author: {
            name: 'Paula Moreno',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
          },
          rating: 5,
          date: '2024-06-08',
          comment: 'Muy buen propietario. Marcelo es claro en los acuerdos y responde rápido ante cualquier consulta.',
        },
        {
          id: '4',
          author: {
            name: 'Maximiliano Paz',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          },
          rating: 5,
          date: '2024-05-15',
          comment: 'Marcelo es muy profesional y atento. La comunicación fue excelente durante todo el contrato.',
        },
        {
          id: '5',
          author: {
            name: 'Abril Fernández',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          },
          rating: 4,
          date: '2024-04-20',
          comment: 'Buen propietario en general. Hubo algunas demoras en ciertas reparaciones pero las solucionó.',
        },
        {
          id: '6',
          author: {
            name: 'Benjamín Castro',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
          },
          rating: 4,
          date: '2024-03-10',
          comment: 'Propietario correcto. Marcelo cumple con lo acordado aunque podría ser más rápido en responder.',
        },
        {
          id: '7',
          author: {
            name: 'Renata Giménez',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
          },
          rating: 5,
          date: '2024-02-05',
          comment: 'Marcelo es un propietario confiable y profesional. Muy buena experiencia en general.',
        },
        {
          id: '8',
          author: {
            name: 'Emiliano Herrera',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          },
          rating: 4,
          date: '2024-01-18',
          comment: 'Buena experiencia. Marcelo es honesto y cumplidor, aunque a veces tarda un poco en responder.',
        },
      ],
    },
    message: 'Hola, me interesa tu monoambiente. Busco algo funcional y bien ubicado. Trabajo en tecnología con ingresos demostrables. ¿Podemos coordinar una visita? Gracias.',
    sentDate: '2025-10-20T14:50:00',
    status: 'pending',
    moveInDate: '2025-12-15',
  },
];
