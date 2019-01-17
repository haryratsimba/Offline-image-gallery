self.addEventListener('install', event=> {
    console.log('Installing sw')
})

self.addEventListener('activate', event=> {
	return self.clients.claim();
});

self.addEventListener('fetch', event=> {
	console.log('try to fetch :', event.request.url)
});