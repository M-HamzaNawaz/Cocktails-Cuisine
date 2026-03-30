# State Management

This document explains how state is managed in the frontend
and how responsibilities are divided between local and shared state.

## Local State

Local state is used for UI-specific behavior such as form inputs,
toggle states, and temporary UI interactions.
It is managed using React's built-in hooks.

## Global State

Global state is reserved for data that needs to be shared
across multiple pages or components, such as user data
or application-wide settings.

## Async / Server State

Data fetched from backend APIs is treated as async state.
API communication is handled in a dedicated service layer,
and responses are stored in state as needed by the UI.

## Rationale

This approach keeps state scoped as narrowly as possible,
reduces unnecessary re-renders, and keeps the application
easy to reason about and maintain.
