class Player extends Sprite {
	constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
		super({imageSrc, frameRate, animations, loop })
		this.position = {
			x: 150,
			y: 64,
		}

		this.velocity = {
			x: 0,
			y: 0,
		}

		this.sides = {
			bottom: this.position.y + this.height
		}
		this.gravity = 1
		this.collisionBlocks = collisionBlocks
	}



	update() {
		//this is the blue box
		//c.fillStyle = 'rgba(0, 0, 255 , 0.5)'
		//c.fillRect(this.position.x, this.position.y, this.width, this.height)

		this.position.x  += this.velocity.x

		this.updateHitbox()

		this.checkForHorizontalCollisions()
		this.applyGravity()

		this.updateHitbox()



		c.fillRect(
			this.hitbox.position.x, 
			this.hitbox.position.y, 
			this.hitbox.width, 
			this.hitbox.height,
			)
		this.checkForVerticalCollisions()
		this.checkForDoorCollisions() 
		this.checkForBallCollisions() 
	}

	handleInput(keys) {
		if (this.preventInput) return
	this.velocity.x = 0
	if (keys.d.pressed)	{


		this.switchSprite('runRight')
		this.velocity.x = 5

		if (player.position.y === 401.99){
			walkSound.play()
		}
		this.lastDirection = 'right'
	} else if (keys.a.pressed) {

		this.switchSprite('runLeft')
		this.velocity.x = -5

		if (player.position.y === 401.99){
			walkSound.play()
		}

		this.lastDirection = 'left'
	} 
	else {
	if (this.lastDirection === 'left') this.switchSprite('idleLeft')
	else this.switchSprite('idleRight')
	}
	}

	switchSprite(name) {
		if (this.image === this.animations[name].image) return
		this.currentFrame = 0
		this.image = this.animations[name].image
		this.frameRate = this.animations[name].frameRate
		this.frameBuffer = this.animations[name].frameBuffer
		this.loop = this.animations[name].loop
		this.currentAnimation = this.animations[name]
	}

			updateHitbox() {
				this.hitbox = {
				position: {
					x: this.position.x + 56,
				y: this.position.y +10,
				},
				width: 36,
				height: 100,

			}
		}


checkForDoorCollisions() {
	const fallSound = document.getElementById('fallSound')

	for (let i = 0; i < doors.length; i++) {
			const door = doors[i]

		if(
			player.hitbox.position.x + player.hitbox.width <= door.position.x + 80 &&
			player.hitbox.position.x >= door.position.x - 36 &&
			player.hitbox.position.y + player.hitbox.height >= door.position.y &&
			player.hitbox.position.y <= door.position.y + door.height
				){
			player.velocity.x = 0
			player.velocity.y = 0
			player.position.y = 410	
			player.preventInput = true
			player.switchSprite('enterDoor')

			


			if (player.currentFrame <= 15){


				let message = new Image();
				message.src = './img/message1.png';
 				c.drawImage(message, 250, 70);
 				if (!door.soundPlayed) {
       			fallSound.play();
        		door.soundPlayed = true;
    		}

 			}

 			if (player.currentFrame === 15){


				let message = new Image();
				message.src = './img/message2.png';
 				c.drawImage(message, 250, 70);

 			}




			}
	}
}




checkForBallCollisions() {
	const pickUpSound = document.getElementById('pickUpSound')

	for (let i = 0; i < balls.length; i++) {
			const ball = balls[i]

		if(
			player.hitbox.position.x + player.hitbox.width <= ball.position.x + 50 &&
			player.hitbox.position.x >= ball.position.x + 10 &&
			player.hitbox.position.y + player.hitbox.height >= ball.position.y &&
			player.hitbox.position.y <= ball.position.y + ball.height
				){
			if (!ball.soundPlayed) {
       			pickUpSound.play();
        		ball.soundPlayed = true;
    		}
			player.velocity.x = 0
			player.velocity.y = 0	
			player.preventInput = true
			player.switchSprite('elfBall')
			displayWinMessage()
			ball.position.y = 430

			nextLevelButton.classList.remove("hidden")
			nextLevelButton.style.display = "inline-block"






			



			}
	}
}



	checkForHorizontalCollisions() {
		//check for horizontal collisions
		for(let i = 0; i < this.collisionBlocks.length; i++) {
			const collisionBlock = this.collisionBlocks[i]

			//if a collision exists
			if (
			this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
			this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
			this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
			this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
			) {
				//collision on x axis going to the left
				if(this.velocity.x < 0) {
					const offset = this.hitbox.position.x - this.position.x
					this.position.x =
					collisionBlock.position.x + collisionBlock.width - offset + 0.01
					break
				}
				//collision on x axis going to right
				if(this.velocity.x > 0) {
					const offset = this.hitbox.position.x -this.position.x + this.hitbox.width
					this.position.x = collisionBlock.position.x - offset - 0.01
					break
				}


			}

		}
	}

	applyGravity(){
				//apply gravity
		this.velocity.y += this.gravity
		this.position.y += this.velocity.y
	}

	checkForVerticalCollisions(){
//check for vertical collisions

		for(let i = 0; i < this.collisionBlocks.length; i++) {
			const collisionBlock = this.collisionBlocks[i]

			//if a collision exists
			if (
			this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
			this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
			this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
			this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
			) {
				//collision on y axis going down
				if(this.velocity.y < 0) {
					const offset = this.hitbox.position.y - this .position.y
					this.velocity.y = 0
					this.position.y =
					collisionBlock.position.y + collisionBlock.height - offset + 0.01
					break
				}
				//collision on y axis going up
				if(this.velocity.y > 0) {
					const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
					this.velocity.y = 0
					this.position.y = collisionBlock.position.y - offset - 0.01
					break
				}


			}

		}
	}
}