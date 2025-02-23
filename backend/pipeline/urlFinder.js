import axios from "axios";

async function getOriginalUrl(redirectUrl) {
  try {
    await axios.get(redirectUrl, { maxRedirects: 0 });
    return redirectUrl;
  } catch (error) {
    if (error.response && error.response.status >= 300 && error.response.status < 400) {
      return error.response.headers.location;
    } else {
      throw error;
    }
  }
}

export { getOriginalUrl };
