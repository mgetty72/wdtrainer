const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

let parsedCollisions
let collisionBlocks
let background 

let doors
let balls

var nextLevelButton = document.getElementById("nextLevelButton")

nextLevelButton.addEventListener("click", nextLevel)




const player = new Player({
	collisionBlocks,
	imageSrc: './img/king/elfidle.png',
	frameRate: 11,
	animations: {
		idleRight: {
			frameRate: 11,
			frameBuffer: 4,
			loop: true,
			imageSrc: './img/king/elfidle.png',
		},
		idleLeft: {
			frameRate: 11,
			frameBuffer: 4,
			loop: true,
			imageSrc: './img/king/elfidleLeft.png',
		},
		runRight: {
			frameRate: 8,
			frameBuffer: 4,
			loop: true,
			imageSrc: './img/king/elfrunRight.png',
		},
		runLeft: {
			frameRate: 8,
			frameBuffer: 4,
			loop: true,
			imageSrc: './img/king/elfrunLeft.png',
		},

		elfBall: {
			frameRate: 1,
			frameBuffer: 1,
			loop: false,
			imageSrc: './img/king/elfBall.png',
		},



		enterDoor: {
			frameRate: 16,
			frameBuffer: 4,
			loop: false,
			imageSrc: './img/king/elfDie.png',
			// onComplete: () => {
			// 	console.log('you died')
				
			// 	// var image = new Image();
			// 	// image.src = './img/message1.png'
			// 	// c.drawImage(image, 250, 70)

			// 	// gsap.to(image, {
			// 	// 	opacity: 1,
			// 	// 	onComplete: () => {
			// 	// 		// level++
			// 	// 		// if (level === 4) level = 1
			// 	// 		// levels[level].init()
			// 	// 		// player.switchSprite('idleRight')
			// 	// 		// player.preventInput = false
			// 	// 		gsap.to(image, {
			// 	// 			opacity: 0,

			// 	// 		})
			// 	// 	}
			// 	// })
			// },

		},

	},
})

let level = 1
let levels = {
	1: {
		init: () =>{
			parsedCollisions = collisionsLevel1.parse2D()
			collisionBlocks = parsedCollisions.createObjectsFrom2D()
			player.collisionBlocks = collisionBlocks

			if (player.currentAnimation) player.currentAnimation.isActive = false




			background = new Sprite({
			position: {
				x: 0,
				y: 0,
			},
			imageSrc: './img/WDbackgroundLevel1.png',
			})


			doors = [
				new Sprite({
					position: {
						x: 448,
						y: 400,
					},
					imageSrc: './img/orc.png',
					frameRate: 5,
					frameBuffer: 5,
					loop: false,
					autoplay: false,
				}),
			]

			balls = [
							new Sprite({
								position: {
									x: 650,
									y: 478,
								},
								imageSrc: './img/ball.png',
								frameRate: 1,
								frameBuffer: 5,
								loop: false,
								autoplay: false,
							}),
						]



		},
	},

		2: {
		init: () =>{
			parsedCollisions = collisionsLevel2.parse2D()
			collisionBlocks = parsedCollisions.createObjectsFrom2D()
			player.collisionBlocks = collisionBlocks
			player.position.x = 96
			player.position.y = 140

			if (player.currentAnimation) player.currentAnimation.isActive = false

			background = new Sprite({
			position: {
				x: 0,
				y: 0,
			},
			imageSrc: './img/WDbackgroundLevel1.png'
			})



				balls = [
							new Sprite({
								position: {
									x: 650,
									y: 478,
								},
								imageSrc: './img/ball.png',
								frameRate: 1,
								frameBuffer: 5,
								loop: false,
								autoplay: false,
							}),
						]



		},
	},

	3: {
		init: () =>{
			parsedCollisions = collisionsLevel3.parse2D()
			collisionBlocks = parsedCollisions.createObjectsFrom2D()
			player.collisionBlocks = collisionBlocks
			player.position.x = 750
			player.position.y = 230

			if (player.currentAnimation) player.currentAnimation.isActive = false

			background = new Sprite({
			position: {
				x: 0,
				y: 0,
			},
			imageSrc: './img/backgroundLevel3.png'
			})

			doors = [
				new Sprite({
					position: {
						x: 176,
						y: 335,
					},
					imageSrc: './img/doorOpen.png',
					frameRate: 5,
					frameBuffer: 5,
					loop: false,
					autoplay: false,
				}),
			]



		},
	},

}










const keys = {
	w: {
		pressed: false
	},

	a: {
		pressed: false
	},

	d: {
		pressed: false
	},

}
const overlay = {
	opacity: 0
}


function animate() {
	window.requestAnimationFrame(animate)

	background.draw()
	collisionBlocks.forEach((collisionBlock) => {
		collisionBlock.draw()
	})

	doors.forEach((door) => {
		door.draw()
	})

	// orcs.forEach((orc) => {
	// 	orc.draw()
	// })

	balls.forEach((ball) => {
		ball.draw()
	})


	player.handleInput(keys)
	player.draw()
	player.update()

	c.save()
	c.globalAlpha = overlay.opacity
	c.fillStyle = 'black'
	c.fillRect(0, 0, canvas.width, canvas.height)
	c.restore()
}

function displayWinMessage() {


				let message2 = new Image();
				message2.src = './img/messageWin2.png';
 				c.drawImage(message2, 250, 70);


}


function nextLevel() {
	location.href="index3.html"
}



	
levels[level].init()

animate()

