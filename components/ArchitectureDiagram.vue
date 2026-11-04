<!--
  Source Cooperative architecture.
  Clients → services (source.coop, data.source.coop) → storage (DynamoDB, object storage).
  Adapted from Anthony Lukach's CNG 2026 deck, recoloured to the Source Ink/Bone palette.
-->
<template>
  <div class="arch-wrap">
<svg style="font-family:'Berkeley Mono', Menlo, monospace" :class="['arch', { 'bottom-only': bottomOnly }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 400" role="img" aria-label="Source Cooperative architecture">
  <defs>
    <marker :id="arrowId" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#EFEBEA" fill-opacity=".6"/>
    </marker>
  </defs>

  <!-- column labels -->
  <g class="top" style="font-size:11px;letter-spacing:1px" fill="#EFEBEA" fill-opacity=".6">
    <text style="text-anchor:middle" x="90" y="26">CLIENTS</text>
    <text style="text-anchor:middle" x="400" y="26">SERVICES</text>
    <text style="text-anchor:middle" x="790" y="26">STORAGE</text>
  </g>

  <!-- clients -->
  <g style="font-size:14px" fill="#EFEBEA">
    <g class="top">
      <rect :class="{ hl: highlight === 'top' }" x="20" y="78" width="140" height="64" rx="4" fill="#1A2425" stroke="#EFEBEA" stroke-opacity=".14"/>
      <text style="text-anchor:middle" x="90" y="106">Browser</text>
      <text style="font-size:11px;text-anchor:middle" x="90" y="125" fill-opacity=".6">people</text>
    </g>

    <rect :class="{ hl: highlight === 'bottom' }" x="6" y="298" width="168" height="64" rx="4" fill="#1A2425" stroke="#EFEBEA" stroke-opacity=".14"/>
    <text style="text-anchor:middle" x="90" y="326">Tools</text>
    <text style="font-size:11px;text-anchor:middle" x="90" y="345" fill-opacity=".6">GDAL · DuckDB · AWS CLI</text>
  </g>

  <!-- source.coop -->
  <g class="top">
    <rect :class="{ hl: highlight === 'top' }" x="270" y="60" width="260" height="100" rx="4" fill="#243031" stroke="#EFEBEA" stroke-opacity=".5"/>
    <text style="font-size:20px;font-weight:700;text-anchor:middle" x="400" y="92" fill="#EFEBEA">source.coop</text>
    <text style="font-size:12px;text-anchor:middle" x="400" y="116" fill="#EFEBEA">UI + metadata API</text>
    <text style="font-size:11px;text-anchor:middle" x="400" y="140" fill="#EFEBEA" fill-opacity=".6">TypeScript &amp; Next.js</text>
  </g>

  <!-- data.source.coop -->
  <rect :class="{ hl: highlight === 'bottom' }" x="270" y="280" width="260" height="100" rx="4" fill="#243031" stroke="#EFEBEA" stroke-opacity=".5"/>
  <text style="font-size:20px;font-weight:700;text-anchor:middle" x="400" y="312" fill="#EFEBEA">data.source.coop</text>
  <text style="font-size:12px;text-anchor:middle" x="400" y="336" fill="#EFEBEA">S3-compatible data proxy</text>
  <text style="font-size:11px;text-anchor:middle" x="400" y="360" fill="#EFEBEA" fill-opacity=".6">Rust &amp; multistore on Cloudflare</text>

  <!-- DynamoDB -->
  <g class="top">
    <rect :class="{ hl: highlight === 'top' }" x="660" y="60" width="260" height="100" rx="4" fill="#1A2425" stroke="#EFEBEA" stroke-opacity=".14"/>
    <g transform="translate(684,84)" stroke="#EFEBEA" stroke-opacity=".6" fill="none" stroke-width="1.5">
      <ellipse cx="22" cy="7" rx="22" ry="7"/>
      <path d="M0,7 v38 a22,7 0 0 0 44,0 v-38"/>
      <path d="M0,20 a22,7 0 0 0 44,0" opacity=".6"/>
      <path d="M0,33 a22,7 0 0 0 44,0" opacity=".6"/>
    </g>
    <text style="font-size:18px;font-weight:700" x="748" y="104" fill="#EFEBEA">DynamoDB</text>
    <text style="font-size:12px" x="748" y="126" fill="#EFEBEA" fill-opacity=".6">metadata tables</text>
  </g>

  <!-- object storage backends: stacked cards -->
  <g>
    <rect x="676" y="262" width="244" height="44" rx="4" fill="#1A2425" stroke="#EFEBEA" stroke-opacity=".08"/>
    <rect x="668" y="272" width="252" height="44" rx="4" fill="#1A2425" stroke="#EFEBEA" stroke-opacity=".1"/>
    <rect :class="{ hl: highlight === 'bottom' }" x="660" y="282" width="260" height="98" rx="4" fill="#1A2425" stroke="#EFEBEA" stroke-opacity=".14"/>
    <text style="font-size:16px;font-weight:700;text-anchor:middle" x="790" y="312" fill="#EFEBEA">Object storage</text>
    <g style="font-size:12px" fill="#EFEBEA">
      <rect x="676" y="328" width="72" height="30" rx="3" fill="#243031"/>
      <text style="text-anchor:middle" x="712" y="347">AWS S3</text>
      <rect x="754" y="328" width="82" height="30" rx="3" fill="#243031"/>
      <text style="text-anchor:middle" x="795" y="347">Azure</text>
      <rect x="842" y="328" width="62" height="30" rx="3" fill="#243031"/>
      <text style="text-anchor:middle" x="873" y="347">…</text>
    </g>
  </g>

  <!-- arrows: two-way, except the proxy's one-way metadata lookup -->
  <g stroke="#EFEBEA" stroke-opacity=".6" stroke-width="1.6" fill="none" :marker-start="arrowUrl" :marker-end="arrowUrl">
    <path class="top" d="M164,110 H266"/>
    <path d="M178,330 H266"/>
    <path class="top" d="M534,110 H656"/>
    <path d="M534,330 H656"/>
    <path d="M350,280 V164" stroke-dasharray="5 4" marker-start="none"/>
    <path d="M450,164 V276"/>
  </g>

  <!-- edge labels -->
  <g style="font-size:11px;text-anchor:middle" fill="#EFEBEA" fill-opacity=".6">
    <text class="top" x="213" y="102">HTTPS</text>
    <text x="213" y="322">S3 API</text>
    <text class="top" x="593" y="102">reads</text>
    <text x="593" y="322">reads / writes</text>
  </g>
  <g style="font-size:11px;text-anchor:end" fill="#EFEBEA" fill-opacity=".6">
    <text x="338" y="216">reads API:</text>
    <text x="338" y="231">product metadata</text>
  </g>
  <g style="font-size:11px" fill="#EFEBEA" fill-opacity=".6">
    <text x="462" y="216">reads/writes S3:</text>
    <text x="462" y="231">objects</text>
  </g>
</svg>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

// highlight: which row of boxes to outline: 'top' (source.coop path), 'bottom' (data.source.coop path), or none.
// bottomOnly: hide everything but the Tools → data.source.coop → object storage row (and its links up to
// source.coop), keeping its position.
defineProps<{ highlight?: 'top' | 'bottom', bottomOnly?: boolean }>()

// Unique per instance: two diagrams on neighbouring slides must not share a marker id.
const arrowId = `arch-arr-${useId()}`
const arrowUrl = `url(#${arrowId})`
</script>

<style scoped>
.arch-wrap { width: 100%; display: flex; justify-content: center; }
.arch { width: 100%; height: auto; max-height: 400px; }
.arch rect { transition: stroke-opacity .3s, stroke-width .3s; }
.arch rect.hl { stroke-opacity: 1; stroke-width: 3; }
.arch.bottom-only .top { visibility: hidden; }
</style>
