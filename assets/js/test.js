// test shoot them up game

const container = document.querySelector('.container');
const player = document.querySelector('.player');
const enemy = document.querySelector('.enemy');
const bullet = document.querySelector('.bullet');

class Game {
    constructor() {
        this.player = player;
        this.enemy = enemy;
        this.bullet = bullet;
        this.container = container;
        this.bulletSpeed = 10;
        this.enemySpeed = 1;
        this.enemyInterval = 1000;
        this.bulletInterval = 100;
        this.playerSpeed = 10;
        this.bullets = [];
        this.enemies = [];
        this.score = 0;
        this.init();
    }
    
    init() {
        this.player.style.left = '50%';
        this.player.style.top = '90%';
        this.player.style.transform = 'translateX(-50%)';
        this.container.addEventListener('mousemove', (e) => this.movePlayer(e));
        this.container.addEventListener('click', () => this.shoot());
        this.gameLoop();
    }
    
    movePlayer(e) {
        this.player.style.left = e.clientX + 'px';
        console.log('move');
    }
    
    shoot() {
        const bullet = this.bullet.cloneNode();
        bullet.style.left = this.player.offsetLeft + 'px';
        bullet.style.top = this.player.offsetTop + 'px';
        this.container.appendChild(bullet);
        this.bullets.push(bullet);
        console.log('shoot');
    }
    
    gameLoop() {
        setInterval(() => {
        this.moveBullets();
        this.moveEnemies();
        this.checkCollision();
        }, 1000 / 60);
    }
    
    moveBullets() {
        this.bullets.forEach((bullet, index) => {
        bullet.style.top = bullet.offsetTop - this.bulletSpeed + 'px';
        if (bullet.offsetTop < 0) {
            this.bullets.splice(index, 1);
            bullet.remove();
        }
        });
    }
    
    moveEnemies() {
        this.enemies.forEach((enemy, index) => {
        enemy.style.top = enemy.offsetTop + this.enemySpeed + 'px';
        if (enemy.offsetTop > this.container.clientHeight) {
            this.enemies.splice(index, 1);
            enemy.remove();
        }
        });
    }
    
    checkCollision() {
        this.bullets.forEach((bullet, bulletIndex) => {
        this.enemies.forEach((enemy, enemyIndex) => {
            if (
            bullet.offsetLeft < enemy.offsetLeft + enemy.offsetWidth &&
            bullet.offsetLeft + bullet.offsetWidth > enemy.offsetLeft &&
            bullet.offsetTop < enemy.offsetTop + enemy.offsetHeight &&
            bullet.offsetTop + bullet.offsetHeight > enemy.offsetTop
            ) {
            this.bullets.splice(bulletIndex, 1);
            this.enemies.splice(enemyIndex, 1);
            bullet.remove();
            enemy.remove();
            this.score++;
            console.log('enemy hit');
            }
        }
        );
        }
        );
    }   
}

new Game();
