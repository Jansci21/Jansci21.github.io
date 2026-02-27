//Fan
const fan_switch_on = document.getElementById('fan_switch_on')
const fan_switch_off = document.getElementById('fan_switch_off')
const fan_1 = document.getElementById("fan");
const fan_2 = document.getElementById("fan_spin");

//Bed
const bed = document.getElementById('bed');
const bed_made = document.getElementById('bed_made');

//Time & Date
const today = new Date();
const hour = today.getHours();
const minutes = today.getMinutes();

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
}

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
    laptop_window.style.display = state.screen === "open" ? "block" : "none";

    //Movie App
    buttons.forEach(button => {
        button.style.display = state.movie_app === "open" ? "block" : "none";
    })
    folders.forEach(folder => {
        folder.style.display = state.activeFolder === folder.id ? "block" : "none";
    })
    if (state.movie_app === "open" && state.activeFolder === null) {folder_2.style.display = "block"};

    //Curtains
    if (hour >= 6 && hour < 12) {state.day = "morning"}
    if (hour >= 12 && hour < 18) {state.day = "afternoon"}
    if (hour >= 18 && hour < 21) {state.day = "evening"}
    if (hour >= 21 || hour < 6) {state.day = "night"}

    morning.style.display = state.day === "morning" && state.curtain === "open" ? "block" : "none"
    afternoon.style.display = state.day === "afternoon" && state.curtain === "open" ? "block" : "none"
    evening.style.display = state.day === "evening" && state.curtain === "open" ? "block" : "none"
    night.style.display = state.day === "night" && state.curtain === "open" ? "block" : "none"
    curtain_closed.style.display = state.curtain === "closed" ? "block" : "none";
    
    //Fan (Work on seperating this part better, no timers in render())
    fan_switch_off.style.display = state.fan === "off" ? "block" : "none";
    fan_switch_on.style.display = state.fan === "on" ? "block" : "none";
    if (state.fan === "on") {
        let frame1 = true

        if(state.runInterval === null) {
            state.runInterval = setInterval(() => {
                fan_1.style.display = frame1 === true ? "block": "none";
                fan_2.style.display = frame1 === false ? "block" : "none";
                frame1 = !frame1; //opposite
            }, state.fanSpeed)
        }
    }

    //Bed
    bed.style.display = state.bed === "messy" ? "block" : "none";
    bed_made.style.display = state.bed === "tidy" ? "block" : "none";
}

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
    console.log("Laptop opened.")
    state.screen = "open"
    render()
})

document.addEventListener("click", (e) => {
    if (!laptop_window.contains(e.target) && state.screen === "open") {
        console.log("Laptop closed.")
        state.screen = "closed"
        state.activeFolder = null
        state.movie_app = "closed"
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
    on_sound.play()
    render()
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









