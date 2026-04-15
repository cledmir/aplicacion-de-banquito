import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  Unsubscribe,
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';
import { User } from '../../core/models';
import { UserRole } from '../../core/enums';

/**
 * Servicio de autenticación. Gestiona login, registro,
 * y el estado del usuario actual usando Signals.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly currentUser = signal<User | null>(null);
  private readonly loading = signal<boolean>(true);
  private readonly authUnsubscribe: Unsubscribe;

  readonly user = this.currentUser.asReadonly();
  readonly isLoading = this.loading.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === UserRole.ADMIN);
  readonly isPrincipalAdmin = computed(() => this.currentUser()?.isPrincipalAdmin === true);
  readonly isParticipant = computed(() => this.currentUser()?.role === UserRole.PARTICIPANT);

  constructor(private readonly firebase: FirebaseService) {
    this.authUnsubscribe = onAuthStateChanged(this.firebase.auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await this.firebase.getDocument('users', firebaseUser.uid);
        if (userData) {
            this.currentUser.set({
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? '',
              displayName: userData['displayName'] ?? firebaseUser.displayName ?? '',
              role: userData['role'] as UserRole,
              isPrincipalAdmin: (userData['isPrincipalAdmin'] as boolean) ?? false,
              createdAt: userData['createdAt']?.toDate?.() ?? new Date(),
            });
        }
      } else {
        this.currentUser.set(null);
      }
      this.loading.set(false);
    });
  }

  ngOnDestroy(): void {
    this.authUnsubscribe();
  }

  /**
   * Inicia sesión con email y contraseña.
   */
  async login(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(
      this.firebase.auth,
      email,
      password,
    );

    const userData = await this.firebase.getDocument('users', credential.user.uid);
    if (!userData) {
      throw new Error('Usuario no encontrado en la base de datos.');
    }

    const user: User = {
      uid: credential.user.uid,
      email: credential.user.email ?? '',
      displayName: userData['displayName'] ?? '',
      role: userData['role'] as UserRole,
      isPrincipalAdmin: (userData['isPrincipalAdmin'] as boolean) ?? false,
      createdAt: userData['createdAt']?.toDate?.() ?? new Date(),
    };

    this.currentUser.set(user);
    return user;
  }

  /**
   * Genera un email placeholder para cuentas sin correo real.
   */
  private generatePlaceholderEmail(): string {
    const id = Math.random().toString(36).substring(2, 8);
    return `user_${id}@banquito.local`;
  }

  /**
   * Verifica si un email es un placeholder generado.
   */
  static isPlaceholderEmail(email: string): boolean {
    return email.endsWith('@banquito.local');
  }

  /**
   * Registra un nuevo usuario (usado por el admin para crear cuentas).
   * Si no se proporciona email, genera uno temporal.
   * Nota: Esto cerrará la sesión del admin temporalmente en el cliente.
   */
  async registerUser(
    email: string,
    password: string,
    displayName: string,
    role: UserRole,
    isPrincipalAdmin: boolean = false,
  ): Promise<User> {
    const finalEmail = email.trim() || this.generatePlaceholderEmail();

    const credential = await createUserWithEmailAndPassword(
      this.firebase.auth,
      finalEmail,
      password,
    );

    await updateProfile(credential.user, { displayName });

    const now = new Date();
    const user: User = {
      uid: credential.user.uid,
      email: finalEmail,
      displayName,
      role,
      isPrincipalAdmin,
      createdAt: now,
    };

    await this.firebase.setDocument('users', credential.user.uid, {
      email: finalEmail,
      displayName,
      role,
      isPrincipalAdmin,
      createdAt: now,
    });

    return user;
  }

  /**
   * Setup inicial: registra al primer usuario como admin.
   * Solo funciona si no existen usuarios admin en Firestore.
   */
  async setupAdmin(
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    const existingAdmins = await this.firebase.getDocuments(
      'users',
      this.firebase.where('role', '==', UserRole.ADMIN),
    );

    if (existingAdmins.length > 0) {
      throw new Error('Ya existe un administrador. Usa el login normal.');
    }

    // El primer administrador siempre es el Principal
    return this.registerUser(email, password, displayName, UserRole.ADMIN, true);
  }

  /**
   * Modifica el rol de un usuario existente.
   * Útil para que un Administrador Principal ascienda o degrade a otros.
   */
  async updateUserRole(uid: string, newRole: UserRole): Promise<void> {
    await this.firebase.updateDocument('users', uid, { role: newRole });
  }

  /**
   * Actualiza el perfil de un usuario en Firestore (nombre, email).
   */
  async updateUserProfile(uid: string, data: { displayName?: string; email?: string }): Promise<void> {
    const updateData: Record<string, unknown> = {};
    if (data.displayName !== undefined) updateData['displayName'] = data.displayName;
    if (data.email !== undefined) updateData['email'] = data.email;
    await this.firebase.updateDocument('users', uid, updateData);
  }

  /**
   * Verifica si ya existe un admin registrado.
   */
  async hasAdmin(): Promise<boolean> {
    const admins = await this.firebase.getDocuments(
      'users',
      this.firebase.where('role', '==', UserRole.ADMIN),
    );
    return admins.length > 0;
  }

  /**
   * Cierra sesión.
   */
  async logout(): Promise<void> {
    await signOut(this.firebase.auth);
    this.currentUser.set(null);
  }
}
