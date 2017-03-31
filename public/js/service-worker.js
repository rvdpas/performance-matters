self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("funda-v1-core")
      .then( function (cache) {
        return cache.addAll(
          [
            "/css/styles.css",
            "/img/g-zip.png",
            "/img/critical-css.png",
            "/img/fundawonen-logo.svg",
            "/img/start.png"
          ]
        );
      })
      .then(function () {
       return self.skipWaiting();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) { return cachePage(request, response)})
        .catch(function (err) { return getCachedPage(request)})
        .catch(function (err) { return fetchCoreFile("/offline/")})
    );
      } else {
      event.respondWith(
        fetch(request)
          .catch(function (err) { return fetchCoreFile(request.url)})
          .catch(function (err) { return fetchCoreFile("/offline/")})
      );
    }
});

function fetchCoreFile(url) {
  return caches.open("funda-v1-core")
      .then(function (cache) { return cache.match(url)})
      .then(function (response) { return  response ? response : Promise.reject()});
}

function getCachedPage(request) {
  return caches.open("funda-v1-pages")
      .then(function (cache) { return cache.match(request)})
      .then(function (response) { return response ? response : Promise.reject()});
}

function cachePage(request, response) {
  var clonedResponse = response.clone();
  caches.open("funda-v1-pages")
    .then(function (cache) { return cache.put(request, clonedResponse)});
  return response;
}
