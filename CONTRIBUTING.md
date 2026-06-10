# Contributing to Astro - Webflow Cloud File Upload Demo

Thank you for your interest in contributing to our project! We welcome contributions from the community and appreciate your time and effort.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
3. [Development Setup](#development-setup)
4. [Pull Request Process](#pull-request-process)
5. [Reporting Bugs](#reporting-bugs)
6. [Suggesting Enhancements](#suggesting-enhancements)
7. [Style Guides](#style-guides)
8. [Additional Notes](#additional-notes)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem
- **Describe the exact steps which reproduce the problem** in as many details as possible
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include details about your configuration and environment**

### Suggesting Enhancements

If you have a suggestion for a new feature or an improvement to an existing feature, please let us know! We want to hear your ideas and make this project better for everyone.

When suggesting enhancements, please include:

- **Use a clear and descriptive title** for the issue
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**

### Pull Requests

We love pull requests! Here's a quick guide:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Git
- Webflow Cloud account

### Local Development

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/file-uploader.git
   cd file-uploader
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root:

   ```bash
   ORIGIN=http://localhost:4321
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Run tests** (if available)
   ```bash
   npm test
   ```

## Pull Request Process

1. **Update the README.md** with details of changes to the interface, if applicable
2. **Update the documentation** if you've added new features or changed existing ones
3. **Ensure your code follows the style guides** outlined below
4. **Test your changes** thoroughly
5. **The PR will be merged once you have the sign-off** of at least one other developer

## Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/webflow-cloud/file-uploader/issues/new).

### Before Submitting a Bug Report

- **Check the existing issues** to see if the problem has already been reported
- **Try to reproduce the issue** in the latest version of the project
- **Check if the issue is related to your environment** (browser, OS, etc.)

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment (please complete the following information):**

- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

## Suggesting Enhancements

We also use GitHub issues to track feature requests. Suggest an enhancement by [opening a new issue](https://github.com/webflow-cloud/file-uploader/issues/new).

### Enhancement Request Template

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript Style Guide

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for classes and components
- Use descriptive variable and function names

### TypeScript

- Use strict mode
- Define types for all function parameters and return values
- Use interfaces for object shapes
- Prefer `const` over `let` when possible
- Use `readonly` for immutable properties

### React Components

- Use functional components with hooks
- Use TypeScript for all components
- Follow the naming convention: PascalCase for components
- Use descriptive prop names
- Include PropTypes or TypeScript interfaces for props

### CSS/Styling

- Use Tailwind CSS classes when possible
- Follow BEM methodology for custom CSS
- Use CSS custom properties for theming
- Keep styles modular and reusable

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

- `bug` - Something isn't working
- `documentation` - Improvements or additions to documentation
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `invalid` - Something is wrong
- `question` - Further information is requested
- `wontfix` - This will not be worked on

### Release Process

1. Update version numbers in `package.json`
2. Update the changelog
3. Create a release tag
4. Deploy to production

### Communication Channels

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and community discussions
- **Pull Requests**: For code contributions

Thank you for contributing to Astro - Webflow Cloud File Upload Demo! 🚀
