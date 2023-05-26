var accountsAPI = "http://localhost:3000/accounts";

function checkAccount(account){
    fetch(accountsAPI)
        .then(response => response.json())
        .then(accountsJson => {
            accountsJson.forEach(accountJson => {
                if(account.username == accountJson.username 
                    && account.password == accountJson.password){  
                        sessionStorage.setItem('accountSS',JSON.stringify(accountJson));                      
                        window.location.href = location.href + `?username=${account.username}`;                                       
                    } 
            });
        })
}