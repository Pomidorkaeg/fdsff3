export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  date: string;
  thumbnail: string;
  url: string;
  category: 'match' | 'training' | 'interview' | 'stadium' | 'academy';
}

// Load media from localStorage
export const loadMedia = (): MediaItem[] => {
  try {
    const savedMedia = localStorage.getItem('media');
    if (savedMedia) {
      return JSON.parse(savedMedia);
    }
  } catch (error) {
    console.error('Failed to load media from localStorage:', error);
  }
  return [];
};

// Save media to localStorage
export const saveMedia = (media: MediaItem[]): void => {
  try {
    localStorage.setItem('media', JSON.stringify(media));
  } catch (error) {
    console.error('Failed to save media to localStorage:', error);
  }
};

// Get all media
export const getAllMedia = (): MediaItem[] => {
  return loadMedia();
};

// Add a new media item
export const createMedia = (mediaItem: MediaItem): void => {
  const media = loadMedia();
  media.push(mediaItem);
  saveMedia(media);
};

// Update existing media item
export const updateMedia = (updatedMedia: MediaItem): void => {
  const media = loadMedia();
  const index = media.findIndex(item => item.id === updatedMedia.id);
  if (index !== -1) {
    media[index] = updatedMedia;
    saveMedia(media);
  }
};

// Delete media item
export const deleteMedia = (id: string): void => {
  const media = loadMedia();
  const updatedMedia = media.filter(item => item.id !== id);
  saveMedia(updatedMedia);
};