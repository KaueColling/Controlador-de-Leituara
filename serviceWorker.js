var cacheTeste = 'teste-v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheTeste).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/images/icon.ico',
                '/FotoPerfil.jpg',
                '/vite.svg',
                '/manifest.json',
                '/serviceWorker.js',
                '/src/components/Livro/index.jsx',
                '/src/components/Livro/livro.css',
                '/src/components/Config/index.jsx',
                '/src/components/Config/config.css',
                '/src/components/Pefil/index.jsx',
                '/src/components/Perfil/iperfil.css',
                '/src/components/App.css',
                '/src/components/App.jsx',
                '/src/components/index.css',
                '/src/components/main.jsx',
                '/serviceWorker.js',
                '/package.md',
                '/package-lock.json',
                '/vit.config.js',
                '/.eslintrc.cjs'
            ]);
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});
