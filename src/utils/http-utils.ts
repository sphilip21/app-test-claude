export function isContentTypeJson(response: Response): boolean {
  const contentType = response.headers.get('Content-Type');
  return contentType !== null && contentType.startsWith('application/json');
}
