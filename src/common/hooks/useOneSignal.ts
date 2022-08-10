import getConfig from "next/config"

// Add publicRuntimeConfig: { oneSignalAppId: ... } to next.config.js
const { publicRuntimeConfig } = getConfig();

export const initOneSignal = (): void => {
    // react-onsignal tries to use a global `document` variable, so we can only
    // use it in the client side. Luckily this method doesn't trigger any "wrong
    // number of hooks" errors either.
    if (!process.browser) return;
    
    const imported = require("react-onesignal");
    const OneSignal = imported.default;

    OneSignal.init({ appId: publicRuntimeConfig?.oneSignalAppId }).then(() => {
        OneSignal.showSlidedownPrompt({ force: true });
    });
};