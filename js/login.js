var url = location.href;
console.log(url)
var navbar = document.getElementById('navbar');

if(url.includes('?')){
    navbar.innerHTML += `
        <div class='sign_in_up'>
            <div class='info-user'>hello, ${url.split('=')[1]}</div>
            <a href="index.html" class="btn btn-primary px-3 d-none d-lg-block">Logout</a>
        </div>
    `
    var home = document.querySelector('.home');
    home.href = url;
}else{
    navbar.innerHTML += '<a href="" class="btn btn-primary px-3 d-none d-lg-block">Login</a>';
    var tags_a = document.querySelectorAll('a');
    tags_a.forEach((tag_a)=>{
        tag_a.addEventListener('click',(e)=>{
           e.preventDefault();
           createForm();
        })
    })
}

function createForm(){
   var form = document.querySelector('.swing-form');
   var cover = document.querySelector('.cover');
    cover.style.display = 'block';
    form.style.display = 'flex';
    form.style.justifyContent = 'center';
    form.style.alignItems = 'center';
}
