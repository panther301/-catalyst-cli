import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CatalystIconRegistryService {
  private readonly http = inject(HttpClient, { optional: true });
  private registry = new Map<string, { type: 'svg' | 'url'; content: string }>();
  private cachedRequests = new Map<string, Observable<string>>();

  public registerIcon(name: string, content: string, type: 'svg' | 'url' = 'svg'): void {
    if (!this.registry.has(name)) {
      this.registry.set(name, { type, content });
    } else {
      console.warn(`Icon ${name} is already registered.`);
    }
  }

  public registerIcons(icons: { name: string; svg?: string; url?: string }[]): void {
    icons.forEach((icon) => {
      if (icon.url) {
        this.registerIcon(icon.name, icon.url, 'url');
      } else if (icon.svg) {
        this.registerIcon(icon.name, icon.svg, 'svg');
      } else {
        console.warn(`Icon ${icon.name} must have either an 'svg' or 'url' property.`);
      }
    });
  }

  public getIcon(name: string): Observable<string | undefined> {
    const iconData = this.registry.get(name);

    if (!iconData) {
      console.warn(`Icon ${name} not found in the registry.`);
      return of(undefined);
    }

    if (iconData.type === 'svg') {
      return of(iconData.content);
    }

    if (iconData.type === 'url') {
      const url = iconData.content;

      if (!this.cachedRequests.has(url)) {
        if (!this.http) {
          console.error(
            'HttpClient is required to fetch icon URLs. Please provide it in your app config.',
          );
          return of(undefined);
        }

        const req = this.http.get(url, { responseType: 'text' }).pipe(
          catchError((err) => {
            console.error(`Failed to fetch icon from URL: ${url}`, err);
            return of('');
          }),
          shareReplay(1),
        );
        this.cachedRequests.set(url, req);
      }
      return this.cachedRequests.get(url)!;
    }

    return of(undefined);
  }
}
