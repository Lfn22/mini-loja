/**
 * API service helpers.
 *
 * All network requests should be centralized in this module so
 * components remain declarative and side effects are easy to test and
 * mock.  The base URL can be overridden via environment variables
 * when running in different environments.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  'https://fakestoreapi.com';

/**
 * Fetch a list of products from the fake store API.  If an error
 * occurs, an empty array is returned and the error logged.  Callers
 * don't have to handle exceptions for common failures.
 *
 * @returns {Promise<Array>} List of product objects
 */
export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}