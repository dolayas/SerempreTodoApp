const register = async () =>
{
    const { serviceWorker } = navigator

    if ( serviceWorker === null || serviceWorker === undefined )
        return console.warn ("Service Worker : service worker is not supported by browser!")

    const { Workbox } = await import ("workbox-window")

    const workbox = new Workbox ("./service-worker.js")

    workbox.register ({ immediate : true })
}

const unregister = async () =>
{
    const { serviceWorker } = navigator

    if ( serviceWorker === null || serviceWorker === undefined )
        return console.warn ("Service Worker : service worker is not supported by browser!")

    const serviceWorkerRegistration = await serviceWorker.getRegistration ("./service-worker.js")

    return serviceWorkerRegistration && serviceWorkerRegistration.unregister ()
}

const ServiceWorker =
{
    register,
    unregister
}

export { ServiceWorker }