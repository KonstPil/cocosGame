let GameLayer = cc.Layer.extend({
  ctor() {
    this._super();
    this.init();
  },

  init() {
    this._super();
    //размер окна
    let size = cc.director.getWinSize();

    let bgSprite = cc.Sprite.create(res.BG_IMAGE);//спрайт это картинка 
    bgSprite.setPosition(size.width / 2, size.height / 2);
    this.addChild(bgSprite, 0);//z-index для слоя 

    //задаем через this т.к в дальнейшем будем использовать 
    this._floor = cc.Sprite.create(res.FLOOR_IMAGE);
    this._floor.setPosition(0, 0);
    this._floor.setAnchorPoint(0, 0);
    this.addChild(this._floor, zIndexFloor);


  },

  onEnter() {
    this._super();
  },


})

GameLayer.scene = function () {
  let scene = new cc.Scene();
  let layer = new GameLayer();
  scene.addChild(layer);
  return scene;
}


window.onload = function () {
  let targetWidth = 800;
  let targetHeight = 450;
  cc.game.onStart = function () {
    //resize window
    cc.view.adjustViewPort(false);
    cc.view.setDesignResolutionSize(targetWidth, targetHeight, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload([res.BG_IMAGE, res.FLOOR_IMAGE], function () {
      cc.director.runScene(GameLayer.scene());
    }, this);
  };
  cc.game.run("gameCanvas");
};