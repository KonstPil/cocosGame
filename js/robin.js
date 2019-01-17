let RobinSprite = cc.Sprite.extend({

	state: robbinStateStopped,
	speedY: 0.0,
	topOfScreen: 0,

	ctor(spriteFrameName) {
		this._super(spriteFrameName);
	},

	UpdateRobin(dt) {
		if (this.state === robbinStateMoving) {
			let distance = 0;
			let newSpeed = 0;
			distance = this.speedY * dt;
			newSpeed = this.speedY + GRAVITY * dt;//на сколько изменится скорость с учётом гравитации

			console.log(distance);

			this.y = this.y + distance;
			this.speedY = newSpeed;

			if (this.y > this.topOfScreen) {
				this.y = this.topOfScreen;
				this.speedY = 0.0;
			}
		}
	},

	Reset() {
		this.state = robbinStateStopped;
		this.SetStartSpeed();
	},

	SetStartSpeed() {
		this.speedY = robbinStartSpeedY;
	},

	TubeCollisionBox() {
	}

});