//Tetris with multiplayer
//For browsers using Phaser

//1920x1080 AUTO |CANVAS | AUTO | WEBGL
var game = new Phaser.Game(1920,900, Phaser.CANVAS, '', {preload: preload, create: create, update: update });
var bmp, sprit;
function preload(){}
function create(){
    //Skapa en bitmap
    bmp = game.make.bitmapData(1,1);
    bmp.data[0] = 0xFF0000;
    bmp.update();
    sprit = game.add.sprite(200,200,bmp);
    sprit.width = 10;
    sprit.height = 10;
    //Skapa en sprite från bitmap
}
function update(){


}