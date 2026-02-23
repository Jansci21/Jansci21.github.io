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
