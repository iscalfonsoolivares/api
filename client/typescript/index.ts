import { router } from './utils/router';
import { secret } from './pages/secret/secret';

// Main Function

document.addEventListener("DOMContentLoaded", function(): void {

  // Breaking iframes

  if (window != window.top) {
      window.top.location = window.location;
  }
  console.log('# 1');
  // Executing route functions
  router.add('/secret', secret);
  // router.add('/index.html', home);

  router.run();

});


