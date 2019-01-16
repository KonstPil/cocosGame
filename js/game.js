let GameLayer = cc.Layer.extend({
  ctor() {
    this._super();
    this.init();
  },

  init() {
    this._super();
    //размер окна
    let size = cc.director.getWinSize();

    let sprite = cc.Sprite.create("images/HelloWorld.png");//спрайт это картинка 
    sprite.setPosition(size.width / 2, size.height / 2);
    sprite.setScale(0.8);
    this.addChild(sprite, 0);//0 это z-index для слоя 

    let label = cc.LabelTTF.create("Hello World", "Arial", 40);//надпись 
    label.setPosition(size.width / 2, size.height / 2);
    this.addChild(label, 1);

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
  cc.game.onStart = function () {
    //load resources
    cc.LoaderScene.preload(["images/HelloWorld.png"], function () {
      cc.director.runScene(GameLayer.scene());
    }, this);
  };
  cc.game.run("gameCanvas");
};