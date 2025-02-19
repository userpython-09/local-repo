const form = document.getElementById('form');
const full_name = document.getElementById('fullname');
const first_name = document.getElementById('first');
const middle_name = document.getElementById('middle');
const last_name = document.getElementById('last');

function fullName(){
    full_name.innerText = `${first_name.value} ${middle_name.value} ${last_name.value}`;
}

first_name.addEventListener('input', fullName);
middle_name.addEventListener('input', fullName);
last_name.addEventListener('input', fullName);

function showError(label_id) { 
    let label = document.getElementById(label_id);
    label.style.display = 'inline';

    setTimeout(() => {
        label.style.display = 'none';
    }, 3000);
}

function changeBorder(id){
    let input_id = document.getElementById(id);
    input_id.classList.add('error_border');

    setTimeout(() =>{
        input_id.classList.remove('error_border');
    }, 3000);
}


function digitRemover(){
    const address = document.getElementById('address');
    let new_address = '';
    for(let i of address.value){
        if(!/^\d$/.test(i)){
            new_address += i;
        }
    }
    address.value = new_address;
}

document.getElementById('address').addEventListener('blur', digitRemover);

document.getElementById('dob').addEventListener('input', function(){
    const Dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - Dob.getFullYear();
    const monthdiff = today.getMonth() - Dob.getMonth();
    const datediff = today.getDate() - Dob.getDate();

    if(monthdiff<0 || (monthdiff===0 && datediff<0)){
        age--;
    }
    document.getElementById('age').innerText = `Age : ${age}`;
});

document.getElementById('toggle').addEventListener('click', ()=>{
    const password = document.getElementById('password');
    if(password.type === 'password'){
        password.type = 'text';
    }
    else{
        password.type = 'password';
    }
});



form.addEventListener('submit', (e) => {
    let error_count = 0;
    const first_name = document.getElementById('first').value;
    const middle_name = document.getElementById('middle').value;
    const last_name = document.getElementById('last').value;
    const phone_number = document.getElementById('phn').value;
    const photo = document.getElementById('photo');
    const dob = document.getElementById('dob').value;
    const agreement = document.getElementById('agreement');
    const password = document.getElementById('password').value;

    let numberOfChecked = 0;
    ['playing', 'reading', 'singing', 'dancing'].forEach(hobby => {
        if (document.getElementById(hobby).checked) {
            numberOfChecked++;
        }
    });
    const Dob = new Date(dob);
    let today = new Date();
    let file = photo.files[0];
    let maxsize = 50 * 1024;
    if(password.length < 6){
        error_count+=1;
        showError('password_error');
        changeBorder('password');
    }
    if(numberOfChecked<2){
        error_count+=1;
        showError('hobby_error');
    }
    if(!agreement.checked){
        error_count += 1;
        showError('agreement_error');
        changeBorder('agreement')
    }
    if(Dob>=today){
        error_count += 1;
        showError('dob_error');
    }
    if(file && file.size > maxsize){
        error_count += 1;
        showError('photo_error');
    }
    if(first_name.length<3 || !/^[a-zA-Z]+$/.test(first_name)){
        error_count += 1;
        showError('first_error');
        changeBorder('first');
    }
    if(middle_name.length<3 || !/^[a-zA-Z]+$/.test(middle_name)){
        if(middle_name.length != 0){
            error_count += 1;
            showError('middle_error');
            changeBorder('middle');
        }
    }
    if(last_name.length<3 || !/^[a-zA-Z]+$/.test(last_name)){
        error_count += 1;
        showError('last_error');
        changeBorder('last');
    }
    if(!(/^\d{10}$/.test(phone_number) || /^\d{3}-\d{3}-\d{4}$/.test(phone_number))){
        error_count += 1;
        showError('phn_error');
        changeBorder('phn');
    }
    if(error_count > 0){
        e.preventDefault();
    }
    else{
        if(!confirm('Do you want to submit the form ?')){
            e.preventDefault();
        }
    }
});

document.getElementById('reset').addEventListener('click', (e) =>{
    if(!confirm('Do you want to reset the form ?')){
        e.preventDefault();
    }
});

// Image Slider

const images = document.querySelectorAll('#images div');
let img_index = 0;
if(images.length > 0){
    images[0].classList.add('slideDisplay')
}

function nextImage(){
    img_index++;
    showSlide(img_index);
}
function prevImage(){
    img_index--;
    showSlide(img_index);
}
function showSlide(index){
    if(index<0){
        img_index = images.length-1;
    }
    else if(index>=images.length){
        img_index = 0
    }
    images.forEach(img => {
        img.classList.remove('slideDisplay');
    })
    images[img_index].classList.add('slideDisplay');
}

document.getElementById('prev').addEventListener('click', prevImage);
document.getElementById('next').addEventListener('click', nextImage);