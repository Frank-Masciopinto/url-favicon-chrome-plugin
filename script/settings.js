console.log("URL Plugin -> settings.js injected");

const LS = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({[key]: val}),
    removeItems: keys => chrome.storage.local.remove(keys),
  };

let LS_endpoint_url;
let LS_url_whitelist;
let LS_api_key;
let LS_whitelist_on;
let FORM_endpoint_url = document.getElementsByClassName("url")[0];
let FORM_api_key = document.getElementsByClassName("token")[0];
let FORM_url_whitelist = document.getElementsByClassName("whitelist")[0];
let FORM_btn_WL_ON = document.getElementsByClassName("WL-ON")[0];
let FORM_btn_WL_OFF = document.getElementsByClassName("WL-OFF")[0];

//Get and update form input with local storage settings
async function getLocalSettings() {
	LS_endpoint_url = await LS.getItem(CONST_endpoint_url)
	LS_url_whitelist = await LS.getItem(CONST_url_whitelist);
	LS_api_key = await LS.getItem(CONST_api_key);
	LS_whitelist_on = await LS.getItem(CONST_whitelist_on);
	FORM_endpoint_url.value = LS_endpoint_url;
	FORM_api_key.value = LS_api_key;
	FORM_url_whitelist.value = LS_url_whitelist;
	if (LS_whitelist_on) {
		console.log("Whitelist is ON");
		FORM_btn_WL_ON.classList.add("LS_Active");
	}
	else {
		FORM_btn_WL_OFF.classList.add("LS_Active");
	}


}
getLocalSettings()

//Save settings as they get typed into the form
FORM_endpoint_url.addEventListener('change', async (event) => {
	await LS.setItem(CONST_endpoint_url, FORM_endpoint_url.value);
})
FORM_api_key.addEventListener('change', async (event) => {
	await LS.setItem(CONST_api_key, FORM_api_key.value);
})
FORM_url_whitelist.addEventListener('change', async (event) => {
	await LS.setItem(CONST_url_whitelist, FORM_url_whitelist.value);
})

async function add_additional_toggle_event_listener(toggle, memory_name, position) {
    toggle.addEventListener("change", async () => {
        if (position == "ON") {
            await LS.setItem(memory_name, "OFF")
            let new_position = "OFF"
            add_additional_toggle_event_listener(toggle, memory_name, new_position)
        }
        else {
            await LS.setItem(memory_name, "ON")
            let new_position = "ON"
            add_additional_toggle_event_listener(toggle, memory_name, new_position)
        }
    })
}


//Event handlers for whitelist activation buttons
FORM_btn_WL_ON.addEventListener("click", () => {
	if (FORM_btn_WL_ON.className.includes("LS_Active")) {
		console.log("Deactivating...");
		await LS.setItem(CONST_whitelist_on, false)
		FORM_btn_WL_ON.className.remove("LS_Active")
		FORM_btn_WL_OFF.className.add("LS_Active")
	}
	else {
		console.log("Activating...");
		await LS.setItem(CONST_whitelist_on, true)
		FORM_btn_WL_ON.className.add("LS_Active")
		FORM_btn_WL_OFF.className.remove("LS_Active")
	}
})
FORM_btn_WL_OFF.addEventListener("click", () => {
	console.log(document.getElementsByClassName("WL-OFF")[0]);
	if (FORM_btn_WL_OFF.className.includes("LS_Active")) {
		console.log("Active");
	}
})
