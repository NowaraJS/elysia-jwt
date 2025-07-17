# 🔐 Elysia JWT Plugin

## 📌 Table of Contents

- [🔐 Elysia JWT Plugin](#-elysia-jwt-plugin)
  - [📌 Table of Contents](#-table-of-contents)
  - [📝 Description](#-description)
  - [✨ Features](#-features)
  - [🔧 Installation](#-installation)
  - [⚙️ Usage](#-usage)
  - [📚 API Reference](#-api-reference)
  - [⚖️ License](#-license)
  - [📧 Contact](#-contact)

## 📝 Description

> A secure and type-safe JWT authentication plugin for Elysia applications.

**Elysia JWT Plugin** provides robust JSON Web Token authentication capabilities for Elysia applications, leveraging the industry-standard `jose` library to ensure secure JWT handling with modern cryptographic standards and full TypeScript support.

## ✨ Features

- 🔒 **Security First**: Built with modern cryptographic standards using the [jose](https://www.npmjs.com/package/jose) library
- 🧩 **Type Safety**: Full TypeScript support with strongly typed JWT payloads
- 🎯 **Elysia Integration**: Seamlessly integrates with Elysia's context system
- ⚙️ **Customizable**: Flexible configuration options for headers, payloads, and expiration
- � **Easy to Use**: Simple API for signing and verifying JWT tokens
- 🧪 **Well Tested**: Comprehensive test suite included

## 🔧 Installation

```bash
bun add @nowarajs/elysia-jwt
```

## ⚙️ Usage

### Basic Usage with Global Expiration

```typescript
import { Elysia } from 'elysia';
import { jwtPlugin } from '@nowarajs/elysia-jwt';

const app = new Elysia()
  .use(jwtPlugin({
    secret: process.env.JWT_SECRET!,
    exp: '1h' // Global expiration for all tokens
  }))
  .post('/login', ({ jwt }) => {
    // Sign a JWT token with global expiration (1h)
    return jwt.sign({ userId: 123, role: 'user' });
  })
  .get('/protected', async ({ jwt, headers }) => {
    // Verify JWT token
    const token = headers.authorization?.replace('Bearer ', '');
    const payload = await jwt.verify(token);
    if (!payload) throw new Error('Invalid token');
    return { user: payload };
  })
  .listen(3000);
```

### Access & Refresh Tokens with Different Expiration

```typescript
import { Elysia } from 'elysia';
import { jwtPlugin } from '@nowarajs/elysia-jwt';

const app = new Elysia()
  .use(jwtPlugin({
    secret: process.env.JWT_SECRET!,
    exp: '15m' // Default expiration
  }))
  .post('/login', ({ jwt }) => {
    // Access token with short expiration
    const accessToken = jwt.sign({ 
      userId: 123, 
      role: 'user',
      type: 'access'
    }, { exp: '15m' });
    
    // Refresh token with long expiration
    const refreshToken = jwt.sign({ 
      userId: 123, 
      type: 'refresh' 
    }, { exp: '7d' });
    
    return { accessToken, refreshToken };
  })
  .post('/refresh', async ({ jwt, body }) => {
    // Verify refresh token
    const payload = await jwt.verify(body.refreshToken);
    if (!payload || payload.type !== 'refresh') {
      throw new Error('Invalid refresh token');
    }
    
    // Generate new access token
    const newAccessToken = jwt.sign({ 
      userId: payload.userId, 
      role: 'user',
      type: 'access'
    }, { exp: '15m' });
    
    return { accessToken: newAccessToken };
  })
  .get('/protected', async ({ jwt, headers }) => {
    const token = headers.authorization?.replace('Bearer ', '');
    const payload = await jwt.verify(token);
    if (!payload || payload.type !== 'access') {
      throw new Error('Invalid access token');
    }
    return { user: payload };
  });
```

### Custom Payload Configuration

```typescript
import { Elysia } from 'elysia';
import { jwtPlugin } from '@nowarajs/elysia-jwt';

const app = new Elysia()
  .use(jwtPlugin({
    jwtKeyName: 'auth',
    secret: 'your-secret-key',
    exp: '24h',
    header: {
      alg: 'HS256',
      typ: 'JWT'
    },
    payload: {
      iss: 'my-api',
      aud: 'my-client'
    }
  }))
  .post('/login', ({ auth }) => {
    // Sign with custom payload (inherits iss and aud from config)
    return auth.sign({ 
      userId: 123, 
      role: 'admin',
      permissions: ['read', 'write', 'delete'],
      department: 'engineering'
    });
  })
  .get('/user/:id', async ({ auth, headers, params }) => {
    const token = headers.authorization?.replace('Bearer ', '');
    const payload = await auth.verify(token);
    
    if (!payload) {
      throw new Error('Unauthorized');
    }
    
    // Access custom payload fields
    return { 
      user: {
        id: payload.userId,
        role: payload.role,
        permissions: payload.permissions,
        department: payload.department
      },
      issuer: payload.iss,
      audience: payload.aud,
      requestedId: params.id 
    };
  });
```

## 📚 API Reference

You can find the complete API reference documentation for `Elysia JWT Plugin` at:

- [Reference Documentation](https://nowarajs.github.io/elysia-jwt/)

## ⚖️ License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

## 📧 Contact

NowaraJS - [GitHub Organization](https://github.com/NowaraJS)

[Project Link](https://github.com/NowaraJS/elysia-jwt)

