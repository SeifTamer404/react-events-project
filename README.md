# React Router Mastery: An Educational Showcase

This project, while appearing as a simple event management application, is a focused and deliberate demonstration of advanced features in React Router. It serves as a technical showcase of modern routing, data fetching, and state management patterns.

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
- **`json` & `redirect`:** Utility functions used in loaders and actions to create `Response` objects with the correct headers and status codes, simplifying the process of returning data or redirecting the user.

## Tech Stack

- **React:** v18+
- **React Router:** v6+
- **CSS Modules:** For component-level styling.

## How to Run

1.  **Clone the repository.**
2.  Navigate to the `frontend` directory: `cd frontend`
3.  **Install dependencies:** `npm install`
4.  **Start the development server:** `npm start`
