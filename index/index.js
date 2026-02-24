const switch_off = document.getElementById('switch_off')
const switch_on = document.getElementById('switch_on')
const dark_mode = document.getElementById('dark_mode')
const laptop_light = document.getElementById('laptop_light')
const laptop_off = document.getElementById('laptop')
const laptop_on = document.getElementById('laptop_on')
const laptop_on_dark = document.getElementById('laptop_on_dark')
const mouse = document.getElementById('mouse');
const switch_on_sound = new Audio("index/index_img/switch_sound_on.mp3");
switch_on_sound.preload = "auto";
const switch_off_sound = new Audio("index/index_img/switch_sound_off.mp3")
switch_off_sound.preload = "auto";
const curtain_open = document.getElementById('curtain_open')
const curtain_closed = document.getElementById('curtain_closed')
const fan_switch_on = document.getElementById('fan_switch_on')
const fan_switch_off = document.getElementById('fan_switch_off')
const fan_1 = document.getElementById("fan");
const fan_2 = document.getElementById("fan_spin");
const bed = document.getElementById('bed')
const bed_made = document.getElementById('bed_made')


switch_off.addEventListener('click', () => { //light turn on
    switch_on_sound.play();
    document.body.style.backgroundColor = "whitesmoke";
    switch_off.style.display = "none";
    switch_on.style.display = "block";
    dark_mode.style.display = "none";
    mouse.style.opacity = "100%";
    laptop_light.style.display = "none"; //change this to none later
    if (laptop_on_dark.style.display === "block") {
        laptop_on.style.display = "block";
        laptop_on_dark.style.display = "none";
        
    }
})

switch_on.addEventListener('click', () =>{ //light turn off
    switch_off_sound.play();
    document.body.style.backgroundColor = "black";
    switch_off.style.display = "block";
    switch_on.style.display = "none";
    dark_mode.style.display = "block";
    mouse.style.opacity = "0%"
    if (laptop_on.style.display === "block") {
        laptop_light.style.display = "block";
        laptop_on_dark.style.display = "block";
        laptop_on.style.display = "none";
    }
    
})


laptop_off.addEventListener('click', () => {
    if (dark_mode.style.display === "block") {
        laptop_on_dark.style.display = "block"
        laptop_light.style.display = "block"
        laptop_off.style.display = "none"
        console.log("laptop dark on")
    } else {
        laptop_off.style.display = "none";
        laptop_on.style.display = "block";
        console.log("laptop light on")
    }
})

laptop_on.addEventListener('click', () => {
    laptop_off.style.display = "block";
    laptop_on.style.display = "none";
    laptop_light.style.display = "none"
    laptop_on_dark.style.display = "none";
    console.log("laptop light off, laptop dark off")
})

laptop_on_dark.addEventListener('click', () => {
    laptop_off.style.display = "block";
    laptop_on.style.display = "none";
    laptop_on_dark.style.display = "none";
    laptop_light.style.display = "none"
    console.log("laptop light off, laptop dark off")
})

mouse.addEventListener("mouseenter", () => {
    // Check if either laptop is on
    if (laptop_on.style.display === "block" || laptop_on_dark.style.display === "block") {
        mouse.style.filter = "brightness(60%)";
        mouse.style.cursor = "pointer"; // clickable
    } else {
        mouse.style.cursor = "default"; // normal arrow
    
    }
});
mouse.addEventListener("mouseleave", () => {
    // Reset brightness when mouse leaves
    mouse.style.filter = "brightness(100%)";
});

mouse.addEventListener("click", () => {
    if (laptop_on.style.display === "block" || laptop_on_dark.style.display === "block") {
        window.open("https://www.google.com", "_blank");
    }
})

curtain_open.addEventListener('click', () => {
    curtain_closed.style.display = "block";
    curtain_open.style.display = "none";
})

curtain_closed.addEventListener('click', () => {
    curtain_closed.style.display = "none";
    curtain_open.style.display = "block";
})
let fanInterval = null;
fan_switch_off.addEventListener('click', () => {
    switch_on_sound.play();

    fan_switch_on.style.display = "block";
    fan_switch_off.style.display = "none";

    let showingFirst = true;

        if (!fanInterval) { //start only if its null
        fanInterval = setInterval(() => { // the id of the currently running interval stored here.
            if (showingFirst) {
                fan_1.style.display = "none";
                fan_2.style.display = "block";
            } else {
                fan_1.style.display = "block";
                fan_2.style.display = "none";
            }
    showingFirst = !showingFirst; // flips true/false
}, 120);
}
});

fan_switch_on.addEventListener('click', () => {
    switch_off_sound.play();
    fan_switch_off.style.display = "block";
    fan_switch_on.style.display = "none";

    clearInterval(fanInterval); //stop running interval and dont call it anymore
    fanInterval = null; //reset so it can be started again

    // Reset to default frame
    fan_1.style.display = "block";
    fan_2.style.display = "none";
})

bed.addEventListener('click', () => {
    bed.style.display  = "none";
    bed_made.style.display  = "block";
})

bed_made.addEventListener('click', () => {
    bed.style.display  = "block";
    bed_made.style.display  = "none";
})






