// src/serviceWorkerRegistration.js

// This code comes straight from a fresh CRA `serviceWorkerRegistration.js`
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/
      )
  );
  
  export function register(config) {
    // ... CRA’s default register logic (you can leave this empty if you just want unregister) ...
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(registrations => {
          for (let registration of registrations) {
            registration.unregister();
          }
        })
        .catch(console.error);
    }
  }
  