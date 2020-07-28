var box2d = {
    b2Vec2: Box2D.Common.Math.b2Vec2,
    b2BodyDef: Box2D.Dynamics.b2BodyDef,
    b2Body: Box2D.Dynamics.b2Body,
    b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
    b2Fixture: Box2D.Dynamics.b2Fixture,
    b2World: Box2D.Dynamics.b2World,
    b2MassData: Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw: Box2D.Dynamics.b2DebugDraw
};


var SCALE = 30;
var stage, world;

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage( canvas );

    setupPhysics();

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.useRAF = true; //requestAnimationFrame boolian

}

function setupPhysics() {
    world = new box2d.b2World(new box2d.b2Vec2(0, 50), true);

    // aanmaak grond
    var fixDef = new box2d.b2FixtureDef();
    fixDef.density = 1;
    fixDef.friction = 0.5;
    var BodyDef = new box2d.b2BodyDef();
    BodyDef.type = box2d.b2Body.b2_staticBody;
    BodyDef.position.x = 400 / SCALE;
    BodyDef.position.y = 600 / SCALE;
    fixDef.shape = new box2d.b2PolygonShape();
    fixDef.shape.SetAsBox(400 / SCALE, 20 / SCALE);
    world.CreateBody(BodyDef).CreateFixture(fixDef);

    // setup debug
    var debugDraw = new box2d.b2DebugDraw();
    debugDraw.SetSprite(stage.canvas.getContext('2d'));
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFlags(box2d.b2DebugDraw.e_shape | box2d.b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
}

function tick() {
    console.log("I got here");
    stage.update();
    world.DrawDebugData();
    world.Step(1/60, 10, 10);
    world.ClearForces();
}