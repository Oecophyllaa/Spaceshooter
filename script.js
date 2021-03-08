let canvas
let context
let gameloop

let pSize = 20
let pX
let pY

let arahKapal = ""

let space
let plane
let ammo
let ufo
let monster

let eX
let eY = 0


let laser = []
let alien = []

let kill = 0

let bossX
let bossY = 40
let bossHp

window.onload = function () {
    canvas = document.getElementById('canvas')
    context = canvas.getContext('2d');

    pX = canvas.width / 2
    eX = Math.round(Math.random() * 20) * 20
    bossX = Math.round(Math.random() * 20) * 20
    // console.log(pX, eX);

    // ambil gambar
    space = new Image()
    space.src = "./assets/space.png"

    plane = new Image()
    plane.src = "./assets/airplane.png"

    ammo = new Image()
    ammo.src = "./assets/laser.png"

    ufo = new Image()
    ufo.src = './assets/ufo.png'

    monster = new Image()
    monster.src = './assets/monster.png'

    // loop
    gameloop = setInterval(draw, 180);

    jalan()
}

function draw() {
    angkasa()
    tembak()
    musuh()
    spawnBoss()
    kapal()
}

function angkasa() {
    context.drawImage(space, 0, 0, 400, 400);

}

function kapal() {
    // pX = canvas.width / 2
    // context.fillStyle = 'green';
    // context.fillRect(pX, canvas.height - pSize, pSize, pSize);
    context.drawImage(plane, pX, canvas.height - pSize, pSize, pSize);


    if (arahKapal == "L") {
        pX -= pSize
    } else if (arahKapal == "R") {
        pX += pSize
    }
}

function jalan() {
    document.addEventListener('keydown', function (e) {
        // jalan
        if (e.key === "ArrowLeft") {
            arahKapal = "L"
            if (pX < 0) {
                pX = 0
            }
        } else if (e.key === "ArrowRight") {
            arahKapal = "R"
            if (pX > canvas.width - pSize) {
                pX = canvas.width - pSize
            }

        }

        // nembak
        if (e.code == "Space" || e.code == " ") {
            laser.push({ x: pX, y: canvas.height - pSize })

            let duar = new Audio()
            duar.src = './assets/laser.mp3'
            duar.play()
        }
    })
    document.addEventListener('keyup', function (e) {
        if (e.key === "ArrowLeft") {
            arahKapal = ""
        } else if (e.key === "ArrowRight") {
            arahKapal = ""
        }
    })
}

function tembak() {
    laser = laser.filter((e) => e['y'] > 0)
    laser.forEach((e) => {
        // console.log(e['x'], eX, e['y'], eY);
        if (e['x'] == eX && e['y'] <= eY) {
            // console.log(kill);
            if (kill == 0) {
                let hit = new Audio()
                hit.src = './assets/announcer/1kill.mp3'
                hit.play()
            } else if (kill == 1) {
                let hit = new Audio()
                hit.src = './assets/announcer/2kill.mp3'
                hit.play()
            } else if (kill == 2) {
                let hit = new Audio()
                hit.src = './assets/announcer/3kill.mp3'
                hit.play()
            } else if (kill == 3) {
                let hit = new Audio()
                hit.src = './assets/announcer/4kill.mp3'
                hit.play()
            } else if (kill == 4) {
                let hit = new Audio()
                hit.src = './assets/announcer/5kill.mp3'
                hit.play()
            } else if (kill >= 5) {
                let hit = new Audio()
                hit.src = './assets/announcer/godlike.mp3'
                hit.play()
            }
            eY = 0
            eX = Math.round(Math.random() * pSize) * pSize

            kill++

            if (kill == 3) {
                kill = 3

                bossHp = 5
            }


            // console.log(kill);
        }
        if (e['x'] == bossX && e['y'] <= bossY) {
            console.log(e['x'], bossX, e['y'], bossY);

            let gg = new Audio()
            gg.src = './assets/announcer/holyshyt.mp3'
            gg.play()
        }

        e['y'] -= pSize
        context.drawImage(ammo, e['x'], e['y'], pSize, pSize);
    })


}

function musuh() {
    // pY = Math.round(Math.random * (canvas.height - pSize)) 

    eY += pSize
    if (eY > 400) {
        eY = 0
        eX = Math.round(Math.random() * pSize) * pSize
    }
    context.drawImage(ufo, eX, eY, pSize, pSize);
    // console.log(eY);

    // console.log(eX, eY, pX, pY);
    if (eX == pX && eY == canvas.height - pSize) {
        clearInterval(gameloop)
        if (confirm('Pesawat Crash, Ulangi?')) {
            window.location.reload()
        } else {
            alert('silahkan refresh web untuk memulai permainan')
        }

    }
}

function spawnBoss() {
    if (kill == 3) {

        // bossX -= pSize
        if (bossX < 0) {

        }
        context.drawImage(monster, bossX - pSize, bossY, pSize * 2, pSize * 2);

    }
}