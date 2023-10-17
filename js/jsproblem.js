
//problem if any btn disapear in html 
// Uncaught TypeError: Cannot read property 'addEventListener' of null

    loginBtn.addEventListener('click',function()
{
    alert('login');
});

signUpBtn.addEventListener('click',function()
{
    alert('signUp');
});

//solveing
if (loginBtn)
{
    loginBtn.addEventListener('click',function()
{
    alert('login');
});
}

if(signUpBtn)
{
    signUpBtn.addEventListener('click',function()
    {
        alert('signUp');
    });
}