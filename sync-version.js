/**
 * This script syncs the version field in package.json with manifest.json.
 * package.json is the source of truth for the version number.
 * Run this script before publishing to ensure both files have the same version.
 */

const fs = require('fs');
const path = require('path');

// Read package.json
const packagePath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const version = packageJson.version;

// Read manifest.json
const manifestPath = path.join(__dirname, 'manifest.json');
const manifestJson = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Update version if different
if (manifestJson.version !== version) {
  manifestJson.version = version;
  fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 4) + '\n');
  console.log(`✅ Updated manifest.json version to ${version}`);
} else {
  console.log(`✓ Version ${version} already in sync`);
}
