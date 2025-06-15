# Frontend and Backend Service with Hot Reload

This project is designed to demonstrate a full-stack development setup using **React** (frontend) and **Express.js** (backend) with **TypeScript**. The frontend utilizes **Vite** for fast development with hot-reloading capabilities. Both frontend and backend are containerized using **Docker** and **Docker Compose**, making the application easy to deploy and manage.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Project Structure](#project-structure)
5. [Configuration](#configuration)
6. [Development Workflow](#development-workflow)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)
9. [License](#license)

---

## Project Overview

This project consists of two main parts:

- **Frontend**: A React app built using Vite, styled with Tailwind CSS, and supporting hot reloading for rapid development.
- **Backend**: An API built with Express.js and TypeScript, providing a simple REST API for the frontend to consume.

Both services are containerized with Docker, enabling easy local development and deployment.

---

## Tech Stack

- **Frontend**:

  - **React**: JavaScript library for building user interfaces.
  - **Vite**: Next-generation build tool for fast development with HMR (Hot Module Replacement).
  - **Tailwind CSS**: Utility-first CSS framework for efficient styling.

- **Backend**:

  - **Node.js**: JavaScript runtime for building the API.
  - **Express.js**: Web framework for building REST APIs.
  - **TypeScript**: Adds static typing for JavaScript, improving the developer experience and catching bugs earlier.

- **Docker**: Used to containerize the frontend and backend services.
- **Docker Compose**: Used to manage multi-container applications.

---

## Installation

### Prerequisites

Make sure you have the following tools installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Steps to Set Up the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ssaavedraa/technical-test.git
   cd technical-test
   ```

2. **Build and start the containers**:

   Use the following command to build and start both the frontend and backend services:

   ```bash
   docker compose up --build -d
   ```

3. **Access the application**:

   - Frontend (React + Vite): [http://localhost:5173](http://localhost:5173)
   - Backend (Express API): [http://localhost:5000](http://localhost:5000)

4. **Hot Reload**:
   - The frontend will automatically reload when you make changes to the `client/src` directory, thanks to Vite's HMR support.

---

## Project Structure

```
.
├── api/                    # Backend code (Express API)
│   ├── src/                # Source files for the backend
│   ├── Dockerfile          # Docker configuration for the backend
│   ├── package.json        # Backend dependencies
├── client/                 # Frontend code (React + Vite)
│   ├── src/                # Source files for the frontend
│   ├── Dockerfile          # Docker configuration for the frontend
│   ├── vite.config.ts      # Vite configuration for hot reloading
│   ├── package.json        # Frontend dependencies
├── docker-compose.yml      # Docker Compose configuration
├── README.md               # Project documentation
└── .gitignore              # Git ignore file
```

---

## Configuration

### Vite (Frontend) Configuration

The Vite development server is configured to listen on `0.0.0.0` (to make it accessible inside Docker), and it uses polling for file watching inside Docker containers.

#### **`vite.config.ts`**:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		host: '0.0.0.0', // Ensures it listens on all interfaces in Docker
		hmr: {
			host: 'localhost', // This will make sure HMR is enabled on localhost
		},
		watch: {
			usePolling: true, // For file system watching inside Docker
		},
	},
});
```

### Docker Configuration

- **Frontend Dockerfile** (`client/Dockerfile`): Sets up the Vite server in a lightweight Node.js environment.
- **Backend Dockerfile** (`api/Dockerfile`): Builds the Express API using Node.js.
- **Docker Compose** (`docker-compose.yml`): Defines both services (frontend and backend), with correct port mappings and dependencies.

### Docker Compose Configuration

- **`docker-compose.yml`** defines two services:
  - `frontend`: React app served using Vite, with live reloading.
  - `api`: Express API that provides endpoints for the frontend.

---

## Development Workflow

1. **Start the development environment**:

   - Run `docker-compose up --build` to start both services.

2. **Edit the frontend code**:

   - Changes made in the `client/src` directory will trigger Vite's hot-reload mechanism, automatically refreshing the browser.

---

## Troubleshooting

- **Hot Reload Not Working**:
  - Ensure the correct port mappings are set up (5173 for frontend, 5000 for backend).
  - Check the logs of the frontend container using `docker compose logs frontend-service` for any issues.
- **Port Conflicts**:
  - If port `5173` or `5000` is already in use, change the ports in `docker-compose.yml` to avoid conflicts.

---

Here’s the updated section with the additional note about the hidden bug in the API that must be solved on the frontend:

---

## Requirements

As part of this technical test for a Frontend Developer position, you are expected to implement the following features and complete the associated questions within **4 hours**.

### Frontend Implementation

1. **UI/UX Design**:

   - Use **React** and **Tailwind CSS** to design a user-friendly interface that visualizes a **JSON object**. This visualization should display each key-value pair in the object as separate blocks with connections (edges) between nested keys.
   - Use **React Flow** to visualize the hierarchical structure of the JSON object. Each nested object should be represented as a separate node, and array values should be displayed in individual blocks.

2. **Responsiveness**:

   - Ensure the application is responsive and adapts well to various screen sizes.

3. **Interactivity**:

   - Implement the following interactive features:
     - **Hover Effects**: Highlight nodes and edges when hovering over them to show relationships or additional details.
     - **Node Expansion**: Allow users to click on a node to expand or collapse nested objects and arrays.
     - **Tooltips/Info Boxes**: Show tooltips or info boxes that display extra details about a node when users hover or click on it.

4. **Performance**:

   - Ensure the app remains performant when handling large JSON structures with many nodes and edges. Consider optimizations for rendering and data handling.

5. **API Integration**:

   - Fetch JSON data from the **Express API** (already set up) and dynamically render it on the frontend.

6. **Bug to Solve**:
   - There is a hidden bug in the **API** that must be solved on the **frontend** side. The bug may cause unexpected behavior in the data visualization. As part of the test, you should identify and resolve this issue within the frontend code.

### Questions to Answer

1. **How did you approach the development of the frontend visualization?**  
   Describe how you managed the complexity of rendering dynamic JSON data and ensuring the user interface is clear and efficient. What libraries or techniques did you use to make this process scalable?
   Started looking at the backend function, once I had an idea of how it worked created the types. The next step was to configure react flow. Added shadcn for the tooltip, and used react-flow library (@xyflow/react).

2. **What challenges did you face during the development process, and how did you overcome them?**  
   Discuss any obstacles you encountered while working with React, React Flow, Tailwind CSS, or the API integration, and explain how you solved them.
   The main challenge was learning the @xyflow/react library, especially configuring custom nodes and managing state updates efficiently. I overcame this by studying the documentation, exploring examples, and experimenting with different configurations until I achieved the desired behavior.

3. **How did you ensure that your solution can scale with larger datasets?**  
   What steps did you take to ensure the application remains performant and manageable as the size of the JSON data grows? Did you consider optimizations such as lazy loading, memoization, or virtualized rendering?
   The node processing function is O(n), ensuring each node and edge is handled only once. I enabled React Flow’s onlyRenderVisibleElements to render only what’s visible in the viewport, which improves performance with large datasets.

4. **What strategies did you implement to enhance interactivity and the user experience?**  
   How did you make the visualization interactive, and what user interface patterns or features did you use to improve the overall user experience?
   I implemented tooltips using shadcn to provide additional context on hover. I also added a collapsible feature for nodes, allowing users to expand or collapse sections of the graph, which keeps the interface clean and manageable.

5. **How would you improve the app’s scalability and performance for future updates or features?**  
   If this project were to evolve or handle even larger and more complex datasets, how would you approach enhancing its scalability and performance?
   To further improve scalability, I would implement backend pagination to load JSON data in chunks. Nodes could be collapsed by default, and expanding a node would trigger a request for its children. Additionally, I would set a default expansion level to limit the initial data rendered, improving load times and responsiveness.

6. **How did you identify and resolve the hidden bug in the API on the frontend side?**  
   Describe the process you used to identify the bug, how it impacted the data visualization, and how you fixed it within the frontend code.
   The bug was that the backend treated the entire request body as the JSON to visualize, so if I sent additional parameters (like configuration options), they were included as part of the JSON tree instead of being handled separately. To work around this on the frontend, I made sure to only send the pure JSON data in the request body, without any extra properties, so the backend would process the data correctly.

---

## Submission Instructions

1. **Fork this repository**: Fork this repository to your own GitHub account.
2. **Clone the forked repository**: Clone the repository to your local machine and set up the project following the instructions in the README.
3. **Complete the technical tasks**: Implement the features listed above and answer the questions.
4. **Push the changes**: Push your changes back to your forked repository.
5. **Submit your repository link**: Once you have completed the tasks, submit the link to your GitHub repository with your answers to the questions.

**Expected time to complete the project: 4 hours.**

Good luck and have fun!
