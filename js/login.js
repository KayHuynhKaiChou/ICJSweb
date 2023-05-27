var url = location.href;
var navbar = document.getElementById('navbar');

var listMenu = document.querySelectorAll('.function');
var accountSS = sessionStorage.getItem('accountSS'); //accountSession
if(accountSS != undefined){
    var account = JSON.parse(accountSS);
    listMenu.forEach((tag_a) => {
        tag_a.href += `?username=${account.username}`;
        console.log(tag_a.href);
    })
}

if(url.includes('?')){
    navbar.innerHTML += `
        <div class='sign_in_up'>
            <img class='logo-user' src='img/defaultImage.png' />
            <div class='name-user'>${url.split('=')[1]}</div>
            <ul class='sub-menu_profile'>
                <li><a href="profile.html">Your profile</a></li>
                <li><a href="index.html">Logout</a></li>
            </ul>
        </div>
    `

    var list_menuUser = document.querySelector('.sub-menu_profile');
    var logoUser = document.querySelector('.logo-user');
    logoUser.onclick = (e)=>{
        console.log(e.target);
        console.log(list_menuUser.style.display)
        if(list_menuUser.style.display == 'none' || list_menuUser.style.display == ''){
            list_menuUser.style.display = 'block';
        }else{
            list_menuUser.style.display = 'none';
        }
    } 

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
