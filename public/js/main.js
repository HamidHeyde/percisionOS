const app={};
app.globals={};

app.isOnline = function (){
    app.globals['online'] = window.navigator.onLine;
};

app.gotoPage = function (page){
    var base = window.location.origin;
    window.location.href=`${base}/${page}`;
};

app.showModal = function(type,title,message){
    var primaryColor = "#059669";
    var errorColor = "#DC2626";
    var SuccessColor = "#059669";
    document.getElementsByClassName('modalWrapper')[0].style.display='flex';
    document.getElementsByClassName('appWrapper')[0].style.opacity='0%';
    var checkImage = "url('../images/check.svg')"
    var errorImage = "url('../images/error.svg')";
    var modalImage = document.getElementsByClassName('messageImage')[0];
    var modalTitle = document.getElementsByClassName('messageTitle')[0];
    var modalMessage = document.getElementsByClassName('messageText')[0];
    var modalButton = document.getElementsByClassName('modalButton')[0];
    modalImage.style.backgroundImage = (type == 'error') ? errorImage : checkImage;
    modalImage.style.borderColor = (type == 'error') ? errorColor : SuccessColor;
    modalTitle.innerText = title;
    modalMessage.innerText = message;
    modalButton.style.backgroundColor = (type == 'error') ? errorColor : primaryColor;
    modalButton.style.borderColor = (type == 'error') ? errorColor : primaryColor;
};

app.closeModal = function(){
    document.getElementsByClassName('modalWrapper')[0].style.display='none';
    document.getElementsByClassName('appWrapper')[0].style.opacity='100%';
};

app.setModalCloseButton = function(){
    document.getElementsByClassName('modalButton')[0].addEventListener('click',function(){
        app.closeModal();
    });
};