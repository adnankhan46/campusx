import request from 'supertest';
import { app } from '../../../api/index.js';
import { describe, expect, it } from 'vitest';
import User from '../../modules/auth/user.model.js';

describe('POST /api/auth/signup', () => {
  const validUserData = {
    admissionNumber: '2024',
    email: 'test@example.com',
    password: 'Test@123456',
    section: 'A',
    gender: 'Male',
  };


  describe('Success Cases', () => {
    it('should register a new user with valid data', async () => {
      const res = await request(app).post('/api/auth/signup').send(validUserData);

      expect(res.status).toBe(201);

      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('message', 'Account created successfully');

      const userData = res.body.data;
      expect(userData).toHaveProperty('email', validUserData.email);
      expect(userData).toHaveProperty('admissionNumber', validUserData.admissionNumber);
      expect(userData).toHaveProperty('section', validUserData.section);
      expect(userData).toHaveProperty('gender', validUserData.gender);
      expect(userData).toHaveProperty('year', '2024');
      expect(userData).toHaveProperty('username', `${validUserData.email}${validUserData.admissionNumber}`);

      expect(userData).not.toHaveProperty('password'); // no passord will be there

      // Check JWT cookie
      expect(res.headers['set-cookie']).toBeDefined();
      const cookies = res.headers['set-cookie'];
      const jwtCookie = cookies.find((cookie) => cookie.startsWith('jwt='));
      expect(jwtCookie).toBeDefined();
      expect(jwtCookie).toContain('HttpOnly');
    });

    it('should hash the password before saving', async () => {
      await request(app).post('/api/auth/signup').send(validUserData);

      const user = await User.findOne({ email: validUserData.email });
      expect(user).toBeDefined();

      expect(user.password).not.toBe(validUserData.password);
      expect(user.password.length).toBeGreaterThan(20);
    });


    it('should register users with different emails', async () => {
      // First user
      await request(app).post('/api/auth/signup').send(validUserData);

      // Second user with different email
      const secondUser = {
        ...validUserData,
        email: 'another@example.com',
      };

      const res = await request(app).post('/api/auth/signup').send(secondUser);

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe(secondUser.email);
    });
  });

  describe('Validation Failures', () => {
    it('should fail when email is missing', async () => {
      const invalidData = { ...validUserData };
      delete invalidData.email;

      const res = await request(app).post('/api/auth/signup').send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail when password is missing', async () => {
      const invalidData = { ...validUserData };
      delete invalidData.password;

      const res = await request(app).post('/api/auth/signup').send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail when admissionNumber is missing', async () => {
      const invalidData = { ...validUserData };
      delete invalidData.admissionNumber;

      const res = await request(app).post('/api/auth/signup').send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail when section is missing', async () => {
      const invalidData = { ...validUserData };
      delete invalidData.section;

      const res = await request(app).post('/api/auth/signup').send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail when gender is missing', async () => {
      const invalidData = { ...validUserData };
      delete invalidData.gender;

      const res = await request(app).post('/api/auth/signup').send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail when gender is invalid', async () => {
      const invalidData = {
        ...validUserData,
        gender: 'Other',
      };

      const res = await request(app).post('/api/auth/signup').send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Duplicate User Scenarios', () => {
    it('should fail when email already exists', async () => {
      // First registration
      await request(app).post('/api/auth/signup').send(validUserData);

      // Try to register with same email
      const duplicateData = {
        ...validUserData,
        admissionNumber: '2025',
      };

      const res = await request(app).post('/api/auth/signup').send(duplicateData);

      expect(res.status).toBe(409); // Conflict
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Email already in use');
    });

    it('should fail when duplicate email regardless of case', async () => {
      // Register with lowercase email
      await request(app).post('/api/auth/signup').send(validUserData);

      // uppercase email
      const upperCaseEmail = {
        ...validUserData,
        email: validUserData.email.toUpperCase(),
        admissionNumber: '2026',
      };

      const res = await request(app).post('/api/auth/signup').send(upperCaseEmail);
      expect(res.status).toBe(409);
    });
  });

  describe('Database Integrity', () => {
    it('should actually save the user to database', async () => {
      await request(app).post('/api/auth/signup').send(validUserData);

      const userInDb = await User.findOne({ email: validUserData.email });
      expect(userInDb).toBeDefined();
      expect(userInDb.email).toBe(validUserData.email);
    });

    it('should set timestamps (createdAt, updatedAt)', async () => {
      const res = await request(app).post('/api/auth/signup').send(validUserData);

      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty request body', async () => {
      const res = await request(app).post('/api/auth/signup').send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should handle null values', async () => {
      const invalidData = {
        admissionNumber: null,
        email: null,
        password: null,
        section: null,
        gender: null,
      };

      const res = await request(app).post('/api/auth/signup').send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should trim whitespace from email', async () => {
      const userData = {
        ...validUserData,
        email: '  test-trim@example.com  ',
      };

      const res = await request(app).post('/api/auth/signup').send(userData);

      expect(res.status).toBe(400);
    });
  });
});
