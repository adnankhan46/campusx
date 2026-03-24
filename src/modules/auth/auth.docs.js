/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - admissionNumber
 *               - email
 *               - password
 *               - section
 *               - gender
 *             properties:
 *               admissionNumber:
 *                 type: string
 *                 format: admissionNumber
 *                 example: 2026
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: pass1234
 *               section:
 *                 type: string
 *                 example: ETC
 *               gender:
 *                 type: string
 *                 example: Male
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       429:
 *         description: Too many requests (rate limited)
 */

// Login
/**
 * @openapi
 * /auth/signin:
 *   post:
 *     summary: Logins a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: pass1234567
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       429:
 *         description: Too many requests (rate limited)
 */
