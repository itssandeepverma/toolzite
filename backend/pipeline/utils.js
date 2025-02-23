/**
 * Generates a consistent public_id for Cloudinary.
 * Converts spaces to underscores and removes special characters.
 * Ensures the same public_id format across all files.
 */
export function generatePublicId(name) {
    return `toolzite/products/${name.toLowerCase().replace(/\s/g, "_")}`;
  }
  
  