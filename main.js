//Tetris with multiplayer
//For browsers using Phaser

//1920x1080 AUTO |CANVAS | AUTO | WEBGL
var game = new Phaser.Game(1920,900, Phaser.CANVAS, '', {preload: preload, create: create, update: update });
var bmp;
function preload(){}
function create(){
    //Skapa en bitmap
    bmp = game.make.bitmapData(1,1);
    bmp.pixels[]
    //Skapa en sprite från bitmap
}
function update(){}