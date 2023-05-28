var accountsAPI = "http://localhost:3000/accounts";


function getAccountfromJSON(){
    return JSON.parse(sessionStorage.getItem('accountSS'));
}

function updateProfile(updatedProfile){
    sessionStorage.setItem("accountSS",JSON.stringify(updatedProfile));
    var options = {
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(updatedProfile)
    }
    
    fetch(accountsAPI+'/'+updatedProfile.id,options)
        .then(function(response){
            response.json()
        })
}
