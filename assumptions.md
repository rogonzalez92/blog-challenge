# Blog Challenge Assumptions

## Technologies Used

I started this project with the assumption that I could only use the proposed technologies:

- Next.js

- Prisma ORM

- Tailwind CSS

All three technologies were new to me, as was React (partially). Therefore, before developing the project, I extensively studied all the required technologies. Once prepared, I initiated the project: blog-challenge.

## Development Approach

### MVP Mindset

- I treated this project as an MVP (Minimum Viable Product). As such, I opted for a monorepo structure instead of microservices logic, as microservices were not necessary given the basic functionality. I used a single provider for this instance: the database accessed through REST methods.

### Backend Design

- For this project, I only implemented the GET, CREATE and DELETE methods, as these were the only requirements in the challenge.

- I assumed that the GET endpoint for users would be sufficient to associate users with their posts.

### Clean Architecture and SOLID Principles:

- Even though this is a small project, I applied SOLID principles and clean architecture wherever possible.

- These principles make the project scalable, allowing future additions like creating users or posts without requiring significant changes to the structure.

- The project files are well-separated, making it easier to add new business rules, entities, or features.

### Frontend Design

- While the design and styling are basic, I created reusable components such as Toast for notifications and Modal for confirmations.

- The next step would be to create a generic button component, as the current button is limited to delete actions due to time constraints. The logic for a generic button could follow the approach used for the toast and modal.

- I centralized the API interaction logic in the provider folder.

- React components are organized to separate concerns, which was one of the most challenging parts of the project.

- I created a custom hook to enhance UI logic and apply React principles more efficiently.

### Security Best Practices

- All API URLs are stored in the .env file instead of being hardcoded into the codebase.

## Assumptions for Functionality

### Post Creation

- I'm assuming that anyone can create posts and assign them to existing users, initially for challenge purposes. This shouldn't be the case in a real application, but it allows us to create more posts with existing users. Since user creation logic isn't implemented due to time constraints, I've resolved it this way. Posts can only be created via the API. I've included a Postman collection JSON file to facilitate testing.

### Post Deletion

- In this implementation, anyone can access the page and delete posts.

- Ideally, an authentication system would be implemented so that users can only delete their own posts, or an admin can manage deletions. Similarly, user authentication would be required for post creation.

### Language and User Preferences:

- Currently, the platform assumes all users operate in English.

- In the future, users could set their language and design preferences.

### Server-Side Handling

- To account for potential connection issues, I managed as much as possible on the server side.

- Pagination: Only necessary results are fetched, with a default of 6 posts per page (hardcoded for now but customizable in the future). While these components are lightweight, it is assumed that the application may scale to accommodate many users and posts.

- Lazy loading for non-critical components: While these components are lightweight, it is assumed that the application may scale to accommodate many users and posts.

### Loading Indicators:

- A spinner and other visual elements were added for post loading, deletion, and user selection to improve the user experience during slower operations.

### Caching:

Data is cached to avoid unnecessary requests. However, when switching pages or queries, I encountered the following issue: https://github.com/vercel/next.js/discussions/48110, which results in an extra fetch when the data is not cached. Finding a workaround for this remains a pending task.

### Search Functionality

- The search feature is implemented as a dynamic select input.

- Once the users are loaded, there is no need to type their names, reducing the likelihood of incorrect submissions.

### API Testing with Jest

Implemented integration tests for all API endpoints (GET /users, GET /posts, POST /posts, DELETE /posts/:id)

- Tests cover successful operations, error cases, and edge scenarios
- Mocked fetch calls for testing server errors and edge cases
- Assumed basic validation requirements for post creation (title, body, userId)
- Tests ensure proper error responses (400, 404, 500) in various scenarios

## Future Improvements

### Loading

- Loading states are currently confusing. With more time, I would improve how they work and make the loading experience more consistent.

### Implement Authentication:

- Allow users to create accounts and manage their posts.

- Ensure only authorized users can delete or modify posts.

### Refactor Button Component:

- Create a generic button component for different actions beyond deletion.

### Enhanced Customization:

- Allow users to set their pagination preferences.

- Provide language and design customization options.

### Optimize Caching:

- Implement a workaround to avoid extra fetches caused by route updates when data is not cached.
- A polling system can be implemented if requests take too long due to low connection speeds.
- Implement a service worker to allow navigation in case the internet goes down.

### Testing

- Testing for the UI components
