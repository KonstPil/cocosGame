let RobinSprite = cc.Sprite.extend( {

	state: robbinStateStopped,
	speedY: 0.0,
	topOfScreen: 0,
	
	ctor: function (spriteFrameName) {
		this._super(spriteFrameName);
	},
	
	UpdateRobin: function(dt) {
		
	},
	
	Reset: function() {
	},
	
	SetStartSpeed: function() {
	},
	
	TubeCollisionBox: function() {
	}

});