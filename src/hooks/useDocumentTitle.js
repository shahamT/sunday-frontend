import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useDocumentTitle(customTitle) {
  const location = useLocation();

  useEffect(() => {
    if (customTitle) {
      document.title = customTitle;
      return;
    }

    const path = location.pathname;

    let title = 'sunday'; // default title

    switch (true) {

        case path === '/home':
          title = 'sunday.com Work Platform';
          break;
        case path === '/about':
          title = 'sunday - About';
          break;

      case path === '/login':
        title = 'sunday - Login';
        break;
      case path === '/signup':
        title = 'sunday - Signup';
        break;


      case path === '/app/home':
        title = 'sunday - Home';
        break;

      default:
        title = 'sunday';
    }

    document.title = title;
  }, [customTitle, location.pathname]);
}


// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export function useDocumentTitle(customTitle) {
//   const location = useLocation();

//   useEffect(() => {
//     const path = location.pathname;

//     let title = 'sunday'; // default title
//     let favicon = '/favicon-default.ico'; // default favicon

//     if (customTitle) {
//       document.title = customTitle;
//     } else {
//       switch (true) {
//         case path === '/home':
//           title = 'sunday.com Work Platform';
//           favicon = '/favicon-home.ico';
//           break;

//         case path === '/about':
//           title = 'sunday - About';
//           favicon = '/favicon-about.ico';
//           break;

//         case path === '/login':
//           title = 'sunday - Login';
//           favicon = '/favicon-login.ico';
//           break;

//         case path === '/signup':
//           title = 'sunday - Signup';
//           favicon = '/favicon-signup.ico';
//           break;

//         case path === '/app/home':
//           title = 'sunday - Home';
//           favicon = '/favicon-app.ico';
//           break;

//         default:
//           title = 'sunday';
//           favicon = '/favicon-default.ico';
//       }

//       document.title = title;
//     }

//     const existingLink = document.querySelector("link[rel~='icon']");
//     if (existingLink) {
//       existingLink.href = favicon;
//     } else {
//       const link = document.createElement('link');
//       link.rel = 'icon';
//       link.href = favicon;
//       document.head.appendChild(link);
//     }
//   }, [customTitle, location.pathname]);
// }
