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
            <mat-label>Correo electrónico (opcional)</mat-label>
            <input matInput type="email" [(ngModel)]="newEmail" name="email" id="user-email" />
            <mat-icon matPrefix>email</mat-icon>
            <mat-hint>Déjalo vacío para agregarlo después</mat-hint>
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
            <div class="user-row header">
              <span>Nombre</span>
              <span>Email</span>
              <span>Rol</span>
              <span>Acciones</span>
            </div>
            @for (user of users(); track user.uid) {
              @if (editingUid === user.uid) {
                <!-- Modo Edición -->
                <div class="user-row editing">
                  <span class="edit-field">
                    <input class="inline-input" [(ngModel)]="editName"
                           placeholder="Nombre" />
                  </span>
                  <span class="edit-field">
                    <input class="inline-input" [(ngModel)]="editEmail"
                           placeholder="Correo (opcional)" />
                  </span>
                  <span class="role-cell">
                    <span class="role-badge" [class]="user.role">
                      {{ user.role === 'admin' ? 'Admin' : 'Participante' }}
                    </span>
                  </span>
                  <span class="action-cell">
                    <button mat-icon-button color="primary" (click)="saveEdit(user)"
                            title="Guardar">
                      <mat-icon>check</mat-icon>
                    </button>
                    <button mat-icon-button (click)="cancelEdit()" title="Cancelar">
                      <mat-icon>close</mat-icon>
                    </button>
                  </span>
                </div>
              } @else {
                <!-- Modo Vista -->
                <div class="user-row">
                  <span class="user-name-cell">
                    <span class="user-avatar-small">{{ getInitials(user.displayName) }}</span>
                    {{ user.displayName }}
                  </span>
                  <span class="user-email">
                    @if (isPlaceholder(user.email)) {
                      <span class="no-email">(Sin correo)</span>
                    } @else {
                      {{ user.email }}
                    }
                  </span>
                  <span class="role-cell">
                    <span class="role-badge" [class]="user.role">
                      {{ user.role === 'admin' ? 'Administrador' : 'Participante' }}
                    </span>
                    @if (user.isPrincipalAdmin) {
                      <span class="principal-badge" title="Administrador Principal">👑</span>
                    }
                  </span>
                  <span class="action-cell">
                    @if (!user.isPrincipalAdmin) {
                      <button mat-icon-button (click)="startEdit(user)" title="Editar"
                              class="action-icon-btn">
                        <mat-icon>edit</mat-icon>
                      </button>
                      @if (auth.isPrincipalAdmin()) {
                        <button mat-icon-button (click)="toggleRole(user)"
                                [title]="user.role === 'admin' ? 'Quitar Admin' : 'Hacer Admin'"
                                class="action-icon-btn" [class.warn]="user.role === 'admin'">
                          <mat-icon>{{ user.role === 'admin' ? 'arrow_downward' : 'arrow_upward' }}</mat-icon>
                        </button>
                      }
                        <button mat-icon-button (click)="confirmDeleteUser(user)"
                                title="Eliminar usuario"
                                class="action-icon-btn delete-btn">
                          <mat-icon>delete</mat-icon>
                        </button>
                      }
                      
                      @if (!isPlaceholder(user.email)) {
                        <button mat-icon-button (click)="resetUserPassword(user)"
                                title="Enviar correo para resetear contraseña"
                                class="action-icon-btn reset-btn">
                          <mat-icon>email</mat-icon>
                        </button>
                      }
                    }
                  </span>
                </div>
              }
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

  // Edit state
  editingUid: string | null = null;
  editName = '';
  editEmail = '';

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

    if (!this.newName.trim()) {
      this.errorMessage.set('El nombre es obligatorio.');
      return;
    }

    if (!this.newPassword || this.newPassword.length < 6) {
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

  // ===== Edición Inline =====

  startEdit(user: UserDisplay): void {
    this.editingUid = user.uid;
    this.editName = user.displayName;
    this.editEmail = this.isPlaceholder(user.email) ? '' : user.email;
  }

  cancelEdit(): void {
    this.editingUid = null;
    this.editName = '';
    this.editEmail = '';
  }

  async saveEdit(user: UserDisplay): Promise<void> {
    if (!this.editName.trim()) {
      this.snackBar.open('El nombre no puede estar vacío.', 'OK', { duration: 3000 });
      return;
    }

    try {
      const updateData: { displayName?: string; email?: string } = {};

      if (this.editName.trim() !== user.displayName) {
        updateData.displayName = this.editName.trim();
      }

      // Si el usuario puso un correo nuevo (o cambió el existente)
      const newEmail = this.editEmail.trim();
      if (newEmail && newEmail !== user.email) {
        updateData.email = newEmail;
      }

      if (Object.keys(updateData).length > 0) {
        await this.auth.updateUserProfile(user.uid, updateData);
        this.snackBar.open('Datos actualizados correctamente.', 'OK', { duration: 3000 });
        await this.loadUsers();
      }

      this.cancelEdit();
    } catch (error) {
      console.error('Error updating user:', error);
      this.snackBar.open('Error al guardar los cambios.', 'OK', { duration: 3000 });
    }
  }

  // ===== Helpers =====

  isPlaceholder(email: string): boolean {
    return AuthService.isPlaceholderEmail(email);
  }

  getInitials(name: string): string {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  async toggleRole(user: UserDisplay): Promise<void> {
    if (user.isPrincipalAdmin) return;

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

  async confirmDeleteUser(user: UserDisplay): Promise<void> {
    const confirmed = window.confirm(
      `¿Eliminar al usuario "${user.displayName}"?\n\nSe borrará su cuenta de la aplicación. Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      await this.firebase.deleteDocument('users', user.uid);
      this.snackBar.open(`Usuario "${user.displayName}" eliminado.`, 'OK', { duration: 3000 });
      await this.loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      this.snackBar.open('Error al eliminar el usuario.', 'OK', { duration: 3000 });
    }
  }

  async resetUserPassword(user: UserDisplay): Promise<void> {
    const confirmed = window.confirm(
      `¿Enviar un correo de restablecimiento de contraseña a "${user.email}"?`
    );
    if (!confirmed) return;

    try {
      await this.auth.resetUserPassword(user.email);
      this.snackBar.open(`Correo de restablecimiento enviado a ${user.email}.`, 'OK', { duration: 4000 });
    } catch (error) {
      console.error('Error enviando reset:', error);
      this.snackBar.open('Error al enviar el correo. Inténtalo de nuevo.', 'OK', { duration: 4000 });
    }
  }
}
