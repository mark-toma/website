import { execSync } from 'child_process';

export default function() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    const hash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
    const tag = execSync('git describe --tags --exact-match 2>/dev/null || echo "no-tag"', { shell: true, encoding: 'utf-8' }).trim();
    const isDirty = execSync('git status --porcelain', { encoding: 'utf-8' }).trim() !== '';
    
    return {
      branch,
      hash,
      tag: tag === 'no-tag' ? null : tag,
      isDirty,
      version: `${branch}@${hash}${isDirty ? '-dirty' : ''}`
    };
  } catch (error) {
    // Fallback if not in a git repository
    console.warn('Failed to get git information:', error.message);
    return {
      branch: 'unknown',
      hash: 'unknown',
      tag: null,
      isDirty: false,
      version: 'unknown'
    };
  }
}
