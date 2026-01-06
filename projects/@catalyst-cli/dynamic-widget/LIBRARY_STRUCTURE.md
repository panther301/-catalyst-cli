# Library Structure

This document describes what gets published to npm vs what stays as demo code.

## Published to npm (Library Code)

Only the following files are included in the npm package:

```
projects/ngx-dynamic-widget/src/lib/widget/
├── widget.component.ts          ✅ Published
├── widget.component.html        ✅ Published
├── widget.component.scss         ✅ Published
├── widget.component.spec.ts     ✅ Published (for reference)
├── widget.service.ts            ✅ Published
├── widget.model.ts              ✅ Published
└── widget.module.ts             ✅ Published
```

These are exported through `projects/ngx-dynamic-widget/src/public-api.ts`.

## Excluded from npm (Demo Code)

The following files are NOT included in the npm package:

```
src/app/
├── app.component.*               ❌ Demo only
├── app.config.ts                ❌ Demo only
├── app.routes.ts                ❌ Demo only
└── widgets/                     ❌ Demo widgets only
    ├── chart-widget.component.ts
    ├── card-widget.component.ts
    └── stats-widget.component.ts

src/
├── index.html                   ❌ Demo only
├── main.ts                      ❌ Demo only
└── styles.scss                  ❌ Demo only
```

## What Users Get

When users install `ngx-dynamic-widget`, they get:

1. **WidgetComponent** - The main draggable/resizable widget component
2. **WidgetService** - Service for managing widgets
3. **Widget Models & Types** - All TypeScript interfaces, types, and enums
4. **NgxWidgetModule** - Module for easy integration

They can then create their own widget components and use the library to display them.

## Building the Library

When you run `npm run build:lib`, ng-packagr will:

1. Read `projects/ngx-dynamic-widget/src/public-api.ts` to determine what to export
2. Only bundle the files referenced in the public API
3. Exclude everything listed in `.npmignore`
4. Create distributable files in `dist/ngx-dynamic-widget/`

## Testing Locally

To test what will be published:

```bash
npm run build:lib
npm pack --dry-run
```

This shows exactly what files will be included in the package.

