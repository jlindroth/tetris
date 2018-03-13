//Tetris with multiplayer
//For browsers using Phaser
//1920x1080 AUTO |CANVAS | AUTO | WEBGL
var game = new Phaser.Game(1024,900, Phaser.CANVAS, '', {preload: preload, create: create, update: update });
var bmp, sprit, blockGrid = [];
var mainBlock = [];

function preload(){}
function create(){
    bmd = game.make.bitmapData(1,1);
    bmd.addToWorld();
    bmd.setPixel(0,0,0xFF,0xFF,0xFF,0xFF);
    bmd.update();

    /*
    test = game.add.sprite(200,200, bmd );
    test.width = 20;
    test.height = 20;
    test.tint = 0xFF0000;
    */
    wallLeft = game.add.sprite(100,100, bmd );
    wallLeft.height = 400;
    wallRight = game.add.sprite(310,100, bmd );
    wallRight.height = 400;
    floor = game.add.sprite(100,500, bmd );
    floor.width = 210;

    var w,h;
    for( h=0;h<20;h++ )
        for( w=0;w<10;w++ ){
            blockGrid.push( game.add.sprite(105+w*20,100+h*20, bmd ) );
            blockGrid[blockGrid.length-1].width = 19;
            blockGrid[blockGrid.length-1].height = 19;
            blockGrid[blockGrid.length-1].tint = '0x' + (50+w*5) + '0000';
        }
    
    for( h=0;h<4;h++ )
        for( w=0;w<4;w++ ){
            mainBlock.push( game.add.sprite(400+w*20,100+h*20, bmd ) );
            mainBlock[mainBlock.length-1].width  = 19;
            mainBlock[mainBlock.length-1].height = 19;
            mainBlock[mainBlock.length-1].tint = '0x00' + (50+w*5) + '00';
        }
    setBlockType( 1,0 );
}

function setBlockType( type, rotation ){
    switch( type ){
        case 1: {
            if( rotation == 0 ){
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = true;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = false;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = false;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else {
                mainBlock[ 0].visible = true;
                mainBlock[ 1].visible = false;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = false;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            }
            break;
        }
        case 2: {
            if( rotation == 0 ){
                mainBlock[ 0].visible = true;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = false;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = false;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = false;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = true;
                mainBlock[ 9].visible = false;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            }
            break;
        }
        case 3: {
            if( rotation == 0 ){
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = false;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = false;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = true;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            }
            break;
        }
        case 4: {
            if( rotation == 0 ){
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = false;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = false;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = true;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = false;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = true;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = false;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            }
            break;
        }
        case 5: {
            if( rotation == 0 ){
                mainBlock[ 0].visible = true;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = false;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = false;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else if( rotation == 1 ) {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = false;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = true;
                mainBlock[ 9].visible = false;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else if( rotation == 2 ) {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = false;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = false;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = true;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else if( rotation == 3 ) {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = false;
                mainBlock[ 2].visible = true;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = false;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            }
            break;
        }
        case 6: {
            if( rotation == 0 ){
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = true;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = false;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = false;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else if( rotation == 1 ) {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = false;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = false;
                mainBlock[10].visible = true;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else if( rotation == 2 ) {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = false;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = false;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = true;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else if( rotation == 3 ) {
                mainBlock[ 0].visible = true;
                mainBlock[ 1].visible = false;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = false;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            }
            break;
        }
        case 7: {
            if( rotation == 0 ){
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = false;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else if( rotation == 1 ) {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = false;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else if( rotation == 2 ) {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = false;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = true;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            } else if( rotation == 3 ) {
                mainBlock[ 0].visible = false;
                mainBlock[ 1].visible = true;
                mainBlock[ 2].visible = false;
                mainBlock[ 3].visible = false;

                mainBlock[ 4].visible = true;
                mainBlock[ 5].visible = true;
                mainBlock[ 6].visible = false;
                mainBlock[ 7].visible = false;

                mainBlock[ 8].visible = false;
                mainBlock[ 9].visible = true;
                mainBlock[10].visible = false;
                mainBlock[11].visible = false;

                mainBlock[12].visible = false;
                mainBlock[13].visible = false;
                mainBlock[14].visible = false;
                mainBlock[15].visible = false;
            }
            break;
        } 
    } 
}
var blockType = 1, blockRotation = 0, up = false, down = false, left = false, right = false;

function rotateBlock( blockT, blockR ){
    switch( blockT ){
        case 1: { if( blockR == 0 || blockR == 1 ) return blockR; else return 0; }
        case 2: { if( blockR == 0 || blockR == 1 ) return blockR; else return 0; }
        case 3: return 0;
        case 4: { if( blockR == 0 || blockR == 1 ) return blockR; else return 0; }
        case 5: { if( blockR >= 0 && blockR <= 3 ) return blockR; else return 0; }
        case 6: { if( blockR >= 0 && blockR <= 3 ) return blockR; else return 0; }
        case 7: { if( blockR >= 0 && blockR <= 3 ) return blockR; else return 0; }
    }
}
function moveBlock( xoffset ){
    var x;
    for(x=0;x<14;x++)
        mainBlock[x].x += xoffset * 20;
}

function update(){
    if( game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ){
        if( !down ){
            blockType = Math.floor(Math.random()*6+1);
            blockRotation = 0;
            setBlockType( blockType , blockRotation ); 
            down = true;
        }
    } else down = false;
    if( game.input.keyboard.isDown(Phaser.Keyboard.UP) ){
        if( !up ){
            blockRotation = rotateBlock( blockType, blockRotation+1 );
            setBlockType( blockType, blockRotation ); 
            up = true;
        }
    } else up = false;
    if( game.input.keyboard.isDown(Phaser.Keyboard.LEFT ) ){
        if( !left ){
            moveBlock( -1 );
            left = true;
        }
    } else left = false;
    if( game.input.keyboard.isDown(Phaser.Keyboard.RIGHT ) ){
        if( !right ){
            moveBlock( 1 );
            right = true;
        }
    } else right = false;
}



/* Block Types
1:          
0,1,1,0     1,0,0,0
1,1,0,0     1,1,0,0
0,0,0,0     0,1,0,0  
0,0,0,0     0,0,0,0

2:
1,1,0,0     0,1,0,0
0,1,1,0     1,1,0,0
0,0,0,0     1,0,0,0
0,0,0,0     0,0,0,0

3:
0,0,0,0
0,1,1,0
0,1,1,0
0,0,0,0

4:
0,1,0,0     0,0,0,0
0,1,0,0     1,1,1,1
0,1,0,0     0,0,0,0
0,1,0,0     0,0,0,0

5:
1,1,0,0     0,0,0,0     0,1,0,0     0,0,1,0
0,1,0,0     1,1,1,0     0,1,0,0     1,1,1,0
0,1,0,0     1,0,0,0     0,1,1,0     0,0,0,0
0,0,0,0     0,0,0,0     0,0,0,0     0,0,0,0

6:
0,1,1,0     0,0,0,0     0,1,0,0     1,0,0,0
0,1,0,0     1,1,1,0     0,1,0,0     1,1,1,0
0,1,0,0     0,0,1,0     1,1,0,0     0,0,0,0
0,0,0,0     0,0,0,0     0,0,0,0     0,0,0,0

7:
0,1,0,0     0,1,0,0     0,0,0,0     0,1,0,0
1,1,1,0     0,1,1,0     1,1,1,0     1,1,0,0
0,0,0,0     0,1,0,0     0,1,0,0     0,1,0,0
0,0,0,0     0,0,0,0     0,0,0,0     0,0,0,0
*/