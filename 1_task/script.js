const btn = document.querySelector('.j-btn-test');
let page = document.querySelector('.btn--light');

btn.addEventListener('click', () => {
    page.classList.toggle('btn--dark');
});