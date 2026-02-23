const draggables = document.querySelectorAll('.objects');

draggables.forEach(item => {
    item.addEventListener('mousedown', dragStart);
});

let selected = null;
let offsetX = 0;
let offsetY = 0;

function dragStart(e) {
    selected = e.target;
    offsetX = e.clientX - selected.offsetLeft;
    offsetY = e.clientY - selected.offsetTop;
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

function dragMove(e) {
    if (!selected) return;
    selected.style.left = e.clientX - offsetX + 'px';
    selected.style.top = e.clientY - offsetY + 'px';
}

function dragEnd() {
    selected = null;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
}