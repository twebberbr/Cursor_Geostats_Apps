# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This repository contains **Cursor_Geostats_Apps** — a collection of standalone, client-side geostatistics educational web applications. Each `.html` file is a fully self-contained single-page application (inline CSS + JavaScript, no external dependencies).

### Applications

| File | App Name | Description |
|---|---|---|
| `Estimation.html` | Super Krige - Laboratory | Kriging estimation (OK, SK), IDW, NN |
| `Variography.html` | VarioLab | Interactive variographic analysis |
| `Simulation.html` | SGS Simulation - Laboratory | Sequential Gaussian Simulation |
| `Declustering.html` | Declustering Laboratory v2 | Cell, Polygonal, Kriging, IDW declustering |
| `Lagrange.html` | Multiplicadores de Lagrange | Lagrange multipliers educational tool |

### Running the applications

There is no build system, package manager, or backend. Serve the files with any static HTTP server:

```bash
python3 -m http.server 8000
```

Then open any app at `http://localhost:8000/<filename>.html`.

### Important notes

- No linting, testing framework, or build pipeline exists. Validation is manual via the browser.
- CSV data files (`Walker_Lake_Predictive.csv`, `Walker_Lake_Exhaustive.csv`) are used by the Variography and Declustering apps for data import.
- `Lagrange.html` is the only file that loads an external resource (Google Fonts). All others work fully offline.
- Each HTML file is 2000–3800+ lines with inline `<style>` and `<script>` blocks.
