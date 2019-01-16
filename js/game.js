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

    this._robin = new RobinSprite(res.ROBIN_IMAGE);
    this._robin.setPosition(robinStartX, size.height / 2);
    this.addChild(this._robin, zIndexRobin);//z-index для слоя 
  },

  onEnter() {
    this._super();

    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: this.onTouchBegan,
      onTouchMoved: this.onTouchMoved,
      onTouchEnded: this.onTouchEnded
    }, this)
  },

  onTouchBegan(touch, event) {//при изменение размера экрана числовые значения на поле не будут менятся
    let tp = touch.getLocation();//touchPoint
    return true//если ставим true то дальше бдует считывать onTouchMoved и onTouchEnded, если false-нет
  },

  onTouchMoved(touch, event) {
    let tp = touch.getLocation();//touchPoint
  },

  onTouchEnded(touch, event) {
    let tp = touch.getLocation();//touchPoint
  }



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