

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
    this._robin.Reset();
    this._robin.topOfScreen = size.height;
    this.addChild(this._robin, zIndexRobin);//z-index для слоя 

    this.CreateClouds();
  },

  onEnter() {
    this._super();

    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: this.onTouchBegan,
    }, this)

    this.schedule(this.onTick)
  },

  onTick(dt) {
    if (this._robin.y < this._floor.y / 2) {
      this._robin.Reset();
      this.StopClouds();
      this._robin.y = cc.director.getWinSize().height / 2;
    }
    this._robin.UpdateRobin(dt)
  },


  onTouchBegan(touch, event) {//при изменение размера экрана числовые значения на поле не будут менятся
    let target = event.getCurrentTarget();
    if (target._robin.state === robbinStateStopped) {
      target._robin.state = robbinStateMoving;
      target.StartClouds();
    }
    target._robin.SetStartSpeed()
    return true//если ставим true то дальше бдует считывать onTouchMoved и onTouchEnded, если false-нет
  },

  AddCloud(speed, position, scale, zIndex, name, XOffset) {
    let screenSize = cc.director.getWinSize();
    let cloud = new CloudSprite(name);
    cloud.SetSpeedAndWidth(speed, screenSize.width, XOffset);
    cloud.x = position.x;
    cloud.y = position.y;
    cloud.setScale(scale);
    this.addChild(cloud, zIndex);
    ArrayClouds[ArrayClouds.length] = cloud;
  },

  CreateClouds() {
    let FileName = res.CLOUD_IMAGE;

    this.AddCloud(kCloudSpeedSlow, cc.p(600, 510), kCloudScaleSlow, kZindexCloudSlow, FileName, kCloudRestartX);
    this.AddCloud(kCloudSpeedSlow, cc.p(150, 570), kCloudScaleSlow, kZindexCloudSlow, FileName, kCloudRestartX);

    this.AddCloud(kCloudSpeedFast, cc.p(150, 300), kCloudScaleFast, kZindexCloudFast, FileName, kCloudRestartX);
    this.AddCloud(kCloudSpeedFast, cc.p(400, 500), kCloudScaleFast, kZindexCloudFast, FileName, kCloudRestartX);
    this.AddCloud(kCloudSpeedFast, cc.p(880, 400), kCloudScaleFast, kZindexCloudFast, FileName, kCloudRestartX);

    FileName = res.MOUNT_IMAGE;
    this.AddCloud(kMountSpeed, cc.p(300, 170), kMountScale, kZindexMount, FileName, kMountRestartX);
    this.AddCloud(kMountSpeed, cc.p(800, 170), kMountScale, kZindexMount, FileName, kMountRestartX);

    FileName = res.TREE_IMAGE;
    this.AddCloud(kTreeSpeed, cc.p(128, 72), kTreeScale, kZindexTree, FileName, kCloudRestartX);
    this.AddCloud(kTreeSpeed, cc.p(624, 72), kTreeScale, kZindexTree, FileName, kCloudRestartX);
    this.AddCloud(kTreeSpeed, cc.p(864, 72), kTreeScale, kZindexTree, FileName, kCloudRestartX);
  },

  StartClouds() {
    for (let i = 0, len = ArrayClouds.length; i < len; ++i) {
      ArrayClouds[i].Start();
    }
  },

  StopClouds() {
    for (let i = 0, len = ArrayClouds.length; i < len; ++i) {
      ArrayClouds[i].Stop();
    }
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
    cc.LoaderScene.preload(g_resources, function () {
      cc.director.runScene(GameLayer.scene());
    }, this);
  };
  cc.game.run("gameCanvas");
};