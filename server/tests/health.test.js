import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';


describe('GET /api/health/db', () => {
  it('should return 200 when the database is connected', async () => {
    // Send a request to the existing endpoint
    const response = await request(app)
      .get('/api/health/db');

    // Verify the HTTP response
    expect(response.status).toBe(200);

    // Verify the response structure
    expect(response.body).toMatchObject({
      status: 'ok',
      database: 'connected',
    });

    // Verify that the database returned a timestamp
    expect(response.body.time).toBeDefined();

    // Verify that the timestamp is valid
    expect(Number.isNaN(Date.parse(response.body.time))).toBe(false);
  });
});