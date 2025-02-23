const extractPublicId = (fileUrl) => {
    try {
      // Decode URL in case there are spaces or special characters
      const decodedUrl = decodeURIComponent(fileUrl);
  
      // Extract part after `/upload/`
      const urlParts = decodedUrl.split("/upload/");
  
      if (urlParts.length < 2) {
        throw new Error("Invalid Cloudinary URL format.");
      }
  
      // Remove any versioning (e.g., `v1739726584/`)
      let publicId = urlParts[1].split("/").slice(1).join("/"); 
  
      // Remove file extension if present
      publicId = publicId.replace(/\.[^/.]+$/, ""); 
  
      return publicId;
    } catch (error) {
      console.error("Error extracting public ID:", error);
      return null;
    }
  };
  
  // ✅ **Test the function**
  const fileUrl = "https://res.cloudinary.com/dn3nlbjux/image/upload/v1739737104/toolzite/bing.png";
  
  console.log(extractPublicId(fileUrl)); 
  // Expected Output: "toolzite/AI Agent/devin"
  