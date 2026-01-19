# Publishing Guide

This guide will help you publish `ngx-dynamic-widget` to npm.

## Prerequisites

1. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **Login to npm**: Run `npm login` in your terminal
3. **Verify login**: Run `npm whoami` to confirm you're logged in

## Pre-Publishing Checklist

- [ ] Update version in `package.json`
- [ ] Update `README.md` with any new features
- [ ] Add repository URL in `package.json`
- [ ] Add author information in `package.json`
- [ ] Test the build locally
- [ ] Ensure all tests pass

## Build the Library

```bash
# Install dependencies (including ng-packagr)
npm install

# Build the library
npm run build:lib
```

This will create the distributable files in `dist/@catalyst-cli/dynamic-widget/`.

## Test the Build Locally

Before publishing, test the build locally:

```bash
# In the library directory
npm pack

# This creates a .tgz file. You can test it in another project:
# cd ../test-project
# npm install ../ngx-dynamic-widget/ngx-dynamic-widget-1.0.0.tgz
```

## Publishing Steps

### 1. Update Version

Update the version in `package.json` following [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.1): Bug fixes
- **Minor** (1.1.0): New features (backward compatible)
- **Major** (2.0.0): Breaking changes

### 2. Build the Library

```bash
npm run build:lib
```

### 3. Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

### 4. Publish to npm

#### First Time Publishing

```bash
npm publish --access public
```

#### Subsequent Updates

```bash
npm publish
```

### 5. Verify Publication

Check your package on npm:

```
https://www.npmjs.com/package/@nexus-ui/dynamic-widget
```

## Publishing Scoped Packages (Optional)

If you want to publish under a scope (e.g., `@your-org/ngx-dynamic-widget`):

1. Update `package.json` name: `"name": "@your-org/ngx-dynamic-widget"`
2. Publish with: `npm publish --access public`

## Updating the Package

1. Make your changes
2. Update version in `package.json`
3. Update `CHANGELOG.md` (if you have one)
4. Build: `npm run build:lib`
5. Publish: `npm publish`

## Troubleshooting

### Error: "You do not have permission to publish"

- Make sure you're logged in: `npm whoami`
- Check if the package name is already taken
- If using a scope, ensure you have the right permissions

### Error: "Package name already exists"

- Choose a different package name
- Or use a scoped package name

### Build Errors

- Ensure all dependencies are installed: `npm install`
- Check TypeScript errors: `npx tsc --noEmit`
- Verify `ng-package.json` configuration

## Post-Publishing

1. Create a Git tag for the version:

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. Update your repository's README with installation instructions

3. Announce the release (if applicable)

## Notes

- The `prepublishOnly` script automatically builds the library before publishing
- Never commit `node_modules/` or `dist/` folders
- Always test the build locally before publishing
