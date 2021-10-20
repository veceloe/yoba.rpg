let keys = {};
window.onkeydown = (e) => keys[e.keyCode] = true;
window.onkeyup = (e) => keys[e.keyCode] = false;
let sad, bad, lep;
let app;
const WIDTH = 1900, HEIGHT = 920;
let l = 0, p = 0, j = 0;
let bunny, pauk, stens = [];

window.onresize = resize;
window.onload = function () {
    app = new PIXI.Application({autoResize: true, width: 1900, height: 920, backgroundColor: 0xffffff});
    document.body.appendChild(app.view);
    resize();

    sad = PIXI.Texture.from('assets/sad.png');
    bad = PIXI.Texture.from('assets/bad.png');
    lep = PIXI.Texture.from('assets/lol.png');

    bunny = PIXI.Sprite.from('assets/yoba.png');
    bunny.anchor.set(0.5);
    bunny.width = 200;
    bunny.height = 200;
    bunny.interactive = true;
    bunny.buttonMode = true;
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    bunny.on('pointerdown', onClick);
    app.stage.addChild(bunny);

    const texture = PIXI.Texture.from('/assets/stena.jpg');
    texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

    for (let i = 0; i < 10; i++) {
        stens.push(createStena(
            Math.floor(Math.random() * app.screen.width),
            Math.floor(Math.random() * app.screen.height),
        ));
    }

    function createStena(x, y) {
        stena = new PIXI.Sprite(texture);
        stena.interactive = true;
        stena.buttonMode = true;
        stena.anchor.set(0.5);
        stena.scale.set(0.5);
        stena
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
        stena.x = x;
        stena.y = y;
        app.stage.addChild(stena);
        return stena;
    }

    function onDragStart(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    function onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    function onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }

    pauk = PIXI.Sprite.from('assets/pauk.png');
    pauk.anchor.set(0.5);
    pauk.interactive = true;
    pauk.buttonMode = true;
    pauk.x = 1300;
    pauk.y = 650;
    pauk.width = 150;
    pauk.height = 150;
    pauk.on('pointerdown', onClick1);
    app.stage.addChild(pauk);

    app.ticker.add(() => {
        let x = bunny.x, y = bunny.y;
        if (keys[38]) bunny.y-=5;
        if (keys[40]) bunny.y+=5;
        if (keys[37]) {
            bunny.x-=5;
            bunny.rotation -= 0.1;
        }
        if (keys[39]) {
            bunny.x+=5;
            bunny.rotation += 0.1;
        }
        if (intersects(bunny, pauk) || bunny.x < 100 || bunny.x>1800 || bunny.y < 100 || bunny.y > 820) {
            bunny.x = x;
            bunny.y = y;
        }
        for (let i = 0; i<10; i++)
                if (intersects(bunny, stens[i])) {
                    bunny.x = x;
                    bunny.y = y;
                }
        if (keys[27]) console.log("Выпустите меня!")
    });
}
function resize() {
    let width = window.innerWidth, height = window.innerHeight, renderer = app.renderer;
    let ratio = Math.min(width / WIDTH, height / HEIGHT);
    renderer.resize(Math.ceil(WIDTH * ratio), Math.ceil(HEIGHT * ratio));
    app.stage.position.set(renderer.width / 2, renderer.height / 2);
    app.stage.scale.set(ratio, ratio);
    app.stage.pivot.set(WIDTH / 2, HEIGHT / 2);

    renderer.view.style.left = ((width - renderer.width) / 2 >> 0) + "px";
    renderer.view.style.top = ((height - renderer.height) / 2 >> 0) + "px";
    renderer.view.style.position = "absolute";
}


function onClick() {
    bunny.scale.y = bunny.scale.x *= 1.25;
    l++;
    j++;
    console.log(l);
    if (l>3) {
        l = 0;
        alert('ты проиграл, иди спи');
        bunny.rotation = 0;
        bunny.scale.y = bunny.scale.x = 1;
    }
    if (bunny.texture == sad && j>30){
         alert("404 Not Found");
         bunny.texture = bad;
    }
}

function onClick1() {
    p++;
    if (p==1) alert('— Не лезь, блядь, дебил, сука, ебаный. Ты чё, хххуёл, я те сказали что ли? Залезь, наххуй, нака обратно, блядь! Дебил, блядь.');
    if (p==2) {
        alert('Я иду как глубокий старец,узревший вечное, прикоснувшийся к Божественному, сам стал богоподобен и устремлен в это бесконечное, и который в умиротворении, покое, гармонии, благодати, в этом сокровенном блаженстве пребывает, вовлеченный во всё и во вся, понимаешь, вот и всё, в этом наша разница. Так что я иду любоваться мирозданием, а ты идёшь преисполняться в ГРАНЯХ каких-то, вот и вся разница, понимаешь, ты не зришь это вечное бесконечное, оно тебе не нужно. Ну зато ты, так сказать, более активен, как вот этот дятел долбящий, или муравей, который очень активен в своей стезе, поэтому давай, наши пути здесь, конечно, имеют грани подобия, потому что всё едино, но я-то тебя прекрасно понимаю, а вот ты меня - вряд ли, потому что я как бы тебя в себе содержу, всю твою природу, она составляет одну маленькую там песчиночку, от того что есть во мне, вот и всё, поэтому давай, ступай, езжай, а я пошел наслаждаться прекрасным осенним закатом на берегу теплой южной реки. Всё, ступай, и я пойду.');
        pauk.visible = false;
        pauk.x = pauk.y = -1000;
        bunny.texture = sad;
    }
}

   function intersects(a, b) {
        let tw = a.width, th = a.height, rw = b.width, rh = b.height;
        if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) return false;

        let tx = a.x - tw / 2;
        let ty = a.y - th / 2;
        let rx = b.x - rw / 2;
        let ry = b.y - rh / 2;
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        return ((rw < rx || rw > tx) &&
                (rh < ry || rh > ty) &&
                (tw < tx || tw > rx) &&
                (th < ty || th > ry));
}
