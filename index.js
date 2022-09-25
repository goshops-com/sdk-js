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
    var gs = {
        props : {}
    };

    gs.log = function(str){
        if (gs && gs.debug){
            console.log(str);
        }
    }

    const URL = 'https://go-search-api.dev.goshops.com/reco/';
    const GS_SESSION = 'gs-session';
    const GS_PROPS = 'gs-props';

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    gs.init = function (code, opts) {
        // ...
        if (!opts) opts = {};

        gs.debug = opts.debug;

        gs.log('GoShops Init <', code,'>');

        gs.props = gs.load(); //load stored info

        if (!sessionStorage.getItem(GS_SESSION)){
            sessionStorage.setItem(GS_SESSION, uuidv4())
            gs.log('Init anon session', sessionStorage.getItem(GS_SESSION))
            gs.user = sessionStorage.getItem(GS_SESSION);
        }else{
            gs.user = sessionStorage.getItem(GS_SESSION);
        }
        
    };

    gs.save = function(){
        sessionStorage.setItem(GS_PROPS, JSON.stringify(gs.props))
    }
    gs.load = function(){
        try{
            return JSON.parse(sessionStorage.getItem(GS_PROPS))
        }catch(e){
            return {};
        }
    }


    gs.reset = function(){
        sessionStorage.removeItem(GS_SESSION);
        sessionStorage.removeItem(GS_PROPS);
    }

    gs.feeback = function(event, obj){
        var raw = JSON.stringify({
            "event": event,
            "id": uuidv4(),
            "fields": obj.fields || [],
            "ranking" : gs.ranking,
            "item": obj.item,
            "user": gs.user,
            "session": gs.user,
            "timestamp": new Date().getTime()
        }); 

        fetch(URL + "feedback", {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        })
    }
    gs.setUser = function(userId){
        gs.props.user = userId;
        gs.save();
    }

    gs.rank = async function(items){

        let id = uuidv4();
        gs.ranking = id;

        var raw = JSON.stringify({
            "event": "ranking",
            "id": id,
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
                "id": id,
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

    window.gs = gs;

})(window, undefined);
