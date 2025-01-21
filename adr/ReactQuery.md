### Title:

Add React Query for State Management

### Context:

The application needs a robust solution for managing server-side state, such as data fetched from APIs.
Desired and planned for state management relies on a mix of useState and useEffect for API calls, leading to repetitive code and inconsistent patterns.
The application requires efficient caching, automatic refetching, and improved data synchronization with minimal boilerplate.
Alternatives considered include React Query, Redux Toolkit, and Apollo Client.

### Decision:

We decided to add React Query for server-side state management because:

- React Query’s focus on server-side state aligns perfectly with our needs, avoiding the risks of over-engineering for local state.
- It simplifies data fetching and caching with built-in tools like query invalidation, background refetching, and stale-while-revalidate strategies.
- It reduces the need for boilerplate code compared to traditional Redux patterns.
- Its ecosystem includes powerful devtools for debugging and inspecting cache behavior.
- Prior experience makes it an idea choice.

### Consequences:

Positive: Streamlined API interaction with features like automatic retries, caching, and synchronization. Improved developer productivity due to reduced boilerplate.
Negative: React Query is not designed for client-side state management, so additional solutions (e.g., useState, useContext) are still needed for managing local state.
Risks: The team must adapt to React Query’s paradigms, which may require additional onboarding for unfamiliar developers.

### Alternatives Considered:

Redux Toolkit: Rejected because it introduces unnecessary complexity for managing server-side state, which is the primary challenge.
Apollo Client: Rejected because it is heavily tailored for GraphQL APIs, while this project primarily uses REST APIs.

### Date:

January 21, 2025.

### Status:

Accepted.
