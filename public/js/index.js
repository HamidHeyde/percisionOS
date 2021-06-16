var viewPage = {};

viewPage.createGameObject=function(gameData){
if (!gameData){
    gameData={};
    gameData._id = '1234';
    gameData.pic = '../images/gameDefault.png';
    gameData.title = 'Game Title';
    gameData.releaseDate ='2020';
    gameData.description =`
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`;
}

var game = `<div class="gameCard">
        <div class="gameId">${gameData._id}</div>
        <div class="gameOptions">
            <div class="optionButton view">View</div>
            <div class="optionButton edit">Edit</div>
            <div class="optionButton delete">Delete</div>
        </div>
        <div class="gameInfo">
        <div class="gamePic"
            style="background-image: url(${gameData.pic});">
        </div>
        <div class="gameDetails">
            <div class="title">${gameData.title}</div>
            <div class="releaseDate">${gameData.releaseDate}</div>
            <div class="description">${gameData.description}</div>
        </div>
        </div>
    </div>`;

return game;
// document.getElementsByClassName('gameCard')[0].innerHTML = game;

}

viewPage.setGameOnPage=function(data){
    var results='';
    if (!data){
        results = viewPage.createGameObject(null);
    }else{
        data.map(function(item){
            results+=viewPage.createGameObject(item);
        })
    }

    document.getElementsByClassName('gameWrapper')[0].innerHTML = results;
}
viewPage.handleEditClick = function(div){
    var idDiv = div.parentNode.parentNode.children[0].innerText;
    app.gotoPage(`addEdit/${idDiv}`);
};


viewPage.handleViewClick = function(div){
    var idDiv = div.parentNode.parentNode.children[0].innerText;
    app.gotoPage(`view/${idDiv}`);
};


//=======================//=======================
viewPage.handleDeleteClick = async function(div){
    var idDiv = div.parentNode.parentNode.children[0].innerText;
    var base = window.location.origin;
        await axios({
            method: "delete",
            url: base+"/api/deleteGame",
            params:{"_id":idDiv},
            
        })
        .then(function(res){
            console.log(res.data);
            app.showModal('Success','Deleted!',"The Game Was Removed Successfully");
            app.gotoPage('');

        }).catch(function(err){
            console.log(err);
            app.showModal('error','Something went wrong!',"Game Could not be deleted");
        });
};

viewPage.setDeleteButton = function(){
 
    const inputObjects = document.getElementsByClassName('delete');
    const inputs = Object.values(inputObjects);
    inputs.forEach(function(element){
        element.addEventListener('click',function(){
            viewPage.handleDeleteClick(element);
        }); 
    });
}

viewPage.setEditButton = function(){
 
    const inputObjects = document.getElementsByClassName('edit');
    const inputs = Object.values(inputObjects);
    inputs.forEach(function(element){
        element.addEventListener('click',function(){
            viewPage.handleEditClick(element);
        }); 
    });
}

viewPage.setViewButton = function(){
 
    const inputObjects = document.getElementsByClassName('view');
    const inputs = Object.values(inputObjects);
    inputs.forEach(function(element){
        element.addEventListener('click',function(){
            viewPage.handleViewClick(element);
        }); 
    });
}

viewPage.setAddNewButton = function(){
    
    var btnAddNew = document.getElementById('addNewButton');
    btnAddNew.addEventListener('click',function(){
        app.gotoPage('addEdit/add');
    });
};

viewPage.setThePage = async function(){
    if (!viewPage['loading']){

        viewPage['loading']=true;
        var theVariable = window.location.pathname.split('/view/')[1];
        viewPage['id'] = theVariable;

        var base = window.location.origin;
        await axios({
            method: "get",
            url: base+"/api/getAllGames",
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
};
app.init = async function(){
    app.isOnline();
    await viewPage.setThePage();
    viewPage.setEditButton();
    viewPage.setViewButton();
    viewPage.setDeleteButton();
    viewPage.setAddNewButton();
    app.setModalCloseButton();
    if (!app.globals.online){
     app.showModal(
        'error',
        'No Internet',
        'If you want to see the game pictures, you need to connect to the Internet and refresh the page!');   
    }
};

app.init();