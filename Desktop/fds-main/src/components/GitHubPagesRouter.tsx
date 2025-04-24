import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function GitHubPagesRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the path from the GitHub Pages redirect
    const path = sessionStorage.getItem('path');
    if (path) {
      // Remove the stored path
      sessionStorage.removeItem('path');
      // Navigate to the stored path
      navigate(path);
    }
  }, [navigate]);

  return null;
} 