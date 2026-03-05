import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, DecodedToken } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: DecodedToken | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getRoleDescription(): string {
    const roleDescriptions: { [key: string]: string } = {
      'ADMIN': 'Administrador',
      'AGENTE': 'Agente',
      'BACKOFFICE': 'Back Office',
      'SUPERVISOR': 'Supervisor'
    };

    const role = this.currentUser?.role || '';
    return roleDescriptions[role] || role;
  }
}
