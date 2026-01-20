import { Component, signal, inject } from '@angular/core';
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
  // Sidebar open by default on desktop, closed on mobile
  sidebarOpen = signal<boolean>(this.isDesktop());
  // Sidebar minimized state (icon-only mode for desktop)
  sidebarMinimized = signal<boolean>(false);

  constructor(private router: Router) {
    // Track current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute.set(event.urlAfterRedirects);
        // Close sidebar on mobile when navigating
        this.closeSidebarOnMobile();
      });

    // Set initial route
    this.activeRoute.set(this.router.url);
  }

  /**
   * Check if device is desktop (>= 768px)
   */
  private isDesktop(): boolean {
    return typeof window !== 'undefined' && window.innerWidth >= 768;
  }

  /**
   * Toggle sidebar between states
   * On desktop: toggles between minimized and full (always visible)
   * On mobile: toggles between closed and full
   */
  toggleSidebar(): void {
    if (this.isDesktop()) {
      // Desktop: always open, just toggle minimized state
      this.sidebarOpen.set(true);
      this.sidebarMinimized.update((value) => !value);
    } else {
      // Mobile: toggle open/closed
      this.sidebarOpen.update((value) => !value);
      this.sidebarMinimized.set(false);
    }
  }

  /**
   * Close sidebar
   */
  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  /**
   * Close sidebar on mobile devices
   */
  private closeSidebarOnMobile(): void {
    if (window.innerWidth < 768) {
      this.closeSidebar();
    }
  }

  /**
   * Navigate to a route
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
    // Close sidebar on mobile after navigation
    this.closeSidebarOnMobile();
  }

  /**
   * Check if route is active
   */
  isActive(route: string): boolean {
    return this.activeRoute() === `/${route}` || this.activeRoute() === route;
  }
}
