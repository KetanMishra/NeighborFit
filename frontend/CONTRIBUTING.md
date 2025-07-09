# Contributing to NeighborFit

Thank you for your interest in contributing to NeighborFit! This document provides guidelines and information for contributors.

## 🌐 Live Application

Before contributing, please try our live application: **[https://neighborfitforyou.netlify.app/](https://neighborfitforyou.netlify.app/)**

This will help you understand the user experience and identify areas for improvement.

## 🤝 How to Contribute

### Reporting Issues

1. Check existing issues to avoid duplicates
2. Use the issue template when creating new issues
3. Provide detailed information including:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and device information
   - Screenshots if applicable

### Suggesting Features

1. Open an issue with the "feature request" label
2. Describe the feature and its benefits
3. Provide mockups or examples if possible
4. Discuss implementation approach

### Code Contributions

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Commit with descriptive messages
6. Push to your fork and submit a pull request

## 📋 Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/KetanMishra/NeighborFit.git
   cd neighborfit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm run test
   ```

## 🎯 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Keep components under 200 lines when possible
- Use proper prop types and default values

### Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use semantic HTML elements

### File Organization

- Keep files under 300 lines
- Use clear, descriptive file names
- Group related functionality together
- Follow the established folder structure

## 🧪 Testing

- Write unit tests for utility functions
- Test component behavior, not implementation
- Ensure responsive design works on all devices
- Test accessibility features

## 📝 Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(assessment): add new lifestyle preference slider
fix(results): correct neighborhood sorting algorithm
docs(readme): update installation instructions
```

## 🔍 Code Review Process

1. All changes require pull request review
2. Address reviewer feedback promptly
3. Ensure CI checks pass
4. Maintain clean commit history
5. Update documentation as needed

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide)

## 🎨 Design Guidelines

- Follow the existing design system
- Maintain consistent user experience
- Ensure accessibility compliance
- Test on multiple devices and browsers

## 🚀 Release Process

1. Features are merged to `main` branch
2. Version bumps follow semantic versioning
3. Releases are tagged and documented
4. Deployment happens automatically via CI/CD

## 📞 Getting Help

- Open an issue for questions
- Join our community discussions
- Check existing documentation first
- Be respectful and constructive

## 📊 Research Contributions

### User Research
- Help improve our [user research survey](https://forms.gle/vypFdC62y374Wx4WA)
- Analyze [survey results](https://docs.google.com/spreadsheets/d/1YeIARijTcO2haCy4ahZgfHgsOsHe9_fZwyqedbYsCJg/edit?usp=sharing)
- Contribute to user persona development
- Share insights from user interviews

### Data Contributions
- Help validate neighborhood data
- Contribute local knowledge about Bangalore areas
- Suggest new data sources
- Improve data accuracy and freshness

### Algorithm Improvements
- Suggest matching algorithm enhancements
- Contribute to scoring methodology
- Help with machine learning integration
- Optimize performance and accuracy

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation
- Community showcases

## 📈 Impact Tracking

We track the impact of contributions through:
- User satisfaction metrics
- Algorithm accuracy improvements
- Performance enhancements
- Feature adoption rates

## 🔗 Quick Links

- **Live Application**: [https://neighborfitforyou.netlify.app/](https://neighborfitforyou.netlify.app/)
- **User Research**: [Survey](https://forms.gle/vypFdC62y374Wx4WA) | [Results](https://docs.google.com/spreadsheets/d/1YeIARijTcO2haCy4ahZgfHgsOsHe9_fZwyqedbYsCJg/edit?usp=sharing)
- **Documentation**: [README](README.md) | [Architecture](ARCHITECTURE.md)
- **Testing**: [Testing Guide](TESTING.md)
- **GitHub Repository**: [https://github.com/KetanMishra/NeighborFit](https://github.com/KetanMishra/NeighborFit)

Thank you for helping make NeighborFit better for everyone! 🙏