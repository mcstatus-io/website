var MCSTATUS_API_BASE = 'https://api.mcstatus.io/v2';

(function (window, document) {
	var hosts = [];

	function onWindowLoad() {
		var statusElements = document.querySelectorAll('[data-mcstatus-status]');
		parseStatusElements(statusElements);

		var playersElements = document.querySelectorAll('[data-mcstatus-players]');
		parsePlayersElements(playersElements);

		var versionElements = document.querySelectorAll('[data-mcstatus-version]');
		parseVersionElements(versionElements);

		var motdElements = document.querySelectorAll('[data-mcstatus-motd]');
		parseMOTDElements(motdElements);

		var iconElements = document.querySelectorAll('img[data-mcstatus-icon]');
		parseIconElements(iconElements);

		fetchAllHosts();
	}

	function parseStatusElements(elems) {
		elems.forEach(function (elem) {
			var type = 'java';

			if (elem.hasAttribute('data-type')) {
				type = elem.getAttribute('data-type');

				if (['java', 'bedrock'].indexOf(type) < 0) return console.error('Unknown data-type with value \'' + type + '\'', elem);
			}

			var host = elem.getAttribute('data-host');
			if (!host || host.length < 1) return console.error('Element is missing \'data-host\' attribute', elem);

			var port = 25565;

			if (type === 'bedrock') {
				port = 19132;
			}

			if (elem.hasAttribute('data-port')) {
				var newPort = elem.getAttribute('data-port');

				port = parseInt(newPort);

				if (port < 0 || port > 65536) return console.error('data-port out of range with value \'' + port + '\'', elem);
				if (!Number.isInteger(port)) return console.error('data-port with non-integer value \'' + port + '\'', elem);
			}

			var loadingStyle = 'color: #292929';
			var onlineStyle = 'color: #2ecc71;';
			var offlineStyle = 'color: #ffcc22;';
			var loadingText = 'Loading...';
			var onlineText = 'Online';
			var offlineText = 'Offline';

			if (elem.hasAttribute('data-online-style')) {
				onlineStyle = elem.getAttribute('data-online-style');
			}

			if (elem.hasAttribute('data-offline-style')) {
				offlineStyle = elem.getAttribute('data-offline-style');
			}

			if (elem.hasAttribute('data-loading-style')) {
				loadingStyle = elem.getAttribute('data-loading-style');
			}

			if (elem.hasAttribute('data-online-text')) {
				onlineText = elem.getAttribute('data-online-text');
			}

			if (elem.hasAttribute('data-offline-text')) {
				offlineText = elem.getAttribute('data-offline-text');
			}

			if (elem.hasAttribute('data-loading-text')) {
				loadingText = elem.getAttribute('data-loading-text');
			}

			upsertHostElement(
				type,
				host,
				port,
				{
					type: 'status',
					elem,
					loadingStyle,
					onlineStyle,
					offlineStyle,
					loadingText,
					onlineText,
					offlineText
				}
			);
		});
	}

	function parsePlayersElements(elems) {
		elems.forEach(function (elem) {
			var type = 'java';

			if (elem.hasAttribute('data-type')) {
				type = elem.getAttribute('data-type');

				if (['java', 'bedrock'].indexOf(type) < 0) return console.error('Unknown data-type with value \'' + type + '\'', elem);
			}

			var host = elem.getAttribute('data-host');
			if (!host || host.length < 1) return console.error('Element is missing \'data-host\' attribute', elem);

			var port = 25565;

			if (type === 'bedrock') {
				port = 19132;
			}

			if (elem.hasAttribute('data-port')) {
				var newPort = elem.getAttribute('data-port');

				port = parseInt(newPort);

				if (port < 0 || port > 65536) return console.error('data-port out of range with value \'' + port + '\'', elem);
				if (!Number.isInteger(port)) return console.error('data-port with non-integer value \'' + port + '\'', elem);
			}

			var loadingStyle = '';
			var onlineStyle = '';
			var offlineStyle = '';
			var loadingText = 'Loading...';
			var offlineText = 'Offline';

			if (elem.hasAttribute('data-online-style')) {
				onlineStyle = elem.getAttribute('data-online-style');
			}

			if (elem.hasAttribute('data-offline-style')) {
				offlineStyle = elem.getAttribute('data-offline-style');
			}

			if (elem.hasAttribute('data-loading-style')) {
				loadingStyle = elem.getAttribute('data-loading-style');
			}

			if (elem.hasAttribute('data-offline-text')) {
				offlineText = elem.getAttribute('data-offline-text');
			}

			if (elem.hasAttribute('data-loading-text')) {
				loadingText = elem.getAttribute('data-loading-text');
			}

			upsertHostElement(
				type,
				host,
				port,
				{
					type: 'players',
					elem,
					loadingStyle,
					onlineStyle,
					offlineStyle,
					loadingText,
					offlineText
				}
			);
		});
	}

	function parseVersionElements(elems) {
		elems.forEach(function (elem) {
			var type = 'java';

			if (elem.hasAttribute('data-type')) {
				type = elem.getAttribute('data-type');

				if (['java', 'bedrock'].indexOf(type) < 0) return console.error('Unknown data-type with value \'' + type + '\'', elem);
			}

			var host = elem.getAttribute('data-host');
			if (!host || host.length < 1) return console.error('Element is missing \'data-host\' attribute', elem);

			var port = 25565;

			if (type === 'bedrock') {
				port = 19132;
			}

			if (elem.hasAttribute('data-port')) {
				var newPort = elem.getAttribute('data-port');

				port = parseInt(newPort);

				if (port < 0 || port > 65536) return console.error('data-port out of range with value \'' + port + '\'', elem);
				if (!Number.isInteger(port)) return console.error('data-port with non-integer value \'' + port + '\'', elem);
			}

			var loadingStyle = '';
			var onlineStyle = '';
			var offlineStyle = '';
			var loadingText = 'Loading...';
			var offlineText = 'Offline';

			if (elem.hasAttribute('data-online-style')) {
				onlineStyle = elem.getAttribute('data-online-style');
			}

			if (elem.hasAttribute('data-offline-style')) {
				offlineStyle = elem.getAttribute('data-offline-style');
			}

			if (elem.hasAttribute('data-loading-style')) {
				loadingStyle = elem.getAttribute('data-loading-style');
			}

			if (elem.hasAttribute('data-offline-text')) {
				offlineText = elem.getAttribute('data-offline-text');
			}

			if (elem.hasAttribute('data-loading-text')) {
				loadingText = elem.getAttribute('data-loading-text');
			}

			upsertHostElement(
				type,
				host,
				port,
				{
					type: 'version',
					elem,
					loadingStyle,
					onlineStyle,
					offlineStyle,
					loadingText,
					offlineText
				}
			);
		});
	}

	function parseMOTDElements(elems) {
		elems.forEach(function (elem) {
			var type = 'java';

			if (elem.hasAttribute('data-type')) {
				type = elem.getAttribute('data-type');

				if (['java', 'bedrock'].indexOf(type) < 0) return console.error('Unknown data-type with value \'' + type + '\'', elem);
			}

			var host = elem.getAttribute('data-host');
			if (!host || host.length < 1) return console.error('Element is missing \'data-host\' attribute', elem);

			var port = 25565;

			if (type === 'bedrock') {
				port = 19132;
			}

			if (elem.hasAttribute('data-port')) {
				var newPort = elem.getAttribute('data-port');

				port = parseInt(newPort);

				if (port < 0 || port > 65536) return console.error('data-port out of range with value \'' + port + '\'', elem);
				if (!Number.isInteger(port)) return console.error('data-port with non-integer value \'' + port + '\'', elem);
			}

			var loadingStyle = '';
			var onlineStyle = '';
			var offlineStyle = '';
			var loadingText = 'Loading...';
			var offlineText = 'Offline';

			if (elem.hasAttribute('data-online-style')) {
				onlineStyle = elem.getAttribute('data-online-style');
			}

			if (elem.hasAttribute('data-offline-style')) {
				offlineStyle = elem.getAttribute('data-offline-style');
			}

			if (elem.hasAttribute('data-loading-style')) {
				loadingStyle = elem.getAttribute('data-loading-style');
			}

			if (elem.hasAttribute('data-offline-text')) {
				offlineText = elem.getAttribute('data-offline-text');
			}

			if (elem.hasAttribute('data-loading-text')) {
				loadingText = elem.getAttribute('data-loading-text');
			}

			upsertHostElement(
				type,
				host,
				port,
				{
					type: 'motd',
					elem,
					loadingStyle,
					onlineStyle,
					offlineStyle,
					loadingText,
					offlineText
				}
			);
		});
	}

	function parseIconElements(elems) {
		elems.forEach(function (elem) {
			elem.setAttribute('src', MCSTATUS_API_BASE + '/icon/default');

			var type = 'java';

			if (elem.hasAttribute('data-type')) {
				type = elem.getAttribute('data-type');

				if (['java', 'bedrock'].indexOf(type) < 0) return console.error('Unknown data-type with value \'' + type + '\'', elem);
			}

			var host = elem.getAttribute('data-host');
			if (!host || host.length < 1) return console.error('Element is missing \'data-host\' attribute', elem);

			var port = 25565;

			if (type === 'bedrock') {
				port = 19132;
			}

			if (elem.hasAttribute('data-port')) {
				var newPort = elem.getAttribute('data-port');

				port = parseInt(newPort);

				if (port < 0 || port > 65536) return console.error('data-port out of range with value \'' + port + '\'', elem);
				if (!Number.isInteger(port)) return console.error('data-port with non-integer value \'' + port + '\'', elem);
			}

			upsertHostElement(
				type,
				host,
				port,
				{
					type: 'icon',
					elem
				}
			);
		});
	}

	function upsertHostElement(type, host, port, element) {
		var existingHost = hosts.filter(function (v) {
			return v.type === type && v.host === host && v.port === port;
		});

		if (existingHost.length > 0) {
			hosts[hosts.indexOf(existingHost[0])].elements.push(element);
		} else {
			hosts.push({
				type,
				host,
				port,
				previousResponse: null,
				elements: [
					element
				]
			});
		}
	}

	function fetchAllHosts() {
		hosts.forEach(function (elem) {
			fetchHost(elem);
		});
	}

	function fetchHost(elem) {
		if (!elem.previousResponse) {
			elem.elements.forEach(function (e) {
				updateElem(e, null);
			});
		}

		var req = new XMLHttpRequest();

		req.addEventListener('load', function () {
			if (req.status === 200) {
				var body = JSON.parse(req.responseText);

				elem.previousResponse = body;

				elem.elements.forEach(function (e) {
					updateElem(e, body);
				});

				setTimeout(function () {
					fetchHost(elem);
				}, 1000 * 60);
			} else {
				console.error('Failed to fetch server status', elem);
			}
		});

		req.open('GET', MCSTATUS_API_BASE + '/status/' + elem.type + '/' + elem.host + ':' + elem.port);
		req.send();
	}

	function updateElem(elem, status) {
		var styleAttribute;
		var content;

		if (elem.type === 'status') {
			styleAttribute = elem.loadingStyle;
			content = elem.loadingText;

			if (status) {
				styleAttribute = elem.offlineStyle;
				content = elem.offlineText;

				if (status.online) {
					styleAttribute = elem.onlineStyle;
					content = elem.onlineText;
				}
			}

			elem.elem.setAttribute('style', styleAttribute);
			elem.elem.innerText = content;
		} else if (elem.type === 'players') {
			styleAttribute = elem.loadingStyle;
			content = elem.loadingText;

			if (status) {
				styleAttribute = elem.offlineStyle;
				content = elem.offlineText;

				if (status.online) {
					styleAttribute = elem.onlineStyle;
					content = status.players.online + '/' + status.players.max;
				}
			}

			elem.elem.setAttribute('style', styleAttribute);
			elem.elem.innerText = content;
		} else if (elem.type === 'version') {
			styleAttribute = elem.loadingStyle;
			content = elem.loadingText;

			if (status) {
				styleAttribute = elem.offlineStyle;
				content = elem.offlineText;

				if (status.online) {
					styleAttribute = elem.onlineStyle;
					content = status.version.name_clean;
				}
			}

			elem.elem.setAttribute('style', styleAttribute);
			elem.elem.innerText = content;
		} else if (elem.type === 'motd') {
			styleAttribute = elem.loadingStyle;
			content = elem.loadingText;

			if (status) {
				styleAttribute = elem.offlineStyle;
				content = elem.offlineText;

				if (status.online) {
					styleAttribute = elem.onlineStyle;
					content = status.motd.html;
				}
			}

			elem.elem.setAttribute('style', styleAttribute);
			elem.elem.innerHTML = content;
		} else if (elem.type === 'icon') {
			var src = MCSTATUS_API_BASE + '/icon/default';

			if (status && status.online && status.icon) {
				src = status.icon;
			}

			elem.elem.setAttribute('src', src);
		} else {
			console.error('Unknown element in list', elem);
		}
	}

	if (document.readyState === 'complete') {
		onWindowLoad();
	} else {
		window.addEventListener('load', onWindowLoad);
	}
})(window, document);