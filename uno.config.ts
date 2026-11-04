// Slidev's navigation, presenter and overview icons are blank in this pnpm install for two reasons:
// - the icon classes in @slidev/client's components aren't picked up when scanning, and
// - the built-in icon preset fails to load the collections ("failed to load icon carbon:maximize").
// So: hand an icon preset the collections directly, and safelist the icon classes Slidev's UI uses
// (collected from @slidev/client 53.0.0). Slidev merges this config with its own.
import { defineConfig, presetIcons } from 'unocss'

const slidevIcons = [
  'i-carbon-camera', 'i-carbon-magic-wand', 'i-carbon-magic-wand-filled', 'i-carbon-moon', 'i-carbon-sun',
  'i-carbon:account', 'i-carbon:align-box-bottom-right', 'i-carbon:apps', 'i-carbon:arrow-down',
  'i-carbon:arrow-left', 'i-carbon:arrow-right', 'i-carbon:arrow-up', 'i-carbon:arrow-up-right',
  'i-carbon:catalog', 'i-carbon:checkbox', 'i-carbon:checkmark', 'i-carbon:chevron-up', 'i-carbon:close',
  'i-carbon:close-outline', 'i-carbon:cursor-1', 'i-carbon:document-pdf', 'i-carbon:download',
  'i-carbon:drop-photo', 'i-carbon:edit', 'i-carbon:erase', 'i-carbon:error', 'i-carbon:help',
  'i-carbon:information', 'i-carbon:launch', 'i-carbon:list-boxes', 'i-carbon:logo-twitter',
  'i-carbon:maximize', 'i-carbon:minimize', 'i-carbon:open-panel-bottom', 'i-carbon:open-panel-right',
  'i-carbon:pause', 'i-carbon:pen', 'i-carbon:pin', 'i-carbon:pin-filled', 'i-carbon:play',
  'i-carbon:presentation-file', 'i-carbon:previous-outline', 'i-carbon:radio-button', 'i-carbon:redo',
  'i-carbon:renew', 'i-carbon:settings-adjust', 'i-carbon:stop-outline', 'i-carbon:template',
  'i-carbon:text-annotation-toggle', 'i-carbon:time', 'i-carbon:timer', 'i-carbon:trash-can',
  'i-carbon:undo', 'i-carbon:user-avatar', 'i-carbon:user-speaker', 'i-carbon:video',
  'i-carbon:warning-alt', 'i-carbon:zoom-in', 'i-carbon:zoom-out',
  'i-ph-cursor-duotone', 'i-ph-cursor-fill', 'i-ph:arrow-down-bold', 'i-ph:arrow-up-bold',
  'i-svg-spinners-90-ring-with-bg',
]

export default defineConfig({
  safelist: slidevIcons,
  presets: [
    // UnoCSS keeps one preset per name and Slidev's (failing) icon preset comes first, so rename this one.
    {
      ...presetIcons({
        collections: {
          'carbon': () => import('@iconify-json/carbon/icons.json').then(i => i.default),
          'ph': () => import('@iconify-json/ph/icons.json').then(i => i.default),
          'svg-spinners': () => import('@iconify-json/svg-spinners/icons.json').then(i => i.default),
        },
      }),
      name: 'deck-icons',
    },
  ],
})
