var ObjectID = require('mongodb').ObjectID;

var gameDAO={
    games:null
};

/**
 * Finds a user in the `users` collection
 * @param {string} conn - The connection string for db
 * @returns {collection} Returns the game collection from db or throws an Error
 */
 gameDAO.injectDB = async function(conn){
    try{
        if (gameDAO.games) {
            return
        }

        gameDAO.games = await conn.db(process.env.DB_NAME).collection("games");
    }
    catch(e){
        throw new Error(e.message);
    }
};


/**
 * gets all games in the `games` collection
 * @returns {Object | null} Returns either all games or nothing
 */
 gameDAO.getAllGames =  async function() {
    try{
        var games = await gameDAO.games.find({}).toArray();
        return( games );
        
    }catch(e){
        throw new Error(e.message);
    }
}

/**
 * Finds a game in the `games` collection
 * @param {string} id - The id of the desired game
 * @returns {Object | null} Returns either a single game or nothing
 */
 gameDAO.getGame =  async function(id) {
    try{
        var dataId = new ObjectID(id);
        return( await gameDAO.games.findOne({ "_id": dataId }))
        
    }catch(e){
        throw new Error(e.message);
    }
}

/** 
 * @param {Object} data - game Data
 * @returns {Object} Returns either a {success:true} or throws an Error
 */
 gameDAO.updateGame =  async function(gameData) {
try {
    var dataId = new ObjectID(gameData._id);
    delete gameData._id;

    await gameDAO.games.updateOne(
    { "_id": dataId },
    { $set: gameData })

    return ({'success': true});

} catch (e) {
    throw new Error(e.message);
}
}

/**
 * @param {Game Info} userInfo - The information of the game to add
 * @returns {DAOResponse} Returns either a "success" or throws an Error
 */
 gameDAO.addGame = async function(gameInfo) {
    try {
        await gameDAO.games.insertOne(gameInfo);
        return ({'success': true});

    } catch (e) {
        throw new Error(e.message);
    }
}


/**
 * @param {string} id - The id of the desired game
 * @returns {DAOResponse} Returns either a "success" or throws an Error
 */
 gameDAO.deleteGame =  async function(id) {
    try{
        var dataId = new ObjectID(id);
        await gameDAO.games.deleteOne({ "_id": dataId });
        return ({'success': true});
        
    }catch(e){
        return ({'success': false});
    }
}


module.exports = gameDAO;