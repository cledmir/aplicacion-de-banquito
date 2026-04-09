import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService, FirebaseService } from '../../../../data/services';
import { UserRole } from '../../../../core/enums';

interface UserDisplay {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  isPrincipalAdmin: boolean;
  createdAt: Date;
}

@Component({
  selector: 'bf-user-management',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Usuarios</h1>
          <p class="page-header__subtitle">Gestiona las cuentas de participantes</p>
        </div>
      </div>

      <!-- Create User Form -->
      <div class="create-user-card">
        <h3 class="section-title">
          <mat-icon>person_add</mat-icon>
          Crear Cuenta de Participante
        </h3>

        <div class="create-form">
          <mat-form-field appearance="outline">
            <mat-label>Nombre completo</mat-label>
            <input matInput [(ngModel)]="newName" name="name" id="user-name" />
            <mat-icon matPrefix>person</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Correo electrónico</mat-label>
            <input matInput type="email" [(ngModel)]="newEmail" name="email" id="user-email" />
            <mat-icon matPrefix>email</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Contraseña</mat-label>
            <input matInput type="text" [(ngModel)]="newPassword" name="password" id="user-password" />
            <mat-icon matPrefix>lock</mat-icon>
          </mat-form-field>

          @if (errorMessage()) {
            <div class="form-error">
              <mat-icon>error_outline</mat-icon>
              {{ errorMessage() }}
            </div>
          }

          @if (successMessage()) {
            <div class="form-success">
              <mat-icon>check_circle</mat-icon>
              {{ successMessage() }}
            </div>
          }

          <button mat-flat-button color="primary" (click)="createUser()"
                  [disabled]="isCreating()" class="create-btn" id="create-user-btn">
            @if (isCreating()) {
              <mat-spinner diameter="20" />
            } @else {
              <ng-container>Crear Cuenta</ng-container>
            }
          </button>
        </div>

        <div class="warning-note">
          <mat-icon>info</mat-icon>
          <span>
            <strong>Nota:</strong> Al crear una cuenta, la sesión actual se cerrará temporalmente.
            Deberás volver a iniciar sesión como administrador.
          </span>
        </div>
      </div>

      <!-- Users List -->
      <div class="users-card">
        <h3 class="section-title">
          <mat-icon>people</mat-icon>
          Usuarios registrados ({{ users().length }})
        </h3>

        @if (users().length > 0) {
          <div class="users-table">
            <div class="user-row header" [class.has-actions]="auth.isPrincipalAdmin()">
              <span>Nombre</span>
              <span>Email</span>
              <span>Rol</span>
              @if (auth.isPrincipalAdmin()) {
                <span>Acciones</span>
              }
            </div>
            @for (user of users(); track user.uid) {
              <div class="user-row" [class.has-actions]="auth.isPrincipalAdmin()">
                <span class="user-name-cell">
                  <span class="user-avatar-small">{{ getInitials(user.displayName) }}</span>
                  {{ user.displayName }}
                </span>
                <span class="user-email">{{ user.email }}</span>
                <span class="role-cell">
                  <span class="role-badge" [class]="user.role">
                    {{ user.role === 'admin' ? 'Administrador' : 'Participante' }}
                  </span>
                  @if (user.isPrincipalAdmin) {
                    <span class="principal-badge" title="Administrador Principal">👑</span>
                  }
                </span>
                
                @if (auth.isPrincipalAdmin()) {
                  <span class="action-cell">
                    @if (!user.isPrincipalAdmin) {
                      <button mat-stroked-button class="role-toggle-btn"
                              (click)="toggleRole(user)"
                              [color]="user.role === 'admin' ? 'warn' : 'primary'">
                        @if (user.role === 'admin') {
                          <mat-icon>arrow_downward</mat-icon> Quitar Admin
                        } @else {
                          <mat-icon>arrow_upward</mat-icon> Hacer Admin
                        }
                      </button>
                    }
                  </span>
                }
              </div>
            }
          </div>
        } @else {
          <p class="no-users">No hay usuarios registrados aún.</p>
        }
      </div>
    </div>
  `,
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users = signal<UserDisplay[]>([]);
  isCreating = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  newName = '';
  newEmail = '';
  newPassword = '';

  constructor(
    public readonly auth: AuthService,
    private readonly firebase: FirebaseService,
    private readonly snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    try {
      const docs = await this.firebase.getDocuments('users');
      const users: UserDisplay[] = docs.map((d) => ({
        uid: d['id'] as string,
        displayName: (d['displayName'] as string) ?? '',
        email: (d['email'] as string) ?? '',
        role: (d['role'] as UserRole) ?? UserRole.PARTICIPANT,
        isPrincipalAdmin: (d['isPrincipalAdmin'] as boolean) ?? false,
        createdAt: (d['createdAt'] as { toDate?: () => Date })?.toDate?.() ?? new Date(),
      }));
      this.users.set(users);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async createUser(): Promise<void> {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (!this.newName.trim() || !this.newEmail.trim() || !this.newPassword) {
      this.errorMessage.set('Completa todos los campos.');
      return;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage.set('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    this.isCreating.set(true);

    try {
      await this.auth.registerUser(
        this.newEmail.trim(),
        this.newPassword,
        this.newName.trim(),
        UserRole.PARTICIPANT,
      );

      this.successMessage.set(`¡Cuenta creada para ${this.newName}!`);
      this.newName = '';
      this.newEmail = '';
      this.newPassword = '';

      // Note: registerUser creates a new Firebase Auth user which
      // will sign out the current admin. Warn user to re-login.
      this.snackBar.open(
        'Cuenta creada. Debes volver a iniciar sesión.',
        'OK',
        { duration: 5000 },
      );

      await this.loadUsers();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al crear cuenta.';
      if (message.includes('email-already-in-use')) {
        this.errorMessage.set('Este correo ya está registrado.');
      } else {
        this.errorMessage.set(message);
      }
    } finally {
      this.isCreating.set(false);
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  async toggleRole(user: UserDisplay): Promise<void> {
    if (user.isPrincipalAdmin) return; // Fail-safe
    
    const newRole = user.role === UserRole.ADMIN ? UserRole.PARTICIPANT : UserRole.ADMIN;
    
    try {
      await this.auth.updateUserRole(user.uid, newRole);
      this.snackBar.open(
        `Rol actualizado: ${user.displayName} ahora es ${newRole === 'admin' ? 'Administrador' : 'Participante'}.`,
        'OK',
        { duration: 3000 }
      );
      await this.loadUsers();
    } catch (error) {
      console.error('Error toggling role:', error);
      this.snackBar.open('Error al cambiar el rol. Verifica tu conexión.', 'OK', { duration: 3000 });
    }
  }
}
