import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

iziToast.show({
    titleColor: '',
    titleSize: '',
    titleLineHeight: '',
    message: '',
    messageColor: '',
    messageSize: '',
    messageLineHeight: '',
    backgroundColor: '',
    theme: 'light', // dark
    color: '', // blue, red, green, yellow
    icon: '',
    iconText: '',
    iconColor: '',
    iconUrl: null,
    image: '',
    imageWidth: 50,
    maxWidth: null,
    zindex: null,
    layout: 1,
    balloon: false,
    close: true,
    closeOnEscape: false,
    closeOnClick: false,
    displayMode: 0, // once, replace
    position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    target: '',
    targetFirst: true,
    timeout: 5000,
    rtl: false,
    animateInside: true,
    drag: true,
    pauseOnHover: true,
    resetOnHover: false,
    progressBar: true,
    progressBarColor: '',
    progressBarEasing: 'linear',
    overlay: false,
    overlayClose: false,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'fadeInUp',
    transitionOut: 'fadeOut',
    transitionInMobile: 'fadeInUp',
    transitionOutMobile: 'fadeOutDown',
    buttons: {},
    inputs: {},
    onOpening: function () {},
    onOpened: function () {},
    onClosing: function () {},
    onClosed: function () {}
});


const formElem = document.querySelector(".form");
const labels = document.querySelectorAll('.form label');
const btn = document.querySelector(".form button");
labels[0].classList.add('label-delay')
btn.classList.add('btn-snackbar');
console.log(btn);

formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    const delay = Number(e.target.elements.delay.value);
    const state = e.target.elements.state.value;
    const promis = createdPromis(delay, state);
    promis.then((message) => {
        iziToast.show({
    message: `${message}`,
    messageColor: '#FFFFFF',
    color: 'green',
    position: 'topRight',
    closeOnEscape: true,
    closeOnClick: true,
    theme: 'dark',
    backgroundColor: '#59A10D'
});
    })
    .catch((err) => {
        iziToast.show({
    message: `${err}`,
    color: 'red',
    position: 'topRight',
    closeOnEscape: true,
    closeOnClick: true,
    theme: 'dark',
    backgroundColor: '#EF4040'
});
    });
    formElem.reset();
})

function createdPromis (delay, state){
    let promis = new Promise((resolve, reject) => {
        setTimeout(() =>{
                    if(state === 'fulfilled'){
                        resolve(`✅ Fulfilled promise in ${delay} ms`);
                    } else {
                        reject(`❌ Rejected promise in ${delay} ms`)};
    }, delay);
});
        return promis;
};
