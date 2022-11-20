const btn = document.querySelector('.btn');


btn.addEventListener('click', () => {
    let width = window.screen.width;
    let height = window.screen.height;
    alert(width + '*' + height)
});