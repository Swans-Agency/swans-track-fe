import Router from 'next/router';
import NProgress from 'nprogress';

let timer;
let state;
let activeRequests = 0;
const delay = 250;

const excludedUrls = ['/swans-track', '/shared-profile']; // Add URLs to exclude here

function shouldLoadProgress(url) {
    // Check if the URL is in the list of excluded URLs
    return !excludedUrls.some(excludedUrl => url.startsWith(excludedUrl));
}

function load() {
    const currentUrl = Router.asPath;

    if (state === 'loading' || !shouldLoadProgress(currentUrl)) {
        return;
    }

    state = 'loading';

    timer = setTimeout(function () {
        NProgress.start();
    }, delay); // Delay the progress bar display for better UX
}

function stop() {
    if (activeRequests > 1 || state !== 'loading') {
        return;
    }

    state = 'stop';

    clearTimeout(timer);
    NProgress.done();
}

Router.events.on('routeChangeStart', load);
Router.events.on('routeChangeComplete', stop);
Router.events.on('routeChangeError', stop);
Router.events.on('beforeHistoryChange', load);
Router.events.on('hashChangeStart', load);
Router.events.on('hashChangeComplete', stop);

export default function Progress() {
    return null;
}
