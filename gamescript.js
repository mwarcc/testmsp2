var isUserReady = false;
var isGameLoaded = false;
var gameStarted = false;
var clickedGiftVip = false;
var gameInstance = null;

window.addEventListener('nebulaInitialized', (e) => {
  nebula.gameSize.registerExitFullscreen(fullscreenExit);
  window.requestFullscreen = nebula.gameSize.requestFullscreen;
  window.addEventListener('progressBarDone', () => progressBarDone());
  
  window.addEventListener("unityLoaded", (e) =>
  {
    gameInstance = e.detail.instance
  });

  $('#fullScreenButton').on('click', fullscreenButtonClicked);
  $('#playButton').on('click', playButtonClicked);
  $('#giftVipButton').on('click', giftVipButtonClicked);
});

function fullscreenButtonClicked() {
  nebula.gameSize.requestFullscreen();
  $('#fullScreenButton').hide();
}
function fullscreenExit() {
  $('#fullScreenButton').show();
}

function playButtonClicked() {
  isUserReady = true;
  nebula.playClicked();
  $('#overlay').remove();
  $('#splash-content').remove();
  document.getElementById("unity-canvas").style.zIndex = "0";
  document.getElementById("loadScreen").style.zIndex = "0";

  if(isGameLoaded)
  {
    startGame();
  }
}

function giftVipButtonClicked() {
  clickedGiftVip = true;
  $('#overlay').remove();
  $('#splash-content').remove();

  var unityCanvas = document.getElementById("unity-canvas");
  var loadScreen = document.getElementById("loadScreen");

  if (unityCanvas) {
    unityCanvas.style.zIndex = "0";
  }

  if (loadScreen) {
    loadScreen.style.zIndex = "0";
  }

  StartOnGiftVipScreen();
}

function StartOnGiftVipScreen() 
{
  if (isGameLoaded && gameInstance != null)
  {
    gameInstance.SendMessage('Runner', 'GiftVipClicked');
    nebula.removeUI();
    startGame();
  }
}

function progressBarDone(){
  isGameLoaded = true;
  $('#loadScreen').remove();

  if (clickedGiftVip) {
   StartOnGiftVipScreen();
  }
  else if(isUserReady)
  {
    startGame();
  }
}

function startGame() {
  if (!gameStarted) 
  {
    gameStarted = true;
    nebula.gameStarted();
    window.addEventListener('beforeunload', (e) => nebula.showBrowserClosePopup(e));
  }
}
