# Kubernetes Microservices

This project uses Kubernetes to develop microservices. This is a simple counting application.

## Description

The following microservices are implemented:

### Frontend

The frontend is a simple web application that displays the current count. It also provides a buttons to change the
count.
It is a Next.js application.

### Counting Service

The counting service holds the counters and their score.
It is a NestJS application.

### Statistics Service

This service can gather statistics about the counters of the counting service.
It is also a NestJS application.
