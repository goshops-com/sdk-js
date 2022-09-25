/*
 * This is the sdk template introduced in javascript-sdk-design
 *
 * Template Init
 * ==============
 * This is a template that contains init function
 *
 * To find out more sdk template, please visit javascript-sdk-design homepage
 * https://github.com/hueitan/javascript-sdk-design
 */

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


(function (window) {

    // declare
    var gs = {};

    const URL = 'https://go-search-api.dev.goshops.com/reco/';
    
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    gs.init = function (code) {
        // ...
        
        console.log('GoShops Init <', code,'>');

        gs.id = uuidv4();
        console.log(gs.id);

    };

    gs.session = function(userId){
        gs.user = userId;
    }

    gs.rank = async function(items){

        var raw = JSON.stringify({
            "event": "ranking",
            "id": gs.id,
            "items": items,
            "user": gs.user,
            "session": gs.user,
            "timestamp": new Date().getTime()
        }); 

        try{

            const response = await fetch(URL + "rank/xgboost", {
                method: 'POST',
                headers: headers,
                body: raw,
                redirect: 'follow'
            })
            
            let respJson = response.json()

            const rawFeedback = JSON.stringify({
                "event": "ranking",
                "fields": [],
                "id": gs.id,
                "items":items,
                "user": gs.user,
                "session": gs.user,
                "timestamp": new Date().getTime()
            });
              
            await fetch(URL + "feedback", {
                method: 'POST',
                headers: headers,
                body: rawFeedback,
                redirect: 'follow'
            })

            return respJson;

        }catch(e){
            console.log(e)
        }
        
          
    }

    // define your namespace myApp
    window.gs = gs;
    // gs.init();

})(window, undefined);
