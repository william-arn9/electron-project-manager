
# Project Manager App

## Overview

**Project Manager App** is a local project management tool built with Electron. It scans your storage for projects with standard structures (such as `package.json` or `pom.xml` files) and displays them in an easy-to-use interface. From this app, you can quickly access your projects in VS Code, configure existing projects, or create new ones with just a few clicks.

## Features

- **Automatic Project Detection:** The app scans your directories for projects that contain standard files like `package.json` or `pom.xml`, making it easy to find and manage all your projects.
- **VS Code Integration:** Open any detected project directly in Visual Studio Code from within the app.
- **Project Configuration:** Easily configure your projects without leaving the app.
- **New Project Creation:** Quickly create new projects with a few simple clicks.

## Getting Started

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/project-manager-app.git
   cd project-manager-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the App

To start the application, simply run:

```bash
npm run start
```

This command will automatically launch the app.

## Usage

- **Browse Projects:** The app will display a list of all detected projects with standard structures.
- **Open in VS Code:** Click on any project in the list to open it in Visual Studio Code.
- **Configure Projects:** Select a project to configure its settings within the app.
- **Create New Projects:** Use the "Create New Project" button to quickly set up a new project with predefined structures.

## Contributing

Contributions are welcome! If you find any bugs or have ideas for improvements, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

