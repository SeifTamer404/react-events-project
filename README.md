# React Router & Authentication Mastery: An Educational Showcase

This project, while appearing as a simple event management application, is a focused and deliberate demonstration of advanced features in React Router and Authentication. It serves as a technical showcase of modern routing, data fetching, and state management patterns.

## Technical Highlights

This project intentionally leverages the latest React Router capabilities to build a robust and performant user experience.

### 1. Advanced Data Fetching & Performance Optimization

The application is designed for optimal perceived performance by strategically fetching and rendering data.

- **Loader Functions:** Routes are equipped with `loader` functions that initiate data fetching _before_ the component renders. This ensures that data is available as soon as the component mounts, eliminating the need for `useEffect`-based data fetching and the associated loading spinners.

- **Deferred Loading with `defer`, `<Suspense>`, and `<Await>`:** On the Event Detail page, critical data (the specific event details) is loaded immediately, while less critical data (the list of all other events) is deferred.
  - The `loader` uses `defer()` to return a promise for the secondary data.
  - The component uses `<Suspense>` to show an instantaneous fallback UI for the deferred content.
  - The `<Await>` component resolves the promise from the loader, rendering the content once it's available. This non-blocking approach allows the user to see and interact with the most important content on the page immediately.

### 2. Declarative Mutations & State Management

State management for data mutations (creating, updating, deleting) is handled declaratively and efficiently without complex state libraries.

- **Actions & Form Submission:** Instead of manual `onSubmit` handlers, the project uses the declarative `<Form>` component which serializes form data and sends it to the `action` function associated with the route. This keeps component code clean and colocates data mutations with the routes they belong to.

- **Non-Navigational Mutations with `useFetcher`:** The newsletter signup form uses `fetcher.Form` from the `useFetcher` hook. This allows the application to communicate with a route `action` in the background _without_ triggering a navigation or page reload. The UI updates based on the `fetcher.state`, providing a seamless user experience for small interactions.

### 3. Robust Error Handling

The application provides a resilient user experience by gracefully handling exceptions across the routing lifecycle.

- **`errorElement`:** Each route, including the root route, is configured with an `errorElement`. If an error is thrown during a loader, action, or rendering, React Router catches it and displays the specified error component instead of crashing the application.
- **`useRouteError`:** The generic `Error` page component uses the `useRouteError` hook to inspect the thrown error. This allows the UI to display contextual information, such as the error message and status code, which are extracted from the `Response` object thrown by the loader or action.

### 4. Comprehensive Hook Usage

This project demonstrates a wide range of React Router hooks to manage the application's state and behavior:

- **`useLoaderData` & `useRouteLoaderData`:** Used to access data returned from the route loaders.
- **`useNavigation`:** Provides the global navigation state (`submitting`, `loading`, `idle`), which is used in the `EventForm` to disable the form and provide user feedback during submissions.
- **`useSubmit`:** Employed for programmatic form submissions, enabling actions like event deletion from a simple button click without a traditional form.
- **`useFetcher`:** As described above, for background data mutations without navigation.
- **`useRouteError`:** To display contextual error information.
- **`useActionData`:** captures validation errors returned from actions, allowing forms to display user-friendly feedback when inputs are invalid.
- **`useNavigate`:** Used for programmatic navigation, such as cancelling an action and returning to the previous page.
- **`useSearchParams`:** Manages query parameters (e.g., `?mode=login` vs `signup`) to toggle between authentication modes within the same component.
- **`json` & `redirect`:** Utility functions used in loaders and actions to create `Response` objects with the correct headers and status codes, simplifying the process of returning data or redirecting the user.

### 5. Authentication & Authorization

The project implements a complete security flow including Authentication (verifying who you are) and Authorization (verifying what you can do), entirely using React Router features.

- **Token Management (Authentication):** Authentication tokens (JWT) are handled via `localStorage`. The root loader retrieves this token, making it accessible to the entire application.
- **Route Protection (Authorization):** A `checkAuthLoader` function acts as a route guard. It runs before protected routes (like creating or editing events) are rendered. If no valid token exists, it redirects the user to the login page, securing the route at the data-loading level.
- **Conditional UI (Authorization):** Components like `MainNavigation` and `EventItem` use `useRouteLoaderData` to check for token presence. Authorized actions (like "Edit" and "Delete" buttons) are only rendered for authenticated users.
- **Token Injection (Authorization):** The `getAuthToken` utility retrieves the token, which is then attached to the `Authorization: Bearer` header in API requests (actions) to authorize write operations on the backend.
- **Automatic Logout:** The application proactively manages session security by calculating the token's remaining duration. A timer in the root layout automatically triggers a logout action when the token expires.

## Tech Stack

- **React:** v18+
- **React Router:** v6+
- **CSS Modules:** For component-level styling.

## How to Run

1.  **Clone the repository.**
2.  Navigate to the `frontend` directory: `cd frontend`
3.  **Install dependencies:** `npm install`
4.  **Start the development server:** `npm start`
