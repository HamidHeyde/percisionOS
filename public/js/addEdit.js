var addEditPage = {};

addEditPage.setGameOnPage = function(data){
    if(data){
        document.getElementById("gamePic").value = data.pic;
        document.getElementById("gameTitle").value = data.title;
        document.getElementById("gameReleaseDate").value = data.releaseDate;
        document.getElementById("gameDescription").value = data.description;
    }
};

addEditPage.setThePage = async function(){
    var theVariable = window.location.pathname.split('/addEdit/')[1];
    addEditPage['id'] = theVariable;
    if(theVariable =='add'){
        addEditPage['type'] = 'add';
        addEditPage['method'] = 'post';
        addEditPage['url'] = '/api/addGame';
    }else{
        addEditPage['type'] = 'edit';
        addEditPage['method'] = 'put';
        addEditPage['url'] = '/api/updateGame';
    }

    if (addEditPage['type'] == 'edit'){
        if (!addEditPage['loading']){

            addEditPage['loading']=true;
    
            var base = window.location.origin;
            await axios({
                method: "get",
                url: base+"/api/getGame",
                params:{"_id":addEditPage['id']},
                
            })
            .then(function(res){
                var data  = (typeof(res.data.message)=="undefined")?false:res.data.message;
                if (data){
                    addEditPage.setGameOnPage(data);
                }else{
                    app.showModal('error','Something went wrong!',"Incoming data not valid");
                }
                addEditPage['loading']=false;
    
            }).catch(function(err){
                addEditPage['loading']=false;
                app.showModal('error','Something went wrong!',"Game Does not exist");
            });
        }
    }
}

addEditPage.setTheButton = function(){

    var btnTheButton = document.getElementById('theButton');
    if(addEditPage['type'] == 'add')
    {btnTheButton.innerText='Add New Game'}
    else
    {btnTheButton.innerText='Update The Game'}

    btnTheButton.addEventListener('click',function(){
        addEditPage.handleDataSubmission();
    });
}


addEditPage.handleDataSubmission = async function(){

    var gamePic = document.getElementById("gamePic").value.trim();
    var gameTitle = document.getElementById("gameTitle").value.trim();
    var gameReleaseDate = document.getElementById("gameReleaseDate").value.trim();
    var gameDescription = document.getElementById("gameDescription").value.trim();


    var formData={
        "_id":addEditPage['id'],
        "pic":gamePic,
        "title":gameTitle,
        "releaseDate":gameReleaseDate,
        "description":gameDescription
    };

    var base = window.location.origin;
    await axios({
        method: addEditPage['method'],
        url: base+addEditPage['url'],
        data:formData
    })
    .then(function(res){
        app.showModal('Success', 'Congratulations!',"Your Data Saved Successfully!");
        app.gotoPage("");

    }).catch(function(err){
        if (typeof(err.response)=="undefined"){
            app.showModal('error','Something went wrong!',"Request timeout!");
        }else{
            app.showModal('error','Something went wrong!',err.response.data.message);
        }
    });
};

addEditPage.setAddNewButton = function(){
    
    var btnAddNew = document.getElementById('addNewButton');
    btnAddNew.addEventListener('click',function(){
        app.gotoPage('');
    });
};

app.init = function(){
    app.isOnline();
    app.setModalCloseButton();
    addEditPage.setThePage();
    addEditPage.setTheButton();
    addEditPage.setAddNewButton();
};

app.init();