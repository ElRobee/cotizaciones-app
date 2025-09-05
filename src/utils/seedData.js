import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

export const seedInitialData = async () => {
  try {
    // Clientes iniciales (los que proporcionaste)
    const clients = [
      {
        rut: '77648180-7',
        encargado: 'NN',
        empresa: 'Befoods',
        direccion: 'sin informar',
        ciudad: 'Viña del mar',
        region: 'Valparaíso',
        telefono: 'sin informar',
        email: 'sigpre@befoods.cl'
      },
      // ... más clientes
    ];

    // Servicios iniciales
    const services = [
      { name: 'PLATAFORMAS ELEVADORAS TIJERA', price: 100000 },
      { name: 'BRAZO ARTICULADO 16 MT', price: 100000 },
      // ... más servicios
    ];

    // Agregar clientes
    for (const client of clients) {
      await addDoc(collection(db, 'clients'), client);
    }

    // Agregar servicios
    for (const service of services) {
      await addDoc(collection(db, 'services'), service);
    }

    console.log('Datos iniciales agregados exitosamente');
  } catch (error) {
    console.error('Error agregando datos iniciales:', error);
  }
};