import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('catalyst-cli');
  activeRoute = signal<string>('');

  constructor(private router: Router) {
    // Track current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute.set(event.urlAfterRedirects);
      });

    // Set initial route
    this.activeRoute.set(this.router.url);
  }

  /**
   * Navigate to a route
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Check if route is active
   */
  isActive(route: string): boolean {
    return this.activeRoute() === `/${route}` || this.activeRoute() === route;
  }
}
