export const addJWTHeader = (headerObj) =>
  headerObj.append("Authorization", "token");

export const addContentTypeHeader = (headerObj) =>
  headerObj.append("Content-Type", "application/json");
