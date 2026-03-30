# Frontend Architecture

## Overview

The frontend follows a component-based architecture using React and TypeScript.
Responsibilities are separated between UI, state management, routing,
and API communication.

## Separation of Concerns

- UI rendering is handled by components and pages
- API communication is isolated in a service layer
- State is managed locally or globally based on scope
- Routing is handled centrally

## Data Flow

API requests are made through a service layer.
Responses are stored in state and consumed by UI components.
