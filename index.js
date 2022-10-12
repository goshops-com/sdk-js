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


/************************** */
/** Recommendation Widget load **/
/****************************/

function ShowRecoLoadingSpinner(id,show){
    let spinner = document.getElementById(id);
    spinner.className = show? "gs_loading" : '';
}

function createRecommendationItem(reco_main_container,item,opts){

}

function createRecommendationWidget(id,opts){
    // create main container
    let div = document.getElementById(id);
    var reco_container = document.createElement('div');
    reco_container.className = 'gs_reco_container';
    reco_container.id = `gs_reco_container_${opts.scenario}`;
    
    let spinner = document.createElement('div');
    spinner.id = `gs_reco_loader_${opts.scenario}`;
    
    div.appendChild(spinner);
    div.appendChild(reco_container);
}

/************************** */
/** End Recommendation Widget load **/
/****************************/


/************************** */
/** Search Widget load **/
/****************************/

function executeSpeechToText(evt, opts){


    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    //speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    let mic_button = document.getElementById(`gs_search_mic_button_${opts.project}`);
    mic_button.classList.add('fa-beat');
    recognition.start();

    recognition.onresult = function(event) {
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at position 0.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object 
        var speechResult = event.results[0][0].transcript.toLowerCase();
        
        if(event.results[0][0].confidence > 0.6){
            let input = document.getElementById(`gs_search_input_${opts.project}`);
            input.value = event.results[0][0].transcript.toLowerCase();
            input.focus();
        }

        let mic_button = document.getElementById(`gs_search_mic_button_${opts.project}`);
        mic_button.classList.remove('fa-beat');

        console.log('Confidence: ' + event.results[0][0].confidence);
      }
    
      recognition.onspeechend = function() {
        mic_button.classList.remove('fa-beat');
        recognition.stop();
      }
    
      recognition.onerror = function(event) {
        mic_button.classList.remove('fa-beat');
        console.log('Recognition errror: ' + JSON.stringify(event));
      }
}

function ShowLoadingSpinner(show){
    let spinner = document.getElementById('gs_search_loader');
    spinner.className = show? "gs_loading" : '';
}

function ShowImageSlideInSlides(element_class, action, event){

    let slideIndex = 0;
    
    let slides = document.getElementsByClassName(element_class);
    
    let active_slide = Array.from(slides).filter(s=> s.style.display == 'block');

    if(active_slide.length > 0) {
        slideIndex = parseInt(active_slide[0].id.split('_')[0]);
    }

    if(action == 'sum' && slideIndex < slides.length -1){
        slideIndex++;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex].style.display = "block";
    }

    if(action == 'dec' && slideIndex > 0){
        slideIndex--;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex].style.display = "block";
    }
} 

function onSearchResultMainItemClicked(evt,item,opts){
    console.log(evt.srcElement.classList.contains ('gs_search_next'));

    if(item.link && !evt.srcElement.classList.contains ('gs_search_next') && !evt.srcElement.classList.contains ('gs_search_prev')){
        window.location.href = item.link;
    }
}

function createSearchMainResultItem(search_resullt_main_container,item,opts){

    //REMOVE 
    item.images = item.imgs;

    let item_main_result_item = document.createElement('div');
    item_main_result_item.className = 'gs_search_main_result_item_container';

    if(item.images && item.images.length > 0 ){
        if(item.images.length == 1){
            const item_img = document.createElement('img');
            item_img.className = 'gs_search_main_result_item_img';
            item_img.src = item.images[0].url;
            
            item_main_result_item.appendChild(item_img);

        }else{
            let main_slides_container = document.createElement('div');
            main_slides_container.className = 'gs_search_images_slideshow-container';

            for(let i=0; i < item.images.length;  i++) {
                let img_slide_container = document.createElement('div');
                img_slide_container.className = `gs_search_images_slide gs_fade gs_search_images_slide_${item.id}`;
                img_slide_container.id = `${i}_gs_search_images_slide_${item.id}`

                if(i==0){
                    img_slide_container.style.display = 'block';
                }

                let img_slide = document.createElement('img');
                img_slide.className = 'gs_search_main_result_item_img';
                img_slide.src = item.images[i].url;
                  

                img_slide_container.appendChild(img_slide);

                main_slides_container.appendChild(img_slide_container);
            }

            let gs_prev = document.createElement('a');
            gs_prev.className = 'gs_search_prev';
            gs_prev.innerHTML = '&#10094;'
            

            gs_prev.addEventListener('click', (evt) => ShowImageSlideInSlides(`gs_search_images_slide_${item.id}`,'dec',evt), false);

            let gs_next = document.createElement('a');
            gs_next.className = 'gs_search_next';
            gs_next.innerHTML = '&#10095;'

            gs_next.addEventListener('click', (evt) => ShowImageSlideInSlides(`gs_search_images_slide_${item.id}`,'sum',evt), false);

            main_slides_container.appendChild(gs_prev);
            main_slides_container.appendChild(gs_next);

            item_main_result_item.appendChild(main_slides_container);
            
        }
    }else{
        const item_img = document.createElement('img');
        item_img.className = 'gs_search_main_result_item_img_not_found';
        item_main_result_item.appendChild(item_img);
    
    }
    
    const item_name_p = document.createElement('p');
    item_name_p.className = 'gs_search_main_result_item_name_p';
    item_name_p.innerHTML = item.name;

    item_main_result_item.appendChild(item_name_p);

    const item_price_p = document.createElement('p');
    item_price_p.className = 'gs_search_main_result_item_price_p';
    item_price_p.innerHTML = `$ ${item.price}`;

    item_main_result_item.appendChild(item_price_p);

    item_main_result_item.addEventListener('mousedown', (evt) => onSearchResultMainItemClicked(evt, item,opts), false);

    search_resullt_main_container.appendChild(item_main_result_item);
}

function debounce(func, delay = 250) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function loadFontAwesomeLibrary(){

    // check if fa already included
    let span = document.createElement('span');
    span.className = 'fa';
    span.style.display = 'none';
    document.body.insertBefore(span, document.body.firstChild);
  
    function css(element, property) {
        return window.getComputedStyle(element, null).getPropertyValue(property);
    }
  
    if (css(span, 'font-family') !== 'FontAwesome') {
        let headHTML = document.head.innerHTML;
        headHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">';
        document.head.innerHTML = headHTML;
    }

    document.body.removeChild(span);    
}

function initInstaSearchResults(opts){
    const myNode = document.getElementById(`gs_search_insta_result_container_${opts.project}`);
    myNode.innerHTML = '';
}

function initSearchMainResults(opts){
    const myNode = document.getElementById(`gs_search_results_main_container_${opts.project}`);
    myNode.innerHTML = '';
}

function loadSearchStats(result, opts){
    const stats_p = document.getElementById(`gs_search_stats_p_${opts.project}`);
    stats_p.innerHTML = `<strong> ${result.estimatedTotalHits} </strong> resultados encontrados en <strong> ${result.processingTimeMs} </strong> ms`;
}

function initSearchStats(opts){
    const stats_p = document.getElementById(`gs_search_stats_p_${opts.project}`);
    stats_p.innerHTML = '';
}

function onSearchInstaResultItemClicked(item, opts){
    initInstaSearchResults(opts);
    if(item.link){
        window.location.href=item.link;
    }
}

function createInstaSearchResultItem(parent,item, opts){
    
    item.images = item.imgs;

    let item_insta_result_item = document.createElement('div');
    item_insta_result_item.className = 'gs_search_insta_result_item';
    
    const item_img = document.createElement('img');

    if(item.images && item.images.length > 0) {
        item_img.className = 'gs_search_insta_result_item_img';
        item_img.src = item.images && item.images.length > 0 ? item.images[0].url : '';
    } 
    else {
        item_img.className = 'gs_search_insta_result_item_img_not_found';
    }
    
    item_insta_result_item.appendChild(item_img);

    const item_p = document.createElement('p');
    item_p.className = 'gs_search_insta_result_item_p';
    item_p.innerHTML = item._formatted &&  item._formatted.name ? item._formatted.name : item.name;

    item_insta_result_item.appendChild(item_p);

    item_insta_result_item.addEventListener('mousedown', (evt) => onSearchInstaResultItemClicked(item, opts) , false);

    parent.appendChild(item_insta_result_item);
}

function invokeImageSearch(file,opts){

    ShowLoadingSpinner(true);
    let formData = new FormData();
    formData.append('uploaded_file', file);

    const url = `${opts.url}/image-search/${opts.project}`;
    const params = {
        headers: {},
        method: 'POST',
        body : formData 
    };
        
    fetch(url, params)
        .then((r) => r.json())
        .then((data) => {
            initInstaSearchResults(opts);
            initSearchMainResults(opts);
            if(data){
                console.log(data);
                initSearchStats(opts);
                loadSearchStats({
                    processingTimeMs: data.processingTimeMs,
                    estimatedTotalHits: data.estimatedTotalHits
                },opts)

                const main_result_container = document.getElementById(`gs_search_results_main_container_${opts.project}`);
                for (let i=0; i < data.hits.length; i++){
                    createSearchMainResultItem(main_result_container, data.hits[i], opts)
                }

            }
        })
        .catch((e) => {
        console.log('image search error',e);
        })
        .finally(() => {
            ShowLoadingSpinner(false);
    });
}

function invokeNeuralSearch(text,opts){

    ShowLoadingSpinner(true);
    const url = `${opts.url}/search/${opts.project}?input=${text}&pipelines=neural,instant`;

    const params = {
        headers: {
          "content-type":"application/json; charset=UTF-8",
        },
        method: 'GET',
    };
    
    fetch(url, params)
        .then((r) => r.json())
        .then((data) => {
            initInstaSearchResults(opts);
            initSearchMainResults(opts);
            if(data && data.hits){
                console.log('neural',data);
                initSearchStats(opts);

                loadSearchStats({
                    processingTimeMs: data.processingTimeMs,
                    estimatedTotalHits: data.estimatedTotalHits
                },opts)

                const main_result_container = document.getElementById(`gs_search_results_main_container_${opts.project}`);
                for (let i=0; i < data.hits.length; i++){
                    createSearchMainResultItem(main_result_container, data.hits[i], opts)
                }

            }
        })
        .catch((e) => {
            console.log('error neural: ', e);
        })
        .finally(() => {
            ShowLoadingSpinner(false);
        });
}

function invokeInstantSearch(text,opts){
    const url = `${opts.url}/search/${opts.project}?input=${text}&pipelines=instant`;

    const params = {
        headers: {
          "content-type":"application/json; charset=UTF-8",
        },
        method: 'GET',
    };

    fetch(url, params)
        .then((r) => r.json())
        .then((data) => {
            initInstaSearchResults(opts);
            initSearchMainResults(opts);

            if(data && data.hits){
                console.log('instant',data);

                let insta_result_container = document.getElementById(`gs_search_insta_result_container_${opts.project}`);

                for (let i=0; i < data.hits.length; i++){
                    createInstaSearchResultItem(insta_result_container, data.hits[i], opts)
                }
            }
        })
        .catch((e) => {
            console.log('instant error',e);
        })
        .finally(() => {
        
        });
}

function onSearchInputKeydown(event) {
    
    if(event.which === 13 && event.srcElement.value!='' ){
        event.srcElement.blur()
    }
}

function onSearchInputBlur(event,opts){
    
    initInstaSearchResults(opts);

    if(event.srcElement.value!='') {
        invokeNeuralSearch(event.srcElement.value, opts)
    }
}

function onSearchInputFocus(event,opts){
    
    if(event.srcElement.value!='') {
        invokeInstantSearch(event.srcElement.value,opts);
    }
}

function onSearchInputOnChange(event,opts){
    if(event.srcElement.value!='') {
        invokeInstantSearch(event.srcElement.value,opts);
    }else{
        initSearchStats(opts);
        initInstaSearchResults(opts);
        initSearchMainResults(opts);
    }
}

function onSearchCameraButtonClicked(event, opts){
    const img_upload = document.getElementById(`gs_camera_input_${opts.project}`);
    img_upload.click();
}

function onSearchImageUpload(event, opts){
    const img_upload = document.getElementById(`gs_camera_input_${opts.project}`);

    if(img_upload.files && img_upload.files.length > 0){
        let imgContainer = document.getElementById(`gs_search_img_uploaded_container_${opts.project}`);
        let img = document.getElementById(`gs_search_img_uploaded_${opts.project}`);
        let input = document.getElementById(`gs_search_input_${opts.project}`);
        let p = document.getElementById(`gs_search_p_uploaded_${opts.project}`);

        input.disabled = true;
        input.value = '';
        input.placeholder = '';
        imgContainer.style.display = 'inline-flex';
        img.src = URL.createObjectURL(img_upload.files[0]);
        p.innerHTML = img_upload.files[0].name;

        invokeImageSearch(img_upload.files[0],opts);
    }
}

function onSearchImageRemoveUploaded(event,opts){
    let imgContainer = document.getElementById(`gs_search_img_uploaded_container_${opts.project}`);
    let img = document.getElementById(`gs_search_img_uploaded_${opts.project}`);
    let input = document.getElementById(`gs_search_input_${opts.project}`);
    let p = document.getElementById(`gs_search_p_uploaded_${opts.project}`);
    

    input.disabled = false;
    input.value = '';
    input.placeholder = 'Buscar...';

    imgContainer.style.display = 'none';
    img.src = '';
    p.innerHTML = '';

    initInstaSearchResults(opts);
    initSearchStats(opts);
    initSearchMainResults(opts);
}

function createSearchWidget(id,opts){

    loadFontAwesomeLibrary();
    
    // create main container
    let div = document.getElementById(id);
    var search_container = document.createElement('div');
    search_container.className = 'gs_search_container';
    div.appendChild(search_container);

    // create search input
    var input = document.createElement('input');
    input.className = 'gs_search_input';
    input.id = `gs_search_input_${opts.project}`;
    input.maxlength = "100";
    input.placeholder = "Buscar...";
    input.autocomplete = "off";
    
    // search input events
    const debouncedUserInput = debounce(onSearchInputOnChange,500);
    input.addEventListener('keydown', onSearchInputKeydown, false);
    input.addEventListener('blur', (evt) => onSearchInputBlur(evt,opts) , false);
    input.addEventListener('keyup', (evt) => debouncedUserInput(evt,opts) , false);
    input.addEventListener('unfocus', (evt) => onSearchInputBlur(evt,opts) , false);
    input.addEventListener('focus', (evt) => onSearchInputFocus(evt,opts) , false);
    
    search_container.appendChild(input);

    // search img uploaded
    var div_search_img = document.createElement('div');
    div_search_img.className = 'gs_search_img_uploaded_container';
    div_search_img.style.display = 'none';
    div_search_img.id = `gs_search_img_uploaded_container_${opts.project}`;

    var img_search_img = document.createElement('img');
    img_search_img.className = 'gs_search_img_uploaded';
    img_search_img.id = `gs_search_img_uploaded_${opts.project}`;

    div_search_img.appendChild(img_search_img);

    var p_search_img = document.createElement('p');
    p_search_img.id = `gs_search_p_uploaded_${opts.project}`;
    p_search_img.className = 'gs_search_img_uploaded_p';

    div_search_img.appendChild(p_search_img);

    var i_search_img = document.createElement('i');
    i_search_img.className = 'fa fa-times-circle';
    
    i_search_img.addEventListener('mousedown', (evt) => onSearchImageRemoveUploaded(evt,opts), false);
    div_search_img.appendChild(i_search_img);

    search_container.appendChild(div_search_img);

    // search camera button
    var camera_button = document.createElement('button');
    camera_button.className = 'gs_search_camera_button';
    var camera_icon = document.createElement('i');
    camera_icon.className = 'fa fa-camera gs_search_camera_icon';
    camera_button.appendChild(camera_icon);

    camera_button.addEventListener('click', (evt) => onSearchCameraButtonClicked(evt,opts) , false);
    
    search_container.appendChild(camera_button);
    
    var camera_img_button = document.createElement('input');
    camera_img_button.style.display='none';
    camera_img_button.type = 'file';
    camera_img_button.id = `gs_camera_input_${opts.project}`;

    camera_img_button.addEventListener('change', (evt) => onSearchImageUpload(evt,opts) , false);

    search_container.appendChild(camera_img_button);
    
    // search microphone button
    var mic_button = document.createElement('button');
    mic_button.className = 'gs_search_mic_button';
    mic_button.id = `gs_search_mic_button_${opts.project}`;
    var mic_icon = document.createElement('i');
    mic_icon.className = 'fa fa-microphone gs_search_mic_icon';
    mic_button.appendChild(mic_icon);
    
    mic_button.addEventListener('click', (evt) => executeSpeechToText(evt,opts) , false);
    
    search_container.appendChild(mic_button);

    // instant search results container
    var insta_result_container = document.createElement('div');
    insta_result_container.className = 'gs_search_insta_result_container';
    insta_result_container.id = `gs_search_insta_result_container_${opts.project}`

    div.appendChild(insta_result_container);

    // Stats container
    var stats_container = document.createElement('div');
    stats_container.className = 'gs_search_stats_container';

    var stats_p = document.createElement('p');
    stats_p.className = 'gs_search_stats_p';
    stats_p.id = `gs_search_stats_p_${opts.project}`;

    stats_container.appendChild(stats_p);

    div.appendChild(stats_container);

    let spinner = document.createElement('div');
    spinner.id = 'gs_search_loader';
    
    div.appendChild(spinner);

    // Results main container
    var results_main_container = document.createElement('div');
    results_main_container.className = 'gs_search_results_main_container';
    results_main_container.id = `gs_search_results_main_container_${opts.project}`;

    div.appendChild(results_main_container);

}


/*********************************/
/** End Search Widget creation **/
/*******************************/

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

    const RECO_URL = 'https://go-search-api.dev.goshops.com/reco/';
    const SEARCH_URL = 'https://go-search-api.dev.goshops.com';

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

    gs.feedback = function(event, obj){
        var raw = JSON.stringify({
            "event": "interaction",
            "type": event,
            "id": uuidv4(),
            "fields": obj.fields || [],
            "ranking" : gs.ranking,
            "item": obj.item + "",
            "user": gs.user,
            "session": gs.user,
            "timestamp": new Date().getTime()
        }); 

        fetch(RECO_URL + "feedback", {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        }).then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    gs.setUser = function(userId){
        gs.props.user = userId;
        gs.save();
    }

    gs.rank = async function(items){

        let id = uuidv4();
        gs.ranking = id;

        let array = [];
        items.forEach(function(item){
            array.push(item)
        })
        var raw = JSON.stringify({
            "event": "ranking",
            "id": id,
            "items": array,
            "user": gs.user,
            "session": gs.user,
            "timestamp": new Date().getTime()
        }); 

        try{

            const response = await fetch(RECO_URL + "rank/xgboost", {
                method: 'POST',
                headers: headers,
                body: raw,
                redirect: 'follow'
            })
            
            let respJson = await response.json()

            respJson.items = respJson.items.map(function(i){
                return { id : i.item, score : i.score}
            })

            const rawFeedback = JSON.stringify({
                "event": "ranking",
                "fields": [],
                "id": id,
                "items":items,
                "user": gs.user,
                "session": gs.user,
                "timestamp": new Date().getTime()
            });
              
            await fetch(RECO_URL + "feedback", {
                method: 'POST',
                headers: headers,
                body: rawFeedback,
                redirect: 'follow'
            })

            return respJson.items;

        }catch(e){
            console.log(e)
        }
    }

    gs.combinedSearch= async function(text,opts){
        if (!opts) opts = {}

        if(!opts.url)
            opts.url = SEARCH_URL;
        
        const url = `${opts.url}/search/${opts.project}?input=${text}&pipelines=instant,neural`;

        const params = {
            headers: {
                "content-type":"application/json; charset=UTF-8",
            },
            method: 'GET',
        };
        
        const response = await fetch(url, params)

        let respJson = await response.json()

        return respJson;
    }

    gs.neuralSearch = async function(text,opts){
        if (!opts) opts = {}

        if(!opts.url)
            opts.url = SEARCH_URL;
        
        const url = `${opts.url}/search/${opts.project}?input=${text}&pipelines=neural`;

        const params = {
            headers: {
                "content-type":"application/json; charset=UTF-8",
            },
            method: 'GET',
        };
        
        const response = await fetch(url, params)

        let respJson = await response.json()

        return respJson;
    }
    
    gs.instantSearch = async function(text,opts){
        if (!opts) opts = {}

        if(!opts.url)
            opts.url = SEARCH_URL;
        
        const url = `${opts.url}/search/${opts.project}?input=${text}&pipelines=instant`;

        const params = {
            headers: {
                "content-type":"application/json; charset=UTF-8",
            },
            method: 'GET',
        };
        
        const response = await fetch(url, params)

        let respJson = await response.json()

        return respJson.hits;
    }

    gs.imageSearch = async function(file, opts) {
        if (!opts) opts = {}

        if(!opts.url)
            opts.url = SEARCH_URL;

        let formData = new FormData();
        formData.append('uploaded_file', file);

        const url = `${opts.url}/image-search/${opts.project}`;

        const params = {
            headers: {},
            method: 'POST',
            body : formData 
        };
        
        const response = await fetch(url, params)

        let respJson = await response.json()

        return respJson;
    }

    gs.loadSearchWidget = function(widget,opts){
        if (!opts) opts = {}

        if(!opts.url)
            opts.url = SEARCH_URL;
        
        createSearchWidget(widget, opts);
    }

    gs.loadRecommendationWidget = function(widget,opts){
        if (!opts) opts = {}

        if(!opts.url)
            opts.url = RECO_URL;
        
        createRecommendationWidget(widget, opts);
    }

    window.gs = gs;

})(window, undefined);
