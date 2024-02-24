# Kubernetes Microservices

This project is a set of microservices connected through Kubernetes. The system is a *counting application*. That means, that we have a backend, that handles the individual counters and collects statistics about the counters. The UI gives the user the possibility to interact with the counters and view the statistics. The entire system consists of 3 services:

- UI
- Counting
- Statistics

## Description of Services

- **UI:** The UI is Next.js application with only one start page. On that page, you can create new counters, increment, decrement or set the counters directly. The UI reactively adapts to changes to the counters to always display the current status. All requests from the client go through the UI service and are forwarded to the other backend services.
- **Counting:** The counting service is a Nest.js application that manages the counters. Counters can be created, updated or deleted through the API. The API definition can be found [here](./backend/apps/counting/src/app.controller.ts).
- **Statistics:** The statistics services is a Nest.js application that gathers statistics about the counters, e.g. average count and counter with max- and min count. The exact API definition can be found [here](./backend/apps/statistics/src/statistics.controller.ts).

## How to start developing

### Requirements

- It is required to have [Tilt](https://tilt.dev/) installed for the development. For details on the installation, click [here](https://docs.tilt.dev/install.html). To verify your tilt installation, run `tilt --version`. The installed Tilt version should now be shown in console.
- It is also required to have a local Kubernetes cluster. The easiest way nowadays is to enable Kubernetes in your Docker Desktop installation. If this is not a possibility for you, a tool like [minikube](https://minikube.sigs.k8s.io/docs/start/) is appropriate. To verify that you local Kubernetes cluster is running, run `kubectl get nodes`. A small dialog showing you information about your control-plane node should now show up.

### Getting started

To start developing, follow these steps:

1. Go into the backend directory `cd backend/` and then install all dependencies with `npm install`.
2. Go into the frontend directory `cd frontend/` and also install all dependencies with `npm install`.
3. Run `tilt up` to start the development environment. All services are now started and all ClusterIP and NodePort services are created. All the Kubernetes definitions can be found [here](./kubernetes/).

## How to build the Docker images locally

### backend

The Dockerfile can be found [here](./backend/Dockerfile).

- Go into the backend directory **`cd backend/`**
- **Counting:** `docker build -t counting --build-arg="service=counting" .`
- **Statistics:** `docker build -t statistics --build-arg="service=statistics" .`

### frontend

The Dockerfile can be found [here](./frontend/Dockerfile).

- Go into the frontend directory **`cd frontend/`**
- **UI:** `docker build -t frontend .`
