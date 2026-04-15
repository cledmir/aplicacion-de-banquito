import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { participantGuard } from './guards/participant.guard';

export const routes: Routes = [
  // --- Auth ---
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'setup',
        loadComponent: () =>
          import('./features/auth/setup/setup.component').then((m) => m.SetupComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // --- Admin ---
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'funds',
        loadComponent: () =>
          import('./features/admin/funds/fund-list/fund-list.component').then(
            (m) => m.FundListComponent,
          ),
      },
      {
        path: 'funds/create',
        loadComponent: () =>
          import('./features/admin/funds/fund-create/fund-create.component').then(
            (m) => m.FundCreateComponent,
          ),
      },
      {
        path: 'funds/:fundId',
        loadComponent: () =>
          import('./features/admin/funds/fund-detail/fund-detail.component').then(
            (m) => m.FundDetailComponent,
          ),
      },
      {
        path: 'funds/:fundId/participants',
        loadComponent: () =>
          import(
            './features/admin/participants/participant-list/participant-list.component'
          ).then((m) => m.ParticipantListComponent),
      },
      {
        path: 'funds/:fundId/loans',
        loadComponent: () =>
          import('./features/admin/loans/loan-list/loan-list.component').then(
            (m) => m.LoanListComponent,
          ),
      },
      {
        path: 'funds/:fundId/loans/create',
        loadComponent: () =>
          import('./features/admin/loans/loan-create/loan-create.component').then(
            (m) => m.LoanCreateComponent,
          ),
      },
      {
        path: 'funds/:fundId/payments',
        loadComponent: () =>
          import(
            './features/admin/payments/monthly-collection/monthly-collection.component'
          ).then((m) => m.MonthlyCollectionComponent),
      },
      {
        path: 'funds/:fundId/lottery',
        loadComponent: () =>
          import('./features/admin/lottery/lottery.component').then(
            (m) => m.LotteryComponent,
          ),
      },
      {
        path: 'funds/:fundId/report',
        loadComponent: () =>
          import(
            './features/admin/reports/period-report/period-report.component'
          ).then((m) => m.PeriodReportComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/users/user-management/user-management.component').then(
            (m) => m.UserManagementComponent,
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // --- Participant ---
  {
    path: 'participant',
    canActivate: [participantGuard],
    loadComponent: () =>
      import('./layouts/participant-layout/participant-layout.component').then(
        (m) => m.ParticipantLayoutComponent,
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/participant/my-dashboard/my-dashboard.component'
          ).then((m) => m.MyDashboardComponent),
      },
      {
        path: 'loans',
        loadComponent: () =>
          import('./features/participant/my-loans/my-loans.component').then(
            (m) => m.MyLoansComponent,
          ),
      },
      {
        path: 'payments',
        loadComponent: () =>
          import(
            './features/participant/my-payments/my-payments.component'
          ).then((m) => m.MyPaymentsComponent),
      },
      {
        path: 'simulator',
        loadComponent: () =>
          import(
            './features/participant/loan-simulator/loan-simulator.component'
          ).then((m) => m.LoanSimulatorComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // --- Redirects ---
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/auth/auto-redirect/auto-redirect.component').then(
        (m) => m.AutoRedirectComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/auth/auto-redirect/auto-redirect.component').then(
        (m) => m.AutoRedirectComponent,
      ),
  },
];
