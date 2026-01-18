import { app, httpServer, log, initPromise } from "./app";

// CRITICAL: Wait for routes to be registered before exporting to Vercel
// Without this, Vercel gets an app with NO routes, causing infinite loading
(async () => {
  console.log("[INDEX] Waiting for app initialization...");
  await initPromise;
  console.log("[INDEX] App initialization complete, routes ready");

  const port = parseInt(process.env.PORT || "5000", 10);

  // Only start listening if we are NOT in a Vercel environment
  // Vercel sets 'VERCEL' env var.
  if (process.env.VERCEL !== "1") {
    httpServer.listen(
      {
        port,
        host: "0.0.0.0",
      },
      () => {
        log(`serving on port ${port} (health checks ready)`);
      },
    );
  }
})();

// Export app for Vercel (serverless)
// This export happens synchronously, but the app's routes are registered
// asynchronously via initPromise. Vercel will wait for the module to load
// before invoking the handler, so by the time requests come in, routes are ready.
export default app;
