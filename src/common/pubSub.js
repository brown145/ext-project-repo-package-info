import browser from './browser';

const registered = {};
const registerListener = (type, func, options) => {
	registered[type] = { func, options };
};

browser.runtime.onMessage.addListener(
	(request, sender, sendResponse) => {
		const registeredEvent = registered[request.type];
		if (registeredEvent) {
			if (registeredEvent.options.async) {
				registeredEvent.func(request.options).then(sendResponse);
				return true;
			} else {
				sendResponse(registeredEvent.func(request.options));
			}
		} else {
			sendResponse({ errorMessage: 'you messed up, dude.' });
		}
	}
);

export default {
	add: registerListener
};
