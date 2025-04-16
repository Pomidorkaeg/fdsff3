/**
 * Helper function to get the correct URL for assets when deployed to GitHub Pages
 */
export const getAssetUrl = (path: string): string => {
  // Check if the path is already a full URL or data URI
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }

  // Handle empty or invalid paths
  if (!path) {
    console.warn('Empty asset path provided to getAssetUrl');
    return '';
  }

  // For local development and production
  const baseUrl = '/bds';
  
  // Remove any leading slashes from the path and handle dist/ paths
  const cleanPath = path.replace(/^\/+/, '').replace(/^dist\//, '');
  
  return `${baseUrl}/${cleanPath}`;
};