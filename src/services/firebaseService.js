import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Cotizaciones
export const addQuotation = async (quotation) => {
  try {
    const docRef = await addDoc(collection(db, 'quotations'), quotation);
    return docRef.id;
  } catch (error) {
    console.error('Error adding quotation:', error);
    throw error;
  }
};

export const getQuotations = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'quotations'), orderBy('date', 'desc'))
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting quotations:', error);
    throw error;
  }
};

export const updateQuotation = async (id, quotation) => {
  try {
    await updateDoc(doc(db, 'quotations', id), quotation);
  } catch (error) {
    console.error('Error updating quotation:', error);
    throw error;
  }
};

export const deleteQuotation = async (id) => {
  try {
    await deleteDoc(doc(db, 'quotations', id));
  } catch (error) {
    console.error('Error deleting quotation:', error);
    throw error;
  }
};

// Clientes
export const addClient = async (client) => {
  try {
    const docRef = await addDoc(collection(db, 'clients'), client);
    return docRef.id;
  } catch (error) {
    console.error('Error adding client:', error);
    throw error;
  }
};

export const getClients = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'clients'), orderBy('empresa', 'asc'))
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting clients:', error);
    throw error;
  }
};

// Servicios
export const addService = async (service) => {
  try {
    const docRef = await addDoc(collection(db, 'services'), service);
    return docRef.id;
  } catch (error) {
    console.error('Error adding service:', error);
    throw error;
  }
};

export const getServices = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'services'), orderBy('name', 'asc'))
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting services:', error);
    throw error;
  }
};