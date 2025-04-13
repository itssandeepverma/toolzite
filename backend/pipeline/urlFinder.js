import axios from "axios";

async function getOriginalUrl(redirectUrl) {
  try {
    await axios.get(redirectUrl, { maxRedirects: 0 });
    return stripQuery(redirectUrl);
  } catch (error) {
    if (error.response && error.response.status >= 300 && error.response.status < 400) {
      const finalUrl = error.response.headers.location;
      return stripQuery(finalUrl);
    } else {
      throw error;
    }
  }
}

// Remove everything after "?" including the "?" itself
function stripQuery(url) {
  return url.split("?")[0];
}

export { getOriginalUrl };
