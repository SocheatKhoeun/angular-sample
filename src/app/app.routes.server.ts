import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:id',
    renderMode: RenderMode.Server // <-- Change from Prerender to Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
