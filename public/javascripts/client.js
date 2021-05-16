let GameState = {
  LOADING : 0,
  RUNNING : 1,
  FINISHED: 2,
}

let Player = {
  Player1 : 0,
  Player2 : 1,
};

let SquareState = {
  EMPTY: 0,
  O: 1,
  X: 2,
};

let Outcome = {
  TIE: 0,
  O: 1,
  X: 2,
  None: 3,
};

let board = [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY,
             SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY,
             SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY];

let app = setupPixi(false);

app.ticker.add(delta => gameLoop(delta));
PIXI.Loader.shared
  // images
  .add("blueX", "images/blueX_Resize.png")
  .add('redO', 'images/redO_Resize.png')
  // sounds
  .add('song1', 'sounds/ES_A Night Full of What Ifs - The New Fools.mp3')
  .add('song2', 'sounds/ES_Everything to Win - Experia.mp3')
  .add('song3', 'sounds/ES_Fruits - Real Heroes.mp3')
  .add('song4', 'sounds/ES_Skyline - Catiso.mp3')
  .add('song5', 'sounds/ES_Win Win Win - Xack.mp3')
  .add('beep37', 'sounds/ES_Beep Tone Signal 37 - SFX Producer.mp3')
  .add('beep38', 'sounds/ES_Beep Tone Signal 38 - SFX Producer.mp3')
  .add('beep39', 'sounds/ES_Beep Tone Signal 39 - SFX Producer.mp3')
  .add('beep35', 'sounds/ES_Beep Tone Signal 35 - SFX Producer.mp3')
  .add('beep34', 'sounds/ES_Beep Tone Signal 34 - SFX Producer.mp3')
  .add('beep33', 'sounds/ES_Beep Tone Signal 33 - SFX Producer.mp3')
  .add('beep32', 'sounds/ES_Beep Tone Signal 32 - SFX Producer.mp3')
  .add('beep40', 'sounds/ES_Beep Tone Signal 40 - SFX Producer.mp3')
  .add('whoosh_small', 'sounds/ES_PREL Whoosh Small - SFX Producer.mp3')  
  .add('whoosh_metallic8', 'sounds/ES_Whoosh Metallic 8 - SFX Producer.mp3')  
  .add('swordHit1', 'sounds/ES_Sword Hit Heavy 1 - SFX Producer.mp3')
  .add('swordHit2', 'sounds/ES_Sword Hit Heavy 2 - SFX Producer.mp3');

PIXI.Loader.shared.load(doneLoading);
let state = GameState.LOADING;
let currPlayer = Player.Player1;
// begin functions below

function winCondition(board) {
  for (row = 0; row <=2; row++) {
    if (board[getBoardIndex(row, 0)] == board[getBoardIndex(row, 1)] && board[getBoardIndex(row, 1)] == board[getBoardIndex(row, 2)]) {
      if (board[getBoardIndex(row, 0)] == SquareState.X) {
        return Outcome.X;
      }
      else if (board[getBoardIndex(row, 0)] == SquareState.O) {
        return Outcome.O;
      }
    } 
  }
  // check columns
  for (column = 0; column <=2; column++) {
    if (board[getBoardIndex(0, column)] == board[getBoardIndex(1, column)] && board[getBoardIndex(1, column)] == board[getBoardIndex(2, column)]) {
      if (board[getBoardIndex(0, column)] == SquareState.X) {
        return Outcome.X;
      }
      else if (board[getBoardIndex(0, column)] == SquareState.O) {
        return Outcome.O;
      }
    } 
  }
  // check diagonals
  if (board[getBoardIndex(0, 0)] == board[getBoardIndex(1, 1)] && board[getBoardIndex(1, 1)] == board[getBoardIndex(2, 2)]) {
    if (board[getBoardIndex(0, 0)] == SquareState.X) {
      return Outcome.X;
    }
    else if (board[getBoardIndex(0, 0)] == SquareState.O) {
      return Outcome.O;
    }
  }
  if (board[getBoardIndex(2, 0)] == board[getBoardIndex(1, 1)] && board[getBoardIndex(1, 1)] == board[getBoardIndex(0, 2)]) {
    if (board[getBoardIndex(2, 0)] == SquareState.X) {
      return Outcome.X;
    }
    else if (board[getBoardIndex(2, 0)] == SquareState.O) {
      return Outcome.O;
    }
  }
  return Outcome.None;
}

function getBoardIndex (row, column) {
  let index = 3 * row + column;
  return index;
}

function boardIndexer (x, y) {
  let Index = 3 * (Math.floor(y / 200)) + Math.floor(x / 200);
  return Index;
}

function enableInput() {
  const renderTexture = PIXI.RenderTexture.create(app.screen.width, app.screen.height);

  const renderTextureSprite = new PIXI.Sprite(renderTexture);
  app.stage.addChild(renderTextureSprite);

  app.stage.interactive = true;
  app.stage.on('pointerdown', pointerDown);
}

function pointerDown(event) {
  console.log('x: ' + event.data.global.x);
  console.log('y: ' + event.data.global.y);
  let index = boardIndexer (event.data.global.x, event.data.global.y);
  if (board[index] == SquareState.EMPTY) {
    drawPiece(event.data.global.x, event.data.global.y);
    if (currPlayer == Player.Player1) {
      currPlayer = Player.Player2;
      board[index] = SquareState.X;
    } else {
      currPlayer = Player.Player1;
      board[index] = SquareState.O;
    }
  }  
}
function drawPiece(x, y) {
  let sprite;
  if (currPlayer == Player.Player1) {
    sprite = new PIXI.Sprite(PIXI.Loader.shared.resources.blueX.texture);
  } else {
    sprite = new PIXI.Sprite(PIXI.Loader.shared.resources.redO.texture);
  }
  let width = 60;
  let height = 80;

  let target = {
    x: 0,
    y: 0,
    scale: { x: 1, y: 1 }
  };
  if(x<=200){
    target.x = 100-width/2;
  }
  else if(x<=400){
    target.x = 300-width/2;
  }
  else {
    target.x = 500-width/2;
}
  if(y<=200) {
    target.y = 100-height/2;
  }
  else if(y<=400) {
    target.y = 300-height/2;
  }
  else {
    target.y = 500-height/2;
  }

  sprite.scale.x = 0.5;
  sprite.scale.y = 0.5;

  // play initial sound
  PIXI.Loader.shared.resources.whoosh_metallic8.data.playbackRate = 15; // speed it up 15x times
  PIXI.Loader.shared.resources.whoosh_metallic8.data.play();

  // add the sprite to the screen
  app.stage.addChild(sprite);
  // animate the sprite position
  gsap.to(sprite, { 
    x: target.x, 
    y: target.y, 
    onComplete: makePlaySoundCB(currPlayer == Player.Player1 ? PIXI.Loader.shared.resources.swordHit1 : PIXI.Loader.shared.resources.swordHit2 )
  });
  // animate the sprite scale (size)
  gsap.to(sprite.scale, { x: 0.25, y:0.25 });
}

function makePlaySoundCB(sound) {
  return function() {
    sound.data.play();
  }
}
function doneLoading(loader, resources) {
  console.log('done loading!');

  drawBoard();
  enableInput();
  //PIXI.Loader.shared.resources.forEach((r)=>{ if(r.data) r.dataj}
  state = GameState.RUNNING;
}

//Board is being made

function drawBoard() {
  console.log('drawing');
  const graphics = new PIXI.Graphics();

  // Rectangle
  let line_width = 10;
  graphics.beginFill(0xaabbcc, 1);
  graphics.lineStyle(2, 0xFEEB77, 1);
  graphics.drawRect(200 - line_width/2, 50, line_width, 500);
  graphics.drawRect(400 - line_width/2, 50, line_width, 500);
  graphics.drawRect(50, 200 - line_width/2, 500, line_width);
  graphics.drawRect(50, 400 - line_width/2, 500, line_width);

  graphics.endFill();

  app.stage.addChild(graphics);
}

function gameLoop(delta) {
  switch(state) {
    case GameState.LOADING:
      console.log('.');
      break;
    case GameState.RUNNING:
      let outcome = winCondition(board);
      if (outcome != Outcome.None) {
        if (outcome == Outcome.X) {
          console.log('X won!');
          playMusic(PIXI.Loader.shared.resources.song1);
        }
        else if (outcome == Outcome.O) {
          console.log('O won!');
          playMusic(PIXI.Loader.shared.resources.song3);
        }
        state = GameState.FINISHED;
      }
      break;
  }
}

let music = undefined;
function playMusic(newMusic) {
  if(music) {
    music.data.pause();
    music.data.currentTime = 0;
  }
  newMusic.data.play();
  music = newMusic;
}