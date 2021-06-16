var gameDAO = require('../DAOs/game.DAO');

var game={};


game.getAllGames = async function(req,res,next){
    try{
        var gameData = await gameDAO.getAllGames();
        
        if (gameData){
            res.status(200).send({'message': gameData});
        }else{
            res.status(422).send({'message': 'the Id for the Game is not right'});
        }

    }catch(e){

        next(e.message);
    }
}


game.getGame = async function(req,res,next){
    try{
        const id = req.query['_id'].trim();
        var gameData = await gameDAO.getGame(id);
        
        if (gameData){
            res.status(200).send({'message': gameData});
        }else{
            res.status(422).send({'message': 'the Id for the Game is not right'});
        }

    }catch(e){

        next(e.message);
    }
}

game.addGame = async function(req,res,next){
    
    try{
        var pic = (typeof(req.body.pic)!== 'undefined')?req.body.pic.trim():false;
        var title = (typeof(req.body.title)!== 'undefined')?req.body.title.trim():false;
        var releaseDate = (typeof(req.body.releaseDate)!== 'undefined')?req.body.releaseDate.trim():false;
        var description = (typeof(req.body.description)!== 'undefined')?req.body.description.trim():false;

        if(pic && title && releaseDate && description){
            var gameData={
                "pic":pic,
                "title":title,
                "releaseDate":releaseDate,
                "description":description
            };

            //Insert user
            var insertResult = await gameDAO.addGame(gameData);
                
            (insertResult.success)
            ?res.status(200).send({'message': 'Game Added Successfully'})
            :res.status(500).send({'message': 'Could Not Insert User'});

        }else{
            res.status(422).send({'message': 'Missing field!'})
        }

    }catch(e){
        
        next(e.message);
    }
}

game.updateGame = async function(req,res,next){

    try{
        
        var id = (typeof(req.body._id)!== 'undefined')?req.body._id.trim():false;
        var pic = (typeof(req.body.pic)!== 'undefined')?req.body.pic.trim():false;
        var title = (typeof(req.body.title)!== 'undefined')?req.body.title.trim():false;
        var releaseDate = (typeof(req.body.releaseDate)!== 'undefined')?req.body.releaseDate.trim():false;
        var description = (typeof(req.body.description)!== 'undefined')?req.body.description.trim():false;

        if(id && pic && title && releaseDate && description){
            var gameData={
                "_id":id,
                "pic":pic,
                "title":title,
                "releaseDate":releaseDate,
                "description":description
            };

            var updateResults = await gameDAO.updateGame(gameData);
            
            (updateResults.success)
            ?res.status(200).send({'message': 'Updated SuccessFully!'})
            :res.status(500).send({'message': 'Problem with Updating the counter!'});
        }else{
            res.status(422).send({'message': 'Missing field!'})
        }

    }catch(e){
        
        next(e.message);
    }
}

game.deleteGame = async function(req,res,next){
    
    try{
        const id = req.query['_id'].trim();
        var deleteResults = await gameDAO.deleteGame(id);
            
            (deleteResults.success)
            ?res.status(200).send({'message': 'Deleted SuccessFully!'})
            :res.status(500).send({'message': 'Problem with Updating the counter!'});

    }catch(e){

        next(e.message);
    }
}


module.exports= game;