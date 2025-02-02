# Blog Challenge

A blog application built with Next.js, Prisma, and Tailwind CSS.

# Badges

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/WHg7Rx4ZPzoCmJXPAB3RBj/6XJ3RYRmhWi9b7oagvVwGL/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/WHg7Rx4ZPzoCmJXPAB3RBj/6XJ3RYRmhWi9b7oagvVwGL/tree/main)

# Decisions taken and things to improve

See assumptions.md for details.

## Features

- View posts with pagination
- Filter posts by user
- Delete posts
- Create posts via API
- Responsive design
- Caching implementation
- Error handling with toast notifications
- Modal confirmations
- API integration tests

## Tech Stack

- Next.js 14
- Prisma ORM
- Tailwind CSS
- TypeScript
- SQLite
- Jest for testing

## Getting Started.

### Using Docker (Recommended)

1. Clone the repository

2. Build and run with Docker

```bash
cd blog-challenge
docker-compose up --build
```

The application will be available at http://localhost:3000

### Manual Setup (Alternative)

1. Clone the repository
2. Install dependencies:

```bash
cd blog-challenge
npm install
```

3. Run the development server (make sure port:3000 is available):

```bash
npm run dev
```

## API Endpoints

### Posts

- GET /api/posts - Get all posts (with pagination)
- POST /api/posts - Create a new post
- DELETE /api/posts/:id - Delete a post

### Users

- GET /api/users - Get all users

## Testing

Run API tests:

```bash
npm run test:api
```

## Postman Collection

Import the included Postman collection (blog_challenge_postman_collection.json) for API testing.

## Architecture

- Clean Architecture principles
- SOLID design patterns
- Repository pattern for data access
- Context providers for state management
- Custom hooks for UI logic

### Future Improvements

- Authentication system
- User management
- Generic button component
- Enhanced caching strategy
- Service worker for offline support
- User preferences (pagination, language)
- Try next cursor and other loading techniques
