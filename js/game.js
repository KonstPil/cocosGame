var GameLayer = cc.Layer.extend({
	ctor:function() {
		this._super();
		this.init();
	},
	init:function() {
		this._super();
		var size = cc.director.getWinSize();
		
		
		var label = cc.LabelTTF.create("Hello World", "Arial", 40);
	    label.setPosition(size.width / 2, size.height / 2);
	    this.addChild(label, 1);
		
		var sprite = cc.Sprite.create("images/HelloWorld.png");
		sprite.setPosition(size.width / 2, size.height / 2);
		sprite.setScale(0.5);
		this.addChild(sprite, 0);
		
	},
	onEnter:function() {
		this._super();
	}

});

GameLayer.scene = function() {
	var scene = new cc.Scene();
	var layer = new GameLayer();
	scene.addChild(layer);
	return scene;
}

window.onload = function(){
	  cc.game.onStart = function(){
		  //load resources
		  cc.LoaderScene.preload(["images/HelloWorld.png"], function () {                  
		   cc.director.runScene(GameLayer.scene());
		  }, this);
	  };
	  cc.game.run("gameCanvas");
  };
		  
		  
		  
		  
		  