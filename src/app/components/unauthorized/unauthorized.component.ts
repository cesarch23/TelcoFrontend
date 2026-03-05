import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <div class="unauthorized-container">
      <mat-card class="error-card">
        <mat-card-header>
          <mat-card-title>Acceso Denegado</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p class="error-message">No tiene permisos para acceder a esta página</p>
          <p class="error-code">Error 403 - Forbidden</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="goToDashboard()">
            Volver al Panel
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .error-card {
      max-width: 400px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    mat-card-title {
      font-size: 28px;
      margin-bottom: 20px;
      color: #c62828;
    }

    .error-message {
      font-size: 18px;
      color: #666;
      margin-bottom: 10px;
    }

    .error-code {
      font-size: 14px;
      color: #999;
      font-family: monospace;
      margin-bottom: 20px;
    }

    mat-card-actions {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
  `]
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
