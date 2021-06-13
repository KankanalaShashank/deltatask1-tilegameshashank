let size = 0
let normalbutton = document.getElementById("normal")
normalbutton.classList.add("buttonstyles")
let mediumbutton = document.getElementById("medium")
mediumbutton.classList.add("buttonstyles")
normalbutton.addEventListener("click", function(event) {

    let username = document.getElementById("userdetails");
    let userpre = username.value;

    let nameclicked = event.target.textContent
    if (userpre === "") {
        alert("ENTER YOUR NAME")
    } else {
        document.body.removeChild(normalbutton)
        document.body.removeChild(mediumbutton)
        startgame(5)
        let size = 5
    }
})

mediumbutton.addEventListener("click", function(event) {
    let username = document.getElementById("userdetails");
    let userpre = username.value;
    let nameclicked = event.target.textContent

    if (userpre === "") {
        alert("ENTER YOUR NAME")
    } else {
        document.body.removeChild(normalbutton)
        document.body.removeChild(mediumbutton)
        startgame(6)
        let size = 6
    }

})
let limit = 0
let arr = []

function startgame(size) {
    let audioelement=document.getElementById("myplay")


    function reloadingpage() {
        window.location.reload()
    }
    let username = document.getElementById("userdetails");
    let userpre = username.value;

    let reloadbutton = document.createElement("button")
    let stepmoveview = document.getElementById("numbermoves")
    let counterelement = document.getElementById("countertime")
    let reloadbuttoncont = document.getElementById("reloadcontainer")
    let countercount = 0
    let uniqueid = null
    let numberofmoves = 0
    reloadbutton.textContent = "REPLAY"
    reloadbutton.classList.add("buttonstyles")
    reloadbutton.addEventListener("click", reloadingpage)


    function updatecount() {
        numberofmoves = numberofmoves + 1
        stepmoveview.textContent = numberofmoves
        //console.log(numberofmoves)
    }


    function finalmoves() {
        let finalmovess = stepmoveview.textContent
        return finalmovess
    }
    uniqueid = setInterval(function() {
        countercount = countercount + 1;
        let usecounter = countercount
        let numb = document.getElementById("numb")
        numb.textContent = "Number of moves : "
        let timeview = document.getElementById("timeview")
        timeview.textContent = "Time(sec)"
        counterelement.textContent = countercount
    }, 1000)

    function storagesectionandsiplay() {
        let countercountval = counterelement.textContent
        let totalscore = Math.round(10000 * (1 / countercountval) + 1000 * (1 / finalmoves()));
        let yourscorelem = document.getElementById("yourscore");
        yourscorelem.textContent = "YOUR SCORE : " + " " + totalscore;

        if (localStorage.getItem("users") == null) {
            let username = document.getElementById("userdetails");
            let userpre = username.value;
            let usersub = {
                "username": userpre,
                "score": totalscore
            }
            let stringifieddata = JSON.stringify(usersub);
            console.log(stringifieddata)
            localStorage.setItem("users", stringifieddata);
        }
        let storeddata = localStorage.getItem("users")
        let parseddata = JSON.parse(storeddata);
        let storedscore = parseddata["score"]

        if (totalscore > storedscore) {
            let username = document.getElementById("userdetails");
            let userpre = username.value;
            let usersub = {
                "username": userpre,
                "score": totalscore
            }
            let stringifieddata = JSON.stringify(usersub);
            localStorage.setItem("users", stringifieddata);
        }
    }
    if (size === 5) {
        limit = 8
    } else {
        limit = 15
    }
    let grid = []
    for (let i = 1; i <= size * size; i++) {
        let Tileno = "Tile" + i
        grid.push(Tileno)
    }
    let randomcolorlist = []
    let colorlist = ["orange", "red", "yellow", "blue", "pink", "grey"]

    let playgridele = document.getElementById("grid")
    playgridele.style.backgroundColor = "#9384ab"
    let a = 0
    let b = 0
    for (let i = 1; i <= size - 2; i++) {
        for (let j = 1; j <= size - 2; j++) {
            let buttonelement = document.createElement("button")

            randomcolorlist.push((colorlist[Math.floor(Math.random() * colorlist.length)]))
            buttonelement.style.backgroundColor = randomcolorlist[b]
            buttonelement.classList.add("backgrounddecoration")
            buttonelement.setAttribute("id", "tile" + (b + 1))
            playgridele.appendChild(buttonelement)
            b = b + 1
        }
        let breakelem = document.createElement("br")
        playgridele.appendChild(breakelem)

    }
    let breakelem = document.createElement("br")
    playgridele.appendChild(breakelem)
    let playgrid = document.getElementById("playgrid")
    playgrid.style.backgroundColor = "#9384ab"
    for (let i = 1; i <= size; i++) {
        let breakelem = document.createElement("br")
        playgrid.appendChild(breakelem)
        for (let j = 1; j <= size; j++) {
            let buttonelement = document.createElement("button")
            if (a <= limit) {
                buttonelement.style.backgroundColor = randomcolorlist[a]
                buttonelement.classList.add("backgrounddecoration")
                buttonelement.setAttribute("id", "Tile" + (a + 1))
                playgrid.appendChild(buttonelement)
                a = a + 1
            } else {
                if ((a + 1) === size * size) {
                    buttonelement.style.backgroundColor = "white"
                    buttonelement.classList.add("backgrounddecoration")
                    buttonelement.setAttribute("id", "Tile" + (a + 1))
                    playgrid.appendChild(buttonelement)
                    a = a + 1
                } else {
                    buttonelement.style.backgroundColor = (colorlist[Math.floor(Math.random() * colorlist.length)])
                    buttonelement.classList.add("backgrounddecoration")
                    buttonelement.setAttribute("id", "Tile" + (a + 1))
                    playgrid.appendChild(buttonelement)
                    a = a + 1
                }
            }
        }
    }
    if (Boolean(check(size))) {
        document.getElementById("answer").innerText = "You Win!!!";
        reloadbuttoncont.appendChild(reloadbutton)
        
            audioelement.play()
        
        clearInterval(uniqueid);
        storagesectionandsiplay()
        displayscoreboard();
    }
    document.getElementById("playgrid").addEventListener("click", function(event) {
        let id = event.target.id;
        if (document.getElementById(id).style.backgroundColor !== "white") {
            let number = parseInt(id.substring(4, id.length));
            swap(number);
            if (Boolean(check(size))) {
                document.getElementById("answer").innerText = "You win!!!";
                
                    audioelement.play()
                
                clearInterval(uniqueid);
                reloadbuttoncont.appendChild(reloadbutton)
                storagesectionandsiplay()
                displayscoreboard();
            }
        }
    })

    function styleandappend(players) {
        let scoredisplaysection = document.getElementById("scoredisplay")
        scoredisplaysection.classList.add("scoreboardstyle")
        let paraitem = document.createElement("p")
        let displaytext = players["username"] + ":" + "   " + players["score"]
        paraitem.textContent = displaytext
        scoredisplaysection.appendChild(paraitem)
    }

    function displayscoreboard() {
        let storeddata = localStorage.getItem("users")
        let parseddata = JSON.parse(storeddata)
        let socreboardname = document.createElement("h")
        let scoredisplaysection = document.getElementById("scoredisplay")
        socreboardname.textContent = "HIGHEST SCORE : "
        scoredisplaysection.appendChild(socreboardname)
        styleandappend(parseddata)

    }

    function swap(num) {
        var flag = false;
        var vis = false;
        if (num == size) {
            vis = true;
            if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            } else if (document.getElementById("Tile" + (num + size)).style.backgroundColor == "white") {
                document.getElementById("Tile" + (num + size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }
        if (num == (size * size)) {
            vis = true;
            if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            } else if (document.getElementById("Tile" + (num - size)).style.backgroundColor == "white") {
                document.getElementById("Tile" + (num - size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }
        if (num == (size * (size - 1) + 1)) {
            vis = true;
            if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            } else if (document.getElementById("Tile" + (num - size)).style.backgroundColor == "white") {
                document.getElementById("Tile" + (num - size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }
        if (num == 1) {
            vis = true;
            if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            } else if (document.getElementById("Tile" + (num + size)).style.backgroundColor == "white") {
                document.getElementById("Tile" + (num + size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }

        if (Boolean(vis)) {
            if (Boolean(flag)) {
                document.getElementById("Tile" + num).style.backgroundColor = "white";
                updatecount();

            }
            return;
        }


        if (num < size || num > (size * (size - 1) + 1)) {
            if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {

                document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (num < size) {
                if (document.getElementById("Tile" + (num + size)).style.backgroundColor === "white") {
                    document.getElementById("Tile" + (num + size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                    flag = true;

                }
            }
            if (num > (size * (size - 1) + 1)) {
                if (document.getElementById("Tile" + (num - size)).style.backgroundColor === "white") {
                    document.getElementById("Tile" + (num - size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                    flag = true;

                }
            }
        } else if (num % size === 0 || num % size === 1) {
            if (document.getElementById("Tile" + (num + size)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num - size)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (num % size === 0) {
                if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                    document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                    flag = true;

                }
            }
            if (num % size === 1) {
                if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {
                    document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                    flag = true;

                }
            }

        } else {
            if (document.getElementById("Tile" + (num + 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num - 1)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - 1)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num + size)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num + size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
            if (document.getElementById("Tile" + (num - size)).style.backgroundColor === "white") {
                document.getElementById("Tile" + (num - size)).style.backgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                flag = true;

            }
        }

        if (Boolean(flag)) {
            document.getElementById("Tile" + num).style.backgroundColor = "white";
            updatecount();


            return;
        }
    }

    function check(size) {
        let arr = [];
        if (size == 5) {
            arr = [2, 3, 4];
        } else if (size == 6) {
            arr = [2, 3, 4, 5];
        }
        console.log(size)
        console.log("inside check function1")
        let c = 1;
        for (let i = 1; i <= size - 2; i++) {
            console.log("inside check function3")
            for (let j = 0; j < arr.length; j++) {
                let num = size * i + arr[j];
                console.log("inside check function4")
                let firstbackgroundColor = document.getElementById("Tile" + num).style.backgroundColor;
                let secondbackgroundColor = document.getElementById("tile" + c).style.backgroundColor;
                c++;
                if (firstbackgroundColor !== secondbackgroundColor) return false;
            }
        }
        return true;
    }
}