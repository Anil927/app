import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;


const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: defaultCache,
    fallbacks: {
        entries: [
            {
                url: '/offline', // the page that'll display if user goes offline
                matcher({ request }) {
                    return request.destination === 'document';
                },
            },
        ],
    },
});

serwist.addEventListeners();


// Function to show a notification
function showLocalNotification(title: string, body: string, swRegistration: ServiceWorkerRegistration) {
    const options = {
        body,
        icon: '/code/python.svg',
        badge: '/code/html-5.svg',
        data: {
            url: '/', // URL to open when notification is clicked
        },
        actions: [
            {
                action: "view-content",
                title: "Yes"
            },
            {
                action: "go-home",
                title: "No"
            }
        ]
    };
    swRegistration.showNotification(title, options);
}

// Notification Click Event
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    // React to the action.
    if (event.action === 'view-content') {
        console.log("view-content action was clicked");
    } else if (event.action === 'go-home') {
        console.log("go-home action was clicked");
    } else {
        console.log("main body of the notification was clicked");
    }
}, false);

// Handle messages from the client
self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'showNotification') {
        showLocalNotification(event.data.title, event.data.body, self.registration);
    }
});

self.addEventListener('push', (event) => {
    const data = event.data?.json();
    console.log(data);
    const options = {
        body: data.body,
        badge: '/code/python.svg',
        icon: '/code/html-5.svg',
        data: {
            url: '/',
        },
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

