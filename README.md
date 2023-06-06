# Hiro pay token balances

## Prioritised Task List

1. Update package versions in package.json: The versions of the packages used in the given code need to be updated to the latest versions. This is crucial for security reasons and also to make sure we leverage the latest features and fixes available in the packages. Here are the latest versions that should be used:

2. Refactor the fetchBalances function: Currently, the decision to fetch balances for development or from the legacy API is made within the fetchBalances function. It would be better to use environment variables to configure this setting. This will make the function more flexible and allow the choice of data source to be made at runtime.

3. Add error handling for data fetching: The fetchBalancesFromMessyLegacyApi function doesn't have any error handling at the moment. We need to add appropriate error handling to manage scenarios where the fetch operation might fail.

4. Add PropTypes for component props: PropTypes are a good way to enforce the type of props passed to the components and make the code more robust and less error-prone.

5. Add key to list items in TokenList component: When mapping over an array to create a list of React components, it's necessary to add a unique key prop to each child component for performance optimization and to allow React to maintain state.

6. Improve code readability and maintainability: Certain parts of the code can be refactored for better readability and maintainability. For instance, the ASCII art rendering in the App and TokenBalance components can be separated into their own components or utility functions.

7. Use React.memo for performance optimization: The TokenBalance component could be wrapped with React.memo to prevent unnecessary re-renders and optimize performance, especially given that the application could be dealing with a large number of tokens.

8. Write unit tests for the components and utility functions: In order to ensure that the application works as expected, unit tests should be written for the components and utility functions using a testing library like Jest and React Testing Library.

9. ESLint: We want our code to look nice and consistent. Let's add some linting rules!
 
10. Some refactoring: fetchBalances and helper functions should go to a separate file. That would also simplify testing it.

11. Add useFetchBalances hook, that will wrap fetchBalances function and return loading, error and balances. That will simplify usage of fetchBalances function and App would display proper states
