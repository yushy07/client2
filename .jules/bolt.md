# Bolt's Journal

## 2025-05-21 - Cache static file indexing in Express proxy middleware
**Learning:** Performing synchronous filesystem directory traversals (`fs.readdirSync`, `fs.statSync`) on every HTTP request handler creates major disk I/O bottlenecks and increases latency per request by ~15-20ms.
**Action:** Cache file index results in a module-level variable on initial traversal to turn dynamic request scanning into an in-memory operation.

## 2025-05-20 - Prevent re-renders in continuous timer-based components
**Learning:** In pages with multiple global timers (e.g. hero banner ticks every 5s, room shade loop, texture group rotation every 10s), child UI components without `React.memo` re-render on every parent state update even when their own props remain unchanged.
**Action:** Wrap leaf UI components and interactive widgets like `CircularGallery` in `React.memo` to skip re-renders during high-frequency parent state cycles.

## 2025-08-20 - Cache synchronous directory traversal in dev server middleware
**Learning:** Performing synchronous recursive file system scans (`fs.readdirSync`, `fs.statSync`) on every dev server request for asset resolution introduces ~6ms+ latency per request.
**Action:** In-memory cache the directory index and hook into Vite server watcher events (`add`, `change`, `unlink`) to invalidate the cache only on file system mutations, yielding an ~850x speedup (~0.007ms vs ~6ms per request).
