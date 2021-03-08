let canvas
let context
let gameloop

let pSize = 20
let pX
let pY
let pLives = 3

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

let score = 0

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

    // loop
    gameloop = setInterval(draw, 180);

    terbang()
}

function draw() {
    angkasa()
    tembak()
    musuh()
    kapal()
    stats()
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

function terbang() {
    document.addEventListener('keydown', function (e) {
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
            if (score) {
                let hit = new Audio()
                hit.src = './assets/bomb.mp3'
                hit.play()
            }
            eY = 0
            eX = Math.round(Math.random() * pSize) * pSize

            score++
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
        pLives--
        if (pLives === 0) {
            clearInterval(gameloop)
            $cek = confirm("Pesawat Hancur, Ulangi ?")
            if ($cek === true) {
                window.location.reload()
            } else {
                alert("Silahkan refresh browser (F5) untuk bermain lagi!")
            }
        }
    }
}

function stats() {
    context.fillStyle = 'white';
    context.font = '15px sans-serif';
    context.fillText(`Lives : ${pLives}`, 20, 40);
    context.fillText(`Score : ${score}`, 20, 70);

    if (score === 20) {
        clearInterval(gameloop)
        $cek = confirm("Kamu Memenangkan Permainan!!, bermain lagi?")
        if ($cek === true) {
            window.location.reload()
        } else {
            alert("Terima Kasih Telah Bermain!, tekan (F5) untuk bermain kembali")
        }
    }
}