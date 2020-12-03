import { router } from './utils/router';
import { home } from './pages/home/home';

// Main Function

document.addEventListener("DOMContentLoaded", function(): void {

  // Breaking iframes

  if (window != window.top) {
      window.top.location = window.location;
  }
  console.log('# 1');
  // Executing route functions
  router.add('/secret', home);
  // router.add('/index.html', home);

  router.run();

});


