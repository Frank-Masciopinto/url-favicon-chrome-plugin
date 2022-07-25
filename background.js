const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({[key]: val}),
    removeItems: keys => chrome.storage.local.remove(keys),
  };

  chrome.runtime.onInstalled.addListener(async (details) => {
    if(details.reason == "install"){ 
        let sign_up = chrome.runtime.getURL("html/settings.html")
        chrome.tabs.create({url:sign_up})
        console.log("ONINSTALL STORAGE SET UP")
        await LS.setItem("endpoint_url", null);
        await LS.setItem("url_whitelist", []);
        await LS.setItem("api_key", null);
        await LS.setItem("whitelist_on", false);
    }});