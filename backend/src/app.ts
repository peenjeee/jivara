import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow frontend origin
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: `
    html.lenis { height: auto; }
    .lenis.lenis-smooth { scroll-behavior: auto !important; }
    .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
    .lenis.lenis-stopped { overflow: hidden; }
    .lenis.lenis-scrolling iframe { pointer-events: none; }

    .swagger-ui .topbar { display: none }
    /* Premium Scrollbar styling */
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 5px; border: 2px solid #0f172a; }
    ::-webkit-scrollbar-thumb:hover { background: #10b981; }
  `,
  customJs: '/swagger-custom.js',
  customSiteTitle: "Jivara API Documentation"
}));

app.use('/api/auth', authRoutes);

// Custom JS for Swagger Smooth Scroll (Lenis)
app.get('/swagger-custom.js', (req: Request, res: Response) => {
  res.type('application/javascript');
  res.send(`
    console.log("Jivara Swagger: Loading Smooth Scroll...");
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/lenis@1.1.18/dist/lenis.min.js';
    script.onload = () => {
      console.log("Jivara Swagger: Lenis Library Loaded.");
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      
      // Auto-resize lenis on dynamic swagger content changes
      const observer = new MutationObserver(() => {
        lenis.resize();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      window.lenis = lenis;
      console.log("Jivara Swagger: Smooth Scroll Active!");
    };
    document.head.appendChild(script);
  `);
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Running', message: 'Jivara Backend is running' });
});

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Jivara API',
    version: '1.0.0',
    framework: 'Express.js',
    status: 'Running',
    docs: '/api-docs'
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 'error', message: 'Endpoint not found' });
});

// Global Error Handler
app.use((err: { status?: number; message?: string }, req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
