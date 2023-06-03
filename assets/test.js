// First thing first, we're writing in javascript a way to handle routes.
// Routes can have parameters.
// A route should be in the form:
// "/", "/contact", "/about/job"
// For the last two, the variant is also used:
// "/contact/", "/about/job/"
// All routes can have parameters written like so:
// "/app/:userId/mail" => There's 1 parameter
// "/app/:userId/:targetId/contact" => There's 2 parameters
// Only the last parameter in the route can be optional:
// "/app/shop-list/:add?"
// When optional, all the following routes should exist:
// "/app/shop-list", "/app/shop-list/", "/app/shop-list/:add"
// Finally, it should support locales for translation like so:
// "/" is either: "/", "/fr/" or "/en/"
// "/about" is either: "/about", "/fr/about" or "/en/about"
// "/contact" is either: "/contact", "/fr/contact" or "/en/contact"
// "/app/:adminId/dashboard" is either: "/app/:adminId/dashboard", "/fr/app/:adminId/dashboard" or "/en/app/:adminId/dashboard"
// "/app/blog/:page?" is either: "/app/blog/:page?", "/fr/app/blog/:page?" or "/en/app/blog/:page?"
// Now that you know the rules for the routes, let's jump right into the code.

// Assuming you have an array of routes with parameters
const routes = [
  "/",
  "/job/:id",
  "/about",
  "/contact",
  "/app/:adminId/dashboard",
  "/app/blog/:page?"
];

const locales = [
  "en",
  "fr"
];

function getCurrentRoute(path, routes, locales) {
  const routeWithoutLocale = removeLocaleFromPath(path, locales);
  console.log("Route without locale:", routeWithoutLocale);
  const matchingRoute = findMatchingRoute(routeWithoutLocale, routes);

  if (!matchingRoute) {
    return null;
  }
  console.log("Matching route:", matchingRoute);

  const parameterValues = extractParameterValues(path, matchingRoute);
  console.log("Parameters:", parameterValues);
  const resolvedRoute = replaceParametersWithValues(matchingRoute, parameterValues);
  console.log("Resolved route:", resolvedRoute);
  return resolvedRoute;
}

function removeLocaleFromPath(path, locales) {
  const localeRegex = new RegExp(`^/(?:${locales.join('|')})`);
  return path.replace(localeRegex, '');
}

function findMatchingRoute(path, routes) {
  for (const route of routes) {
    const routeRegex = new RegExp(`^${route.replace(/\/:\w+\?$/, '/([^/]+)?')}$`);
    if (routeRegex.test(path)) {
      return route;
    }
  }
  return null;
}

function extractParameterValues(path, route) {
  const parameterNames = route.match(/\/:\w+\??/g) || [];
  const parameterValues = {};

  const pathSegments = path.split('/').filter(segment => segment !== '');
  const routeSegments = route.split('/').filter(segment => segment !== '');

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];
    if (routeSegment.startsWith(':')) {
      const paramName = routeSegment.slice(1, -1);
      const paramValue = pathSegments[i];
      parameterValues[paramName] = paramValue || null;
    }
  }

  return parameterValues;
}

function replaceParametersWithValues(route, parameterValues) {
  let resolvedRoute = route;

  for (const paramName in parameterValues) {
    resolvedRoute = resolvedRoute.replace(`:${paramName}`, parameterValues[paramName] || '');
  }

  return resolvedRoute;
}



// All tests should be true.
console.log("1)", getCurrentRoute("/", routes, locales) === "/");
console.log("2)", getCurrentRoute("/about", routes, locales) === "/about");
console.log("3)", getCurrentRoute("/about/", routes, locales) === "/about");
console.log("4)", getCurrentRoute("/fr/job", routes, locales) !== "/job/:id");
console.log("5)", getCurrentRoute("/fr/job/", routes, locales) === "/job/:id");
console.log("5)", getCurrentRoute("/fr/job/o3w21154wdowjgho", routes, locales) === "/job/:id");
console.log("6)", getCurrentRoute("/en/about/", routes, locales) === "/about");
console.log("7)", getCurrentRoute("/fr/about/", routes, locales) === "/about");
console.log("8)", getCurrentRoute("/us/about/", routes, locales) !== "/about");
console.log("9)", getCurrentRoute("/app//dashboard", routes, locales) === "/app/:adminId/dashboard");
console.log("10)", getCurrentRoute("/fr/app//dashboard", routes, locales) === "/app/:adminId/dashboard");
console.log("11)", getCurrentRoute("/en/app/blog/how", routes, locales) === "/app/blog/:page?");
console.log("12)", getCurrentRoute("/app/blog", routes, locales) === "/app/blog/:page?");
console.log("13)", getCurrentRoute("/app/blog/", routes, locales) === "/app/blog/:page?");
console.log("14)", getCurrentRoute("/app/blog/3", routes, locales) === "/app/blog/:page?");
console.log("15)", getCurrentRoute("/uk/app/blog/3", routes, locales) !== "/app/blog/:page?");