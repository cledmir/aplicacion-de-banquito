import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  QueryConstraint,
  DocumentData,
  DocumentReference,
  CollectionReference,
  setDoc,
  enableIndexedDbPersistence,
} from 'firebase/firestore';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { environment } from '../../../environments/environment';

/**
 * Servicio base de Firebase. Inicializa la app y expone
 * las instancias de Auth y Firestore.
 * Habilita persistencia offline para carga instantánea.
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private readonly app: FirebaseApp;
  private readonly secondaryApp: FirebaseApp;
  readonly db: Firestore;
  readonly auth: Auth;
  readonly secondaryAuth: Auth;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);

    // Segunda instancia de Firebase exclusiva para crear cuentas
    // sin afectar la sesión del usuario actual
    const secondaryAppName = 'secondaryApp';
    const existingApps = getApps();
    this.secondaryApp = existingApps.find(a => a.name === secondaryAppName)
      ?? initializeApp(environment.firebase, secondaryAppName);
    this.secondaryAuth = getAuth(this.secondaryApp);

    // Habilitar caché offline para carga instantánea
    enableIndexedDbPersistence(this.db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Firestore persistence: múltiples pestañas abiertas.');
      } else if (err.code === 'unimplemented') {
        console.warn('Firestore persistence: navegador no compatible.');
      }
    });
  }

  // ===== Firestore Helpers =====

  getCollection(path: string): CollectionReference<DocumentData> {
    return collection(this.db, path);
  }

  getDocRef(path: string, id: string): DocumentReference<DocumentData> {
    return doc(this.db, path, id);
  }

  async addDocument(path: string, data: DocumentData): Promise<string> {
    const ref = await addDoc(collection(this.db, path), data);
    return ref.id;
  }

  async setDocument(path: string, id: string, data: DocumentData): Promise<void> {
    await setDoc(doc(this.db, path, id), data);
  }

  async getDocument(path: string, id: string): Promise<DocumentData | null> {
    const docSnap = await getDoc(doc(this.db, path, id));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }

  async getDocuments(
    path: string,
    ...constraints: QueryConstraint[]
  ): Promise<DocumentData[]> {
    const q = query(collection(this.db, path), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  async updateDocument(
    path: string,
    id: string,
    data: Partial<DocumentData>,
  ): Promise<void> {
    await updateDoc(doc(this.db, path, id), data);
  }

  async deleteDocument(path: string, id: string): Promise<void> {
    await deleteDoc(doc(this.db, path, id));
  }

  // Re-export Firestore query helpers for use in repositories
  readonly where = where;
  readonly orderBy = orderBy;
}
