// /**
//  * Centralized image URL utility for XAMPP backend
//  * Handles image paths from the API and converts them to proper URLs
//  */

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost/api";

// /**
//  * Convert image path from database to full URL
//  * @param {string} imagePath - Path from database (e.g., "uploads/blueprints/image.jpg" or "image.jpg")
//  * @returns {string} Full URL to the image
//  */
// export const getImageUrl = (imagePath) => {
//   // Return placeholder if no image
//   if (!imagePath) {
//     return "https://via.placeholder.com/400x300/0D0D0D/FFD000?text=No+Image";
//   }

//   // If already a full URL (http/https), return as is
//   if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//     return imagePath;
//   }

//   // If base64 data URL, return as is
//   if (imagePath.startsWith('data:')) {
//     return imagePath;
//   }

//   // Remove leading slash if present
//   const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;

//   // If path already starts with "uploads/", use it directly
//   if (cleanPath.startsWith('uploads/')) {
//     return `${API_BASE}/${cleanPath}`;
//   }

//   // Otherwise, assume it's in uploads folder
//   return `${API_BASE}/uploads/${cleanPath}`;
// };

// /**
//  * Extract images array from property object
//  * Handles different formats: array, comma-separated string, or single image
//  * @param {object} property - Property object from API
//  * @returns {array} Array of image paths
//  */
// export const getPropertyImages = (property) => {
//   if (!property) return [];

//   // Check images field (array)
//   if (Array.isArray(property.images) && property.images.length > 0) {
//     return property.images;
//   }

//   // Check images field (comma-separated string)
//   if (typeof property.images === 'string' && property.images.trim()) {
//     return property.images.split(',').map(img => img.trim()).filter(Boolean);
//   }

//   // Check image field (array)
//   if (Array.isArray(property.image) && property.image.length > 0) {
//     return property.image;
//   }

//   // Check image field (string)
//   if (typeof property.image === 'string' && property.image.trim()) {
//     return [property.image];
//   }

//   // Check heroImages field
//   if (Array.isArray(property.heroImages) && property.heroImages.length > 0) {
//     return property.heroImages;
//   }

//   // Check img field
//   if (property.img) {
//     return [property.img];
//   }

//   return [];
// };

// /**
//  * Get blueprints array from property object
//  * @param {object} property - Property object from API
//  * @returns {array} Array of blueprint paths
//  */
// export const getPropertyBlueprints = (property) => {
//   if (!property) return [];

//   if (Array.isArray(property.blueprints) && property.blueprints.length > 0) {
//     return property.blueprints;
//   }

//   if (typeof property.blueprints === 'string' && property.blueprints.trim()) {
//     return property.blueprints.split(',').map(bp => bp.trim()).filter(Boolean);
//   }

//   return [];
// };
