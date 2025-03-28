window.addEventListener("load", (event) => {
    const canvas = document.querySelector("#unity-canvas");
	window.addEventListener("unityLoaded", (e) => 
	{
		window.gameInstance = e.detail.instance;
	});

	window.loadGame(canvas);
});

window.loadGame = function(canvas, prefix =""){
	if(prefix.length>0 && !prefix.endsWith("/"))
	{
		prefix += "/";
	}

	var buildUrl = "Build/1258";
	var loaderUrl = prefix + buildUrl + "/MSP2.loader.js";

	const config = {
		dataUrl: prefix + buildUrl + "/MSP2.data.unityweb",
		frameworkUrl: prefix + buildUrl + "/MSP2.framework.js.unityweb",
		codeUrl: prefix + buildUrl + "/MSP2.wasm.unityweb",
				streamingAssetsUrl: prefix + "StreamingAssets",
		companyName: "MovieStarPlanet",
		productName: "MovieStar 2",
		productVersion: "2.6.2",
	};

	var script = document.createElement('script');
	script.src = loaderUrl;
	script.onload = () => {
		// code for instantiating the build
		createUnityInstance(canvas, config, (progress) => {
			window.dispatchEvent(new CustomEvent('unityProgress', {detail:{progress:progress}}));
			console.log("progress " + progress);
		}).then((unityInstance) => {
			window.dispatchEvent(new CustomEvent('unityLoaded', {detail:{instance:unityInstance}}));
		}).catch((message) => {
			alert(message);
		});
	};

	document.body.appendChild(script);
}
