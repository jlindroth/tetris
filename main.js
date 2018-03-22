//Tetris with multiplayer
//For browsers using Phaser
//1920x1080 AUTO |CANVAS | AUTO | WEBGL
var game = new Phaser.Game(600,600, Phaser.CANVAS, '', {preload: preload, create: create, update: update });
var bmp, sprit, blockGrid = [];
var blockType = 1, blockRotation = 0, up = false, down = false, left = false, right = false, space=false;
var mainBlock = [];
var mainB = { 
    'x': 0, 
    'y': 0, 
    'type':0, 
    'state':0
} //'funkThis' : function() {}

var color = [ '0xFFB3BA',
              '0xFFDFBA',
              '0xFFFFBA',
              '0xBAFFC9',
              '0xBAFFC9',
              '0xC9C9FF',
              '0xF1CBFF' ];

function preload(){}
function create(){
    bmd = game.make.bitmapData(1,1);
    bmd.addToWorld();
    bmd.setPixel(0,0,0xFF,0xFF,0xFF,0xFF);
    bmd.update();

    var w,h;
    for( h=0;h<23;h++ )
        for( w=0;w<12;w++ ){
            blockGrid.push( game.add.sprite(105+w*20,100+h*20, bmd ) );
            blockGrid[blockGrid.length-1].width = 19;
            blockGrid[blockGrid.length-1].height = 19;
            blockGrid[blockGrid.length-1].tint = '0x' + (50+w*2) + '0000';
            blockGrid[blockGrid.length-1].visible = false;
        }
    for( h=0;h<23;h++){
        blockGrid[h*12].visible = true;
        blockGrid[h*12].tint = '0xBBBBBB';
        blockGrid[11+h*12].visible = true;
        blockGrid[11+h*12].tint = '0xBBBBBB';
    }
    for( w=0;w<12;w++){
        blockGrid[w+22*12].visible = true;
        blockGrid[w+22*12].tint = '0xBBBBBB';
    }
    
    for( h=0;h<4;h++ )
        for( w=0;w<4;w++ ){
            mainBlock.push( game.add.sprite(105+(w+4)*20,100+h*20, bmd ) );
            mainBlock[mainBlock.length-1].width  = 19;
            mainBlock[mainBlock.length-1].height = 19;
            mainBlock[mainBlock.length-1].tint = '0x00' + (50+w*5) + '00';
        }
    mainB.x = 4;
    mainB.y = 0;
    mainB.type = 1;
    mainB.state = 0;
    setBlockType( 1,0 );

    game.time.events.loop(Phaser.Timer.SECOND * 1, moveBlocked, this );
}
function moveLineDownTo( above){
    var x,y;
    for(y=above;y>0;y--)
        for(x=1;x<11;x++){ 
            blockGrid[x+y*12].tint = blockGrid[x+(y-1)*12].tint; 
            blockGrid[x+y*12].visible = blockGrid[x+(y-1)*12].visible; 
        }
    for(x=1;x<11;x++)
        blockGrid[x+0*12].visible = false; 
}
function clearLine(){
    var x,y,line=true;
    for(y=0;y<22;y++){
        for(x=1;x<11;x++){ if( blockGrid[x+y*12].visible == false ) line = false; }
        if( line ){
            for(x=1;x<11;x++){ blockGrid[x+y*12].visible = false; }
            moveLineDownTo( y );

        } 
        line = true;
    }
}
function dunkIt(){
    var x,y;
    //flytta ner block till kollision
    while( moveBlock(0,1) );
    //moveBlock(0,1);
    //rita ut blocket i blockGrid.
    for(x=0;x<4;x++)
        for( y=0;y<4;y++)
            if( mainBlock[x+4*y].visible ){
                blockGrid[mainB.x+x + (mainB.y+y)*12].visible = true;
                blockGrid[mainB.x+x + (mainB.y+y)*12].tint = mainBlock[x+4*y].tint;
            } 
    //spawna ett nytt block
    mainB.x = 4;
    mainB.y = 0;
    mainB.type = Math.floor(Math.random()*7+1);
    mainB.state = 0;
    for(x=0;x<4;x++)
        for( y=0;y<4;y++){
            mainBlock[x+4*y].x = 105+(x+mainB.x)*20;
            mainBlock[x+4*y].y = 100+y*20;
        }
    setBlockType( mainB.type , 0 ); 

    //Kolla fulla rader
    clearLine();
}
function setBlockType( type, rotation ){
    var i=0;
    mainB.state = rotation;
    mainB.type = type;
    switch( type ){
        case 1: {
            for(i=0;i<16;i++) mainBlock[i].tint = color[0];
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
            for(i=0;i<16;i++) mainBlock[i].tint = color[1];
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
            for(i=0;i<16;i++) mainBlock[i].tint = color[2];
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
            for(i=0;i<16;i++) mainBlock[i].tint = color[3];
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
            for(i=0;i<16;i++) mainBlock[i].tint = color[4];
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
            for(i=0;i<16;i++) mainBlock[i].tint = color[5];
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
            for(i=0;i<16;i++) mainBlock[i].tint = color[6];
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
function rotateBlock( blockT, blockR ){
    /*
    switch( blockT ){
        case 1: { if( blockR == 0 || blockR == 1 ) return blockR; else return 0; }
        case 2: { if( blockR == 0 || blockR == 1 ) return blockR; else return 0; }
        case 3: return 0;
        case 4: { if( blockR == 0 || blockR == 1 ) return blockR; else return 0; }
        case 5: { if( blockR >= 0 && blockR <= 3 ) return blockR; else return 0; }
        case 6: { if( blockR >= 0 && blockR <= 3 ) return blockR; else return 0; }
        case 7: { if( blockR >= 0 && blockR <= 3 ) return blockR; else return 0; }
    }*/
    
    switch( blockT ){
        //1:          
        //0,1,1,0     1,0,0,0
        //1,1,0,0     1,1,0,0
        //0,0,0,0     0,1,0,0  
        //0,0,0,0     0,0,0,0
        case 1: {
            if( blockR > 1 ) blockR = 0;
            if( blockR < 0 ) blockR = 1;
            if( blockR == 0 ){   
                if( blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+2 + 12*(mainB.y+0)].visible ||
                    blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                } 
            }
            if( blockR == 1 ){
                if( blockGrid[mainB.x+0 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+2)].visible ) return 0;
                else { 
                    setBlockType(blockT, blockR); 
                    return 1;
                }
            }
        }
        //2:
        //1,1,0,0     0,1,0,0
        //0,1,1,0     1,1,0,0
        //0,0,0,0     1,0,0,0
        //0,0,0,0     0,0,0,0
        case 2: {
            if( blockR > 1 ) blockR = 0;
            if( blockR < 0 ) blockR = 1;
            if( blockR == 0 ){   
                if( blockGrid[mainB.x+0 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+1)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 1 ){
                if( blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+0 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
        }
        case 3: {
            return 0;
        }
        //4:
        //0,1,0,0     0,0,0,0
        //0,1,0,0     1,1,1,1
        //0,1,0,0     0,0,0,0
        //0,1,0,0     0,0,0,0
        case 4: {
            if( blockR > 1 ) blockR = 0;
            if( blockR < 0 ) blockR = 1;
            if( blockR == 0 ){   
                if( blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+2)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+3)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+4)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 1 ){
                if( blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+3 + 12*(mainB.y+1)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
        }
        //5:0           5:1         5:2         5:3
        //1,1,0,0     0,0,0,0     0,1,0,0     0,0,1,0
        //0,1,0,0     1,1,1,0     0,1,0,0     1,1,1,0
        //0,1,0,0     1,0,0,0     0,1,1,0     0,0,0,0
        //0,0,0,0     0,0,0,0     0,0,0,0     0,0,0,0
        case 5: {
            if( blockR > 3 ) blockR = 0;
            if( blockR < 0 ) blockR = 1;
            if( blockR == 0 ){   
                if( blockGrid[mainB.x+0 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 1 ){
                if( blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+0 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 2 ){
                if( blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+2)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 3 ){
                if( blockGrid[mainB.x+2 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+1)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
        }
        //6:0           6:1         6:2         6:3
        //0,1,1,0     0,0,0,0     0,1,0,0     1,0,0,0
        //0,1,0,0     1,1,1,0     0,1,0,0     1,1,1,0
        //0,1,0,0     0,0,1,0     1,1,0,0     0,0,0,0
        //0,0,0,0     0,0,0,0     0,0,0,0     0,0,0,0
        case 6: {
            if( blockR > 3 ) blockR = 0;
            if( blockR < 0 ) blockR = 1;
            if( blockR == 0 ){   
                if( blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+2 + 12*(mainB.y+0)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 1 ){
                if( blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 2 ){
                if( blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+0 + 12*(mainB.y+2)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 3 ){
                if( blockGrid[mainB.x+0 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+1)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
        }
        //7:0           7:1         7:2         7:3
        //0,1,0,0     0,1,0,0     0,0,0,0     0,1,0,0
        //1,1,1,0     0,1,1,0     1,1,1,0     1,1,0,0
        //0,0,0,0     0,1,0,0     0,1,0,0     0,1,0,0
        //0,0,0,0     0,0,0,0     0,0,0,0     0,0,0,0
        case 7: {
            if( blockR > 3 ) blockR = 0;
            if( blockR < 0 ) blockR = 1;
            if( blockR == 0 ){   
                if( blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+1)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 1 ){
                if( blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 2 ){
                if( blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible || 
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+2 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
            if( blockR == 3 ){
                if( blockGrid[mainB.x+1 + 12*(mainB.y+0)].visible || 
                    blockGrid[mainB.x+0 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+1)].visible ||
                    blockGrid[mainB.x+1 + 12*(mainB.y+2)].visible ) return 0;
                else {
                    setBlockType(blockT, blockR);
                    return 1;
                }
            }
        }
    }
}
function moveBlocked( ){
    if( moveBlock(0,1) == false ) dunkIt();
}
function moveBlock( xoffset, yoffset ){
    var tempX = mainB.x + xoffset;
    var tempY = mainB.y + yoffset;
    var x,y;
    //Kan blocket flyttas utan att kollidera?
    for( x=0;x<4;x++){
        for( y=0;y<4;y++){
            if( x+tempX+12*(y+tempY) >= 0 && x+tempX+12*(y+tempY) < blockGrid.length  ) //kolla inte för kollision utanför banan
                if( blockGrid[(x+tempX)+12*(y+tempY)].visible && mainBlock[x+4*y].visible ) return 0;
        }        
    }

    for(x=0;x<16;x++){
        mainBlock[x].x += xoffset * 20;
        mainBlock[x].y += yoffset * 20;
    }
    mainB.x = tempX;
    mainB.y = tempY;
    return 1;
}

function update(){
    if( game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ){
        if( !down ){
            if( moveBlock( 0,1 ) == false) dunkIt();
            down = true;
        }
    } else down = false;
    if( game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.Z) ){
        if( !up ){
            rotateBlock( mainB.type, mainB.state+1 );
            up = true;
        }
    } else up = false;
    
    if( game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ){
        if( !left ){
            moveBlock( -1,0 );
            left = true;
        }
    } else left = false;
    if( game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ){
        if( !right ){
            moveBlock( 1,0 );
            right = true;
        }
    } else right = false;
    if( game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ){
        if( !space ){
            dunkIt();
            space = true;
        }
    } else space = false;
}