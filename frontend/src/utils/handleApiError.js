export default function handleApiError(statusCode) {
  switch (statusCode) {
    case 400:
      throw new Error("Bad request");
    case 401:
      throw new Error("Unauthorized");
    case 404:
      throw new Error("Not found");
    case 500:
      throw new Error("Server error");
    default:
      throw new Error("Request failed");
  }
}
