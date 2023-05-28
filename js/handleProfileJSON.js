var accountsAPI = "http://localhost:3000/accounts";

//=============================show Profile=============================================

function showProfile(){
    renderAccountToProfile(getAccountfromJSON());
}

function getAccountfromJSON(){
    return JSON.parse(sessionStorage.getItem('accountSS'));
}

function renderAccountToProfile(accountJson){
    var swingProfile = document.querySelector('.row');
    swingProfile.innerHTML = `
    <div class="col-md-5 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <div class="avatar">
                <img class="rounded-circle" width="300px" height="300px" src="${accountJson.avatar}">
                <input type="file" hidden name="">
                <div class="changeAvatar">change your avatar</div>
            </div>
            <span style="margin-top: 45px;" class="font-weight-bold">${accountJson.username}</span>
            <span class="text-black-50">${accountJson.email}</span><span> </span>
        </div>
    </div>
    <div class="col-md-7 border-right">
        <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
            </div>
            <div class="row mt-3">
                <div class="col-md-12">
                    <label class="labels">Username</label>
                    <input type="text" class="form-control" readonly value="${accountJson.username}">
                </div>
                <div class="col-md-12">
                    <label class="labels">Email</label>
                    <input id="email" type="text" class="form-control" placeholder="enter address line 1" value="${accountJson.email}"></div>
                <div class="col-md-12">
                    <label class="labels">Job</label>
                    <select name="job" id="job" class="form-control">
                        <option ${accountJson.job == 'Student'?'selected':''} value="Student">Student</option>
                        <option ${accountJson.job == 'Graduated student'?'selected':''} value="Graduated student">Graduated student</option>
                        <option ${accountJson.job == 'Overseas student'?'selected':''} value="Overseas student">Overseas student</option>
                        <option ${accountJson.job == 'Teacher'?'selected':''} value="Teacher">Teacher</option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="labels">Number of completed quiz</label><a href="#">View</a>
                    <input type="text" class="form-control" placeholder="" readonly value="${accountJson.numberQuiz}">
                </div>
                <div class="col-md-12">
                    <label class="labels">Bio</label>
                    <textarea id="bio" type="text" class="form-control" placeholder="Add a Bio" rows="4" cols="50"
                        value="">${accountJson.bio}</textarea>
                </div>
                <div class="col-md-12"><label class="labels">List Wrong question</label><a href="#">View</a></div>
            </div>
            <div class="mt-5 text-center">
                <button class="btn btn-primary profile-button">Save Profile</button>
            </div>
        </div>
    </div>
    `
}

showProfile();

//=========================Update profile===================================================

var urlImage = '';
function choiceImageForm(){
    const input = document.querySelector('input[type="file"]');
    const avatar = document.querySelector('img');

    avatar.addEventListener('click',()=>{
        input.click();
    })

    input.addEventListener('change', ({target})=>{
        const file = target.files[0];
        showFile(file);
        //console.log(file);
    })

    function showFile(file){
        let fileType = file.type;
        let validExtensions = ['image/jpeg','image/jpg','image/png'];
        if(validExtensions.includes(fileType)){
            let fileReader = new FileReader();
            fileReader.onload = function(){
                avatar.src = fileReader.result; 
                urlImage = fileReader.result; 
            }
            fileReader.readAsDataURL(file);
        }
    }
}

function updateProfile(updatedProfile,e){
    sessionStorage.setItem("accountSS",JSON.stringify(updatedProfile));
    alert('Update Your Profile successfully')
    var options = {
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(updatedProfile)
    }
    
    fetch(accountsAPI+'/'+updatedProfile.id,options)
        .then(function(response){
            if(response.ok){
                e.preventDefault();
            }
        })
}

function validatorEmail(email){
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return false;
    return true;
}

function handleUpdateProfile(){
    choiceImageForm();
    var firstProfile = getAccountfromJSON();
    var email = document.getElementById('email');
    var job = document.getElementById('job');
    var bio = document.getElementById('bio');
    var save = document.querySelector('button');

    save.addEventListener('click',(e)=>{
        e.preventDefault();
        if(validatorEmail(email.value)){
            firstProfile.email = email.value;
            firstProfile.job = job.value;
            firstProfile.bio = bio.value;
            firstProfile.avatar = (urlImage == '')?firstProfile.avatar:urlImage;
            console.log('ssssssssss')
            updateProfile(firstProfile,e);
        }else{
            alert('email is invalid!')
        }
    });
}

handleUpdateProfile();