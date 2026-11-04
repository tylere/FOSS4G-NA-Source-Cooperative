// Plain object (no `import from 'vite'`) so it works under pnpm's strict layout,
// where vite is not a direct dependency.
export default {
  // Slidev 53's bundled CSS trips lightningcss minification; esbuild handles it.
  build: { cssMinify: 'esbuild' },
  // The Source brand addon lives in the private re-branding repo, outside this deck.
  server: { fs: { allow: ['.', new URL('../../radiantearth/re-branding/slidev', import.meta.url).pathname] } },
}
