# SPGreen Analytics Dashboard

Analytics dashboard built with React + Vite for visualizing sustainability and operations data.

## Tech Stack

- React 18
- React Router v6
- Recharts
- Tailwind CSS
- Lucide Icons

## Architecture Decisions

### 1) Layered Structure

- `services/` holds API simulation and static datasets.
- `utils/dataTransformer.js` is used for all data shaping logic.
- `hooks/` contains reusable async/data hooks.
- `components/` contains reusable UI pieces and chart wrappers.
- `pages/` and `components/pages/` compose feature screens.

This keeps API/data transformation concerns out of presentational chart components.

### 2) Reusable Chart System

- `ChartContainer` wraps all charts with loading/error/empty handling.
- Line, Bar, Pie, and Area chart components consume props (`data`) so chart rendering is reusable and stateless.

### 3) Global State Strategy

- `FilterContext` provides shared filters (`search`, `category`, `dateRange`, `timeGranularity`) to avoid deep prop drilling.

## Core Features

- Responsive app shell (header, collapsible sidebar, content area)
- Route-based navigation
- Overview page with 4 KPI cards
- Chart coverage: line, bar, pie (+ area)
- Global filters:
	- Date range picker (popover with presets)
	- Category dropdown
	- Debounced search
- Error boundary with fallback and retry UI

## Data Layer

- Mock API in `services/mockApi.js`
- Simulated API delay: random between 1s and 2s
- Simulated random failures: 20% probability
- Data transformation separated into utility functions (`dataTransformer.js`)

## Performance Optimizations

- `useMemo` for derived/filter/chart data
- `useCallback` for stable retry handlers
- `React.memo` on reusable presentational components (`KpiCard`, `ActionCard`)
- Route-level lazy loading with `React.lazy` + `Suspense` in router

## Error Handling

- Global error boundary in app root
- Graceful fallback UI (`ErrorBoundaryFallback`)
- Retry mechanism for failed API calls via `useApiData().refetch`

## Run Locally

```bash
npm install
npm run dev
```

## Known Limitations

- Mock data is static and not persisted.
- Report downloads are simulated.
- Date granularity (`Daily/Weekly/Monthly`) is stored globally but not yet used for aggregation bucketing.
- Some pages still use simplified static KPI numbers for demonstration.

## Repository

https://github.com/your-username/SPGreen_Analytics
