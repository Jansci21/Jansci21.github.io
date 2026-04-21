//Fan
const fan_switch_on = document.getElementById('fan_switch_on')
const fan_switch_off = document.getElementById('fan_switch_off')
const fan_1 = document.getElementById("fan");
const fan_2 = document.getElementById("fan_spin");

//Bed
const bed = document.getElementById('bed');
const bed_made = document.getElementById('bed_made');

//Day times
const morning = document.getElementById('morning');
const afternoon = document.getElementById('afternoon');
const evening = document.getElementById('evening');
const night = document.getElementById('night');

//Curtains
const windows = document.querySelectorAll('.window');
const curtain_open = document.getElementById('curtain_open')
const curtain_closed = document.getElementById('curtain_closed')

//Lights
const off_lights = document.getElementById('dark_mode');
const on_switch = document.getElementById('switch_on');
const off_switch = document.getElementById('switch_off');

//Switch sounds
const off_sound = new Audio("index/index_img/switch_sound_off.mp3");
off_sound.preload = "auto";
const on_sound = new Audio("index/index_img/switch_sound_on.mp3");
on_sound.preload = "auto";

//Laptop
const on = document.getElementById('laptop_on');
const off = document.getElementById('laptop');
const on_dark = document.getElementById('laptop_on_dark')
const laptop_light = document.getElementById('laptop_light')

//Laptop functions
const mouse = document.getElementById('mouse')
const laptop_window = document.getElementById('laptop_screen');

//Movie app
const movie_icon = document.getElementById("movie_icon");
const buttons = document.querySelectorAll(".folder_button");
const folders = document.querySelectorAll(".folder");
const folder_2 = document.getElementById("folder_2")
const folder_2_text = document.getElementById("folder_2_text")
const folder_2_inside = document.getElementById("folder_2_inside")
const search = document.querySelector(".search_container")


let state = {
    lights : "off", 
    laptop : "off", 
    mouseEnter : "off", 
    screen : "closed", 
    movie_app: "closed",
    activeFolder : null,
    curtain: "closed",
    day: null,
    fan: "off",
    runInterval: null,
    fanSpeed: 120,
    bed: "messy",
    fanFrame: false,
    movie: null
}   

let movieList = [
    {
        title: "Harry Potter & Sorcerer's Stone",
        img: "index/index_img/HP_1.jpg",
        duration: "2h 32min",
        year: "2001",
        age: "PG",
        kind: "Film Series",
        books: "Books",
        description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world."

    },

    {
        title: "Harry Potter & The Chamber Of Secrets",
        img: "index/index_img/HP_2.jpg",
        description: "Harry Potter lives his second year at Hogwarts with Ron and Hermione when a message on the wall announces that the legendary Chamber of Secrets has been opened. The trio soon realize that, to save the school, it will take a lot of courage."
    },
    
    {
        title: "Harry Potter & The Prisoner Of Azkaban",
        img: "index/index_img/HP_3.jpg",
        description: "Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard."
    },

    {
        title: "Harry Potter & The Goblet Of Fire",
        img: "index/index_img/HP_4.jpg",
        description: "Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares."
    },

    {
        title: "Harry Potter & The Order Of The Phoenix",
        img: "index/index_img/HP_5.jpg",
        description: "With their warning about Lord Voldemort's return scoffed at, Harry and Dumbledore are targeted by the Wizard authorities as an authoritarian bureaucrat slowly seizes power at Hogwarts."
    },

    {
        title: "Harry Potter & The Half-Blood Prince",
        img: "index/index_img/HP_6.jpg",
        description: "As Harry Potter begins his sixth year at Hogwarts, he discovers an old book marked as 'the property of the Half-Blood Prince' and begins to learn more about Lord Voldemort's dark past."
    },

    {
        title: "Harry Potter & Deadly Hallows(Part 1)",
        img: "index/index_img/HP_7.jpg",
        description: "The story follows Harry Potter, who has been asked by Dumbledore to find and destroy Lord Voldemort's secret to immortality – the Horcruxes."

    },

    {
        title: "Harry Potter & Deadly Hallows(Part 1)",
        img: "index/index_img/HP_8.jpg",
        description: "Harry Potter is tasked with the dangerous and seemingly impossible task of locating and destroying Voldemort's remaining Horcruxes. Harry must rely on Ron and Hermione more than ever, but dark forces threaten to tear them apart."
    },

    {
        title: "Divergent",
        img: "index/index_img/divergent.jpg",
        description: "In a world divided by factions based on virtues, Tris learns she's Divergent and won't fit in. When she discovers a plot to destroy Divergents, Tris and the mysterious Four must find out what makes Divergents dangerous before it's too late."
    },

    {
        title: "Insurgent",
        img: "index/index_img/divergent2.jpg",
        description: "Tris Prior must confront her inner demons, and with help from those closest to her, continue the fight against a powerful alliance that threatens to tear her society apart."
    },

    {
        title: "Allegiant",
        img: "index/index_img/divergent3.jpg",
        description: "After the earth-shattering revelations of Insurgent, Tris must escape with Four beyond the wall that encircles Chicago to finally discover the shocking truth of the world outside."
    },

    {
        title: "The Maze Runner",
        img: "index/index_img/maze1.jpg",
        description: "A teen with no memory of the outside world awakens in a gigantic maze guarded by deadly creatures, and plots a daring escape."
    },

    {
        title: "Maze Runner: The Scorch Trials",
        img: "index/index_img/maze2.jpg",
        description: "After having escaped the Maze, the Gladers face a new set of challenges on the open roads of a desolate landscape filled with unimaginable obstacles."
    },

    {
        title: "Maze Runner: The Death Cure",
        img: "index/index_img/maze3.jpg",
        description: "In a desperate attempt to save their friends, the Gladers try to infiltrate a fortified city and make it out alive."
    },

    {
        title: "Twilight",
        img: "index/index_img/twilight1.jpg",
        description: "When Bella Swan moves to a small town in the Pacific Northwest, she falls in love with Edward Cullen, a mysterious classmate who reveals himself to be a 108-year-old vampire."
    },

    {
        title: "The Twilight Saga: New Moon",
        img: "index/index_img/twilight2.jpg",
        description: "After Edward leaves because of an incident involving Bella, Jacob Black becomes her best friend, but what Bella doesn't realize is that Jacob also has a secret that will suddenly change their lives."
    },

    {
        title: "The Twilight Saga: Eclipse",
        img: "index/index_img/twilight3.jpg",
        description: "Danger once again lurks for Bella, with a malicious vampire seeking revenge. Amidst the turmoil, Bella must choose between her love for Edward and her friendship with Jacob, knowing the decision could trigger a battle between them."
    },

    {
        title: "The Twilight Saga: Breaking Dawn(Part 1)",
        img: "index/index_img/twilight4.jpg",
        description: "A wedding and honeymoon bring unexpected and shocking consequences for Bella and Edward, including new complications with Jacob."
    },

    {
        title: "The Twilight Saga: Breaking Dawn(Part 2)",
        img: "index/index_img/twilight5.jpg",
        description: "After the birth of Bella and Edward's daughter, Renesmee, the Cullens gather werewolves, vampire clans, and other allies from around the world to protect her after a false allegation puts her life in danger."
    },
]

    
    
const movie_grid = document.querySelector(".movie_grid")
const movie_row = document.querySelector(".movie_row")

function renderMovies(list) {
    movie_row.innerHTML = "";

    list.forEach(movie => {
        const div = document.createElement("div")
        const p = document.createElement("p")
        p.textContent = movie.title
        const img = document.createElement("img")
        img.src = movie.img
        img.classList.add("movie_img")
        div.append(img,p)
        movie_row.append(div)
        img.addEventListener("click", () => {
            showMovie(movie)
        })
    })
}

function showMovie(movie) {
    console.log(movie.title)
        movie_indiv.innerHTML = "";
        const image = document.createElement("img")
        image.src = movie.img
        

        const p1 = document.createElement("p")
        p1.textContent = movie.description
        const p2 = document.createElement("p")
        p2.textContent = movie.title
        p2.id = "title"
        p1.id = "description"

        const p3 = document.createElement("p")
        p3.id = "duration"
        p3.textContent = movie.duration

        const p4 = document.createElement("p")
        p4.id = "year"
        p4.textContent = movie.year

        const p5 = document.createElement("p")
        p5.id = "age"
        p5.textContent = movie.age

        const p6 = document.createElement("p")
        p6.id = "kind"
        p6.textContent = movie.kind

        const p7 = document.createElement("p")
        p7.id = "age"
        p7.textContent = movie.books

        const div = document.createElement("div")
        div.append(p4,p3,p5,p6,p7)
        div.classList.add("small_text")


        const textbox = document.createElement("div")
        textbox.classList.add("text-container")
        state.movie = "open";
        textbox.append(p2,div,p1)
        
        movie_indiv.append(image)
        movie_indiv.append(textbox)
}

function updateTime() {
    //Time & Date
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    if (hour >= 6 && hour < 12) {state.day = "morning"}
    if (hour >= 12 && hour < 18) {state.day = "afternoon"}
    if (hour >= 18 && hour < 21) {state.day = "evening"}
    if (hour >= 21 || hour < 6) {state.day = "night"}

    //console.log("Current time is", hour, "hours,", minutes, "minutes, and", seconds, "seconds.")
    render()
}

setInterval(updateTime, 1000)

function render() {
    
    //Lights
    document.body.style.backgroundColor = state.lights === "on" ? "whitesmoke" : "black";
    off_lights.style.display = state.lights === "on" ? "none" : "block";
    on_switch.style.display = state.lights === "on" ? "block" : "none";
    off_switch.style.display = state.lights === "on" ? "none" : "block";

    //Laptop
    on.style.display = state.laptop === "on" && state.lights === "on" ? "block" : "none";
    off.style.display = state.laptop === "off" ? "block" : "none";
    on_dark.style.display = state.laptop === "on" && state.lights === "off" ? "block" : "none";
    laptop_light.style.display = state.laptop === "on" && state.lights === "off" ? "block" : "none";
    
    //Mouse
    mouse.style.cursor = state.laptop === "on" && state.mouseEnter === "on" ? "pointer" : "default";
    mouse.style.filter = state.laptop === "on" && state.mouseEnter === "on" ? "brightness(60%)" : "brightness(100%)";

    //Laptop Screen
    laptop_window.style.display = state.screen === "open" && state.laptop === "on" ? "block" : "none";

    //Movie App
    buttons.forEach(button => {
        button.style.display = state.movie_app === "open" ? "block" : "none";
    })
    folders.forEach(folder => {
        folder.style.display = state.activeFolder === folder.id ? "block" : "none";
    })
    if (state.movie_app === "open" && state.activeFolder === null) {folder_2.style.display = "block"};
    folder_2_text.style.display = state.movie_app === "open" ? "block" : "none"

    movie_grid.style.display = (state.activeFolder === "folder_2") || (state.movie_app === "open" && state.activeFolder === null)  ? "block" : "none";
    folder_2_inside.style.display = state.movie === "open" ? "block" : "none"
    search.style.display = (state.activeFolder === "folder_2" && state.movie === null) || (state.movie_app === "open" && state.activeFolder === null && state.movie === null)  ? "block" : "none";
    
    movie_indiv.style.display = state.movie === "open" ? "flex" : "none"

    //Curtains
    morning.style.display = state.day === "morning" && state.curtain === "open" ? "block" : "none"
    afternoon.style.display = state.day === "afternoon" && state.curtain === "open" ? "block" : "none"
    evening.style.display = state.day === "evening" && state.curtain === "open" ? "block" : "none"
    night.style.display = state.day === "night" && state.curtain === "open" ? "block" : "none"
    curtain_closed.style.display = state.curtain === "closed" ? "block" : "none";
    
    //Fan
    fan_switch_off.style.display = state.fan === "off" ? "block" : "none";
    fan_switch_on.style.display = state.fan === "on" ? "block" : "none";

    fan_1.style.display = (state.fan === "on" && state.fanFrame === false) || state.fan === "off" ? "block" : "none";
    fan_2.style.display = state.fan === "on" && state.fanFrame === true ? "block" : "none";

    //Bed
    bed.style.display = state.bed === "messy" ? "block" : "none";
    bed_made.style.display = state.bed === "tidy" ? "block" : "none";
}


search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = movieList.filter(movie => 
        movie.title.toLowerCase().includes(value)
    )
    console.log(filtered)
    renderMovies(filtered)
})

//Lights
off_switch.addEventListener('click', () => {
    console.log("Lights turned on.");
    on_sound.play();
    state.lights = "on"
    render()
})

on_switch.addEventListener('click', () => {
    console.log("Lights turned off.");
    off_sound.play();
    state.lights = "off"
    render()
})

//Laptop
off.addEventListener("click", () => {
    console.log("Laptop turned on.")
    state.laptop = "on"
    render()
})

on.addEventListener("click", () => {
    console.log("Laptop turned off")
    state.laptop = "off"
    render()
})

on_dark.addEventListener("click", () => {
    console.log("Laptop turned off")
    state.laptop = "off"
    render()
})

//Mouse
mouse.addEventListener("mouseenter", () => {
    //console.log("Enter")
    state.mouseEnter = "on"
    render()
})

mouse.addEventListener("mouseleave", () => {
    //console.log("Leave")
    state.mouseEnter = "off"
    render()
})

//Laptop Screen 
mouse.addEventListener("click", (e) => {
    e.stopPropagation();
    state.screen = "open"
    render()
    if (state.laptop === "on") {console.log("Laptop opened.")}
    
})

document.addEventListener("click", (e) => {
    if (!laptop_window.contains(e.target) && state.screen === "open") {
        console.log("Laptop closed.")
        state.screen = "closed"
        state.activeFolder = null
        state.movie_app = "closed"
        state.movie = null
        render()
    }
})

//Movie App
movie_icon.addEventListener("click", () => {
    state.movie_app = "open";
    console.log("Movie app opened.")
    render()
})

buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            state.activeFolder = targetId
            console.log(targetId, "opened.")
            render()
        })
})
const movie_indiv = document.querySelector(".movie_individual")
movieList.forEach(movie => {
    const div = document.createElement("div")
    const p = document.createElement("p")
    p.textContent = movie.title
    const img = document.createElement("img")
    img.src = movie.img
    img.classList.add("movie_img")
    
    img.addEventListener("click", () => {
        showMovie(movie)
    })

    
    div.append(img)
    div.append(p)
    
    movie_row.append(div)
})

//Curtains
curtain_closed.addEventListener("click", () => {
    state.curtain = "open"
    render()
    console.log("Curtains opened. Its currently", state.day, "time.")
})

windows.forEach(window => {
    window.addEventListener("click", () => {
        state.curtain = "closed";
        console.log("Curtains closed.")
        render()
    })
})

//Fan
fan_switch_on.addEventListener("click", () => {
    clearInterval(state.runInterval);
    state.runInterval = null
    state.fan = "off";
    off_sound.play()
    console.log("Fan turned off.")
    render()
})

fan_switch_off.addEventListener("click", () => {
    console.log("Fan turned on at", state.fanSpeed, "speed.")
    state.fan = "on";
    state.fanFrame = true
    if(state.runInterval === null) {
        state.runInterval = setInterval(() => {
            state.fanFrame = !state.fanFrame
            render()
        }, state.fanSpeed)
    }
    on_sound.play()
    
})

//Bed
bed.addEventListener("click", () => {
    state.bed = "tidy"
    console.log("Bed has been made.")
    render()
})

bed_made.addEventListener("click", () => {
    console.log("Bed is not made.")
    state.bed = "messy"
    render()
})









