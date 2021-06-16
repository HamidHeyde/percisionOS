var viewPage={};

viewPage.setGameOnPage=function(gameData){
if (!gameData){
    gameData={};
    gameData.pic = '../images/gameDefault.png';
    gameData.title = 'Game Title';
    gameData.releaseDate ='2020';
    gameData.description =`
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`;
}

var game = `<div class="gameInfo">
        <div class="gamePic"
            style="background-image: url(${gameData.pic});">
        </div>
        <div class="gameDetails">
            <div class="title">${gameData.title}</div>
            <div class="releaseDate">${gameData.releaseDate}</div>
            <div class="description">${gameData.description}</div>
        </div>
    </div>`;

document.getElementsByClassName('gameCard')[0].innerHTML = game;

}

viewPage.setThePage = async function(){
    
    if (!viewPage['loading']){

        viewPage['loading']=true;
        var theVariable = window.location.pathname.split('/view/')[1];
        viewPage['id'] = theVariable;

        var base = window.location.origin;
        await axios({
            method: "get",
            url: base+"/api/getGame",
            params:{"_id":viewPage['id']},
            
        })
        .then(function(res){
            var data  = (typeof(res.data.message)=="undefined")?false:res.data.message;
            if (data){
                viewPage.setGameOnPage(data);
            }else{
                app.showModal('error','Something went wrong!',"Incoming data not valid");
            }
            viewPage['loading']=false;

        }).catch(function(err){
            viewPage['loading']=false;
            viewPage.setGameOnPage(null);
            app.showModal('error','Something went wrong!',"Game Does not exist");
        });
    }

}

viewPage.setAddNewButton = function(){
    
    var btnAddNew = document.getElementById('addNewButton');
    btnAddNew.addEventListener('click',function(){
        app.gotoPage('');
    });
};

app.init = async function(){
    app.isOnline();
    app.setModalCloseButton();
    viewPage.setAddNewButton();
    if (app.globals.online){
        await viewPage.setThePage();
    }else{
        viewPage.setGameOnPage(null);
        app.showModal(
            'error',
            'No Internet',
            'If you want to see the game pictures, you need to connect to the Internet and refresh the page!');   
    }
};

app.init();