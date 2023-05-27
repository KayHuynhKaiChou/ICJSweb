var accountsAPI = "http://localhost:3000/accounts";

function executeProfile(){
    getAccountfromJSON();
}

function getAccountfromJSON(){
    var account = JSON.parse(sessionStorage.getItem('accountSS'));
    renderAccountToProfile(account);
}

function renderAccountToProfile(accountJson){
    var swingProfile = document.querySelector('.row');
    swingProfile.innerHTML = `
    <div class="col-md-5 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <div class="avatar">
                <img class="rounded-circle" width="300px" src="${accountJson.avatar}">
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
                <div class="col-md-12"><label class="labels">Username</label><input type="text" class="form-control"
                        readonly value="${accountJson.username}"></div>
                <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control"
                        placeholder="enter address line 1" value="${accountJson.email}"></div>
                <div class="col-md-12"><label class="labels">Job</label><input type="text" class="form-control"
                        placeholder="enter address line 2" value="${accountJson.job}"></div>
                <div class="col-md-12"><label class="labels">Number of completed quiz</label><a
                        href="#">View</a><input type="text" class="form-control" placeholder="" readonly value="${accountJson.numberQuiz}">
                </div>
                <div class="col-md-12">
                    <label class="labels">Bio</label>
                    <textarea type="text" class="form-control" placeholder="Add a Bio" rows="4" cols="50"
                        value="${accountJson.bio}"></textarea>
                </div>
                <div class="col-md-12"><label class="labels">List Wrong question</label><a href="#">View</a></div>
            </div>
            <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save
                    Profile</button></div>
        </div>
    </div>
    `
}

executeProfile();