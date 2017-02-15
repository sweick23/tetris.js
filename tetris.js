const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);



function draw(){
	context.fillStyle = '#000';
	context.fillRect(0,0, canvas.width, canvas.height);
    
    drawMatrix(arena, {x: 0, y: 0});
	drawMatrix(player.matrix, player.pos);
	
}

function drawMatrix(matrix, offset){
matrix.forEach((row, y) => {
	row.forEach((value, x) => {
	if (value !== 0) {
	context.fillStyle = colors[value];
	context.fillRect(x + offset.x,
			 y + offset.y, 1, 1);
		}
	});
});
}
// this function clears a completed row
function arenaSweep(){
    let rowCount = 1;
  outer:   for(let y = arena.length -1; y > 0; --y){
        for (let x = 0; x< arena[y].length; ++x)
            {
                if (arena[y][x] === 0)
                    continue outer;
            }
      const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    ++y;
      
      // the score counter
      player.completed += rowCount * 1;
      
          
      
   
       if (player.completed === 10)
          {
      player.level += rowCount * 1 ;
              player.score += rowCount * 40;
              dropInterval = 900;
              document.getElementById('body').style.background='tan';
              
          }
       else if (player.completed === 20)
          {
              player.level += rowCount * 1;
              player.score += rowCount * 60;
              dropInterval = 800;
              document.getElementById('body').style.background='lightblue';
              
          }
      else if (player.completed === 30)
          {
              player.level += rowCount * 1;
               player.score += rowCount * 80;
              dropInterval = 700;
              document.getElementById('body').style.background='green';
             
          }
      else if (player.completed === 40)
          {
              player.level += rowCount * 1;
              dropInterval = 600;
              document.getElementById('body').style.background='yellow';
              player.score += rowCount * 100;
          }
      else if (player.completed === 50)
          {
              player.level += rowCount * 1;
              dropInterval = 500;
              document.getElementById('body').style.background='orange';
              player.score += rowCount * 150;
          }
      else if (player.completed === 60)
          {
              player.level += rowCount * 1;
              dropInterval = 400;
              document.getElementById('body').style.background='red';
              player.score += rowCount * 200;
          }
      else if (player.completed === 70)
          {
              player.level += rowCount * 1;
              dropInterval = 300;
              document.getElementById('body').style.background='blue';
              player.score += rowCount * 250;
          }
      else if (player.completed === 80)
          {
              player.level += rowCount * 1;
              dropInterval = 250;
              document.getElementById('body').style.background='brown';
              player.score += rowCount * 300;
          }
      else if (player.completed === 90)
          {
              player.level += rowCount * 1;
              dropInterval = 200;
              document.getElementById('body').style.background='pink';
              player.score += rowCount * 400;
          }
      else if (player.completed === 100)
          {
              player.level += rowCount * 1;
              dropInterval = 175;
              document.getElementById('body').style.background='violet';
              player.score += rowCount * 450;
          }
      else if (player.completed === 110)
          {
              player.level += rowCount * 1;
              dropInterval = 150;
              document.getElementById('body').style.background='purple';
              player.score += rowCount * 500;
          }
      else {
          player.score += rowCount * 20;
      }
      
      rowCount *= 1;
      
      
      
    
  }
   
    
}
// this function tells each piece when you have touched a boundry
function collide(arena, player){
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y){
        for (let x = 0; x < m[y].length; ++x){
            if (m[y][x] !== 0 && (arena[y + o.y] &&
               arena[y + o.y][x + o.x]) !== 0){
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h){
    const matrix = [];
    while(h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

// this function is to draw each of the 7 different pieces
function createPiece(type){
    if (type === 'T'){
        return [
    [0, 0, 0],
	[1, 1, 1],
	[0, 1, 0],
];
    }
    else if (type === 'O'){
            return [
    [2, 2],
	[2, 2],
	
];
    }
    else if (type === 'L'){
            return [
    [0, 3, 0],
	[0, 3, 0],
	[0, 3, 3],
	
];
    }
      else if (type === 'J'){
            return [
    [0, 4, 0],
	[0, 4, 0],
	[4, 4, 0],
	
];
    }
      else if (type === 'I'){
            return [
    [0, 5, 0, 0],
	[0, 5, 0, 0],
	[0, 5, 0, 0],
	[0, 5, 0, 0]
];
    }
      else if (type === 'S'){
            return [
    [0, 6, 6],
	[6, 6, 0],
	[0, 0, 0],
	
];
    }
      else if (type === 'Z'){
            return [
    [7, 7, 0],
	[0, 7, 7],
	[0, 0, 0],
	
];
    }
    

    
}



function merge(arena, player){
        player.matrix.forEach((row, y) =>{
            row.forEach((value, x) =>{
                if (value !== 0){
                    arena[y + player.pos.y][x + player.pos.x] = value;
                }
            })
        })
}


function playerDrop(){
    player.pos.y++;
    if (collide(arena, player)){
        player.pos.y--;
        merge(arena, player);
        playerReset();
       arenaSweep();
        updateScore();
        updateLine();
        updateLevel();
        
    }
    dropCounter = 0;
}

function playerMove(dir){
    player.pos.x += dir;
    if (collide(arena, player)){
        player.pos.x -= dir;
    }
    
}
// this function is for once your piece collides it resets to another random piece
function playerReset(){
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - 
            (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)){
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
       player.completed = 0;
        updateLine();
        player.level = 0;
        updateLevel();
    }
}
// this function is for getting each piece to rotate clockwise and counterclockwise
function playerRotate(dir){
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while(collide(arena, player)){
        player.pos.x += offset;
        offset = - (offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length){
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}
function rotate(matrix, dir){
    for(let y = 0; y < matrix.length; ++y)
        {
            for(let x= 0; x < y; ++x)
                {
                    [
                        matrix[x][y],
                        matrix[y][x],
                    ] = [
                        matrix[y][x],
                        matrix[x][y],
                    ];
                }
        }
    if (dir > 0){
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}



let levelUp = 0;

let dropCounter = 0;

let dropInterval = 1000;

let lastTime = 0;

function update(time = 0){
    
const deltaTime = time - lastTime;
	lastTime = time;

	dropCounter += deltaTime;
	if (dropCounter > dropInterval){
		playerDrop();
}
	draw();
	requestAnimationFrame(update);
}

// print the score on the webpage
function updateScore(){
    document.getElementById('score').innerText = player.score;
    
}

function updateLine(){
    document.getElementById('line').innerText = player.completed;
}
function updateLevel(){
    document.getElementById('level').innerText = player.level;
}



// colors of the tetris pieces
const colors = [
    null,
    'red',
    'lightblue',
    'green',
    'violet',
    'purple',
    'orange',
    'pink',
    
];

const arena = createMatrix(12, 20);

const player = {
	pos: {x: 0, y: 0},
	matrix: null,
    score: 0,
    completed: 0,
    level: 0,
}



// keyboard controls
document.addEventListener('keydown', event =>{
    if(event.keyCode === 37){
        playerMove(-1);
    }
    else if(event.keyCode === 39){
        playerMove(1);
    }
    else if(event.keyCode === 40){
     playerDrop();
        playerDrop();
        playerDrop();
        playerDrop();
        playerDrop();
       
    }
    else if (event.keyCode === 38){
        playerRotate(-1);
    }
    else if(event.keyCode === 80)
        {
            dropInterval = 10000000000000000000;
            alert("Game Paused press enter to resume game.")
            
        }
    else if (event.keyCode === 13)
        {
            dropInterval = 1000;
        }
    
   
});

playerReset();


updateScore();

updateLine();

updateLevel();

update();