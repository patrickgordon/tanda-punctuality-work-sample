export const BASE_API_URL = 'http://localhost:4567'

/**
 * This function will return the headers to be used in the API calls. As they are all the same it makes sense to keep
 * this DRY.
 * @returns {Object}
 */
export function getHeaders() {
  return {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  }
}
