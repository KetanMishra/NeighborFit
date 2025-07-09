# Security Policy

## Supported Versions

We actively support the following versions of NeighborFit with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

---

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in NeighborFit, please report it responsibly.

### How to Report
1. **Email**: Send details to `security@neighborfit.com`
2. **Subject**: Include "SECURITY" in the subject line
3. **Details**: Provide a clear description of the vulnerability

### What to Include
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (if available)

### Response Timeline
- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Varies based on severity

---

## Security Features

### Backend
- **Input Validation**: All API endpoints validate required fields and data types
- **Authentication**: JWT tokens for stateless authentication
- **Password Storage**: Passwords are hashed with bcryptjs before storage
- **Error Handling**: All errors returned as JSON, with no stack traces or sensitive info exposed
- **Rate Limiting**: (Planned) Will limit requests to sensitive endpoints (e.g., login)
- **HTTPS**: Enforced in production deployments
- **Environment Variables**: Secrets (JWT, DB URI) are never hardcoded

### Frontend
- No sensitive data stored in localStorage except JWT (for session)
- All user input validated client-side before sending to backend
- HTTPS enforced in production

---

## Security Best Practices
- Keep dependencies updated
- Use HTTPS in production
- Validate all user inputs (frontend and backend)
- Follow secure coding practices
- Regular security audits

---

## Contact
For security-related questions:
- Email: security@neighborfit.com
- GitHub: Create a private security advisory at [https://github.com/KetanMishra/NeighborFit](https://github.com/KetanMishra/NeighborFit)

Thank you for helping keep NeighborFit secure! 🙏