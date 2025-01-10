const protocol = "http://";
const domain = "localhost:8000";

/**
 * Return the base URL (protocol + domain) of the backend web server
 */
export default function getBaseURL() {
  return protocol + domain;
}
