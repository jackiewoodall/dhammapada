document.getElementById("dp-body").onload = function(){ dpScript.Ready(); };

dpScript = {
    Ready : function() {
        // register button handlers
        document.getElementById("btn-random").onclick = this.Random;
        document.getElementById("btn-next").onclick = this.Next;
        document.getElementById("btn-previous").onclick = this.Previous;
        document.getElementById("btn-url").onclick = this.UrlDump;
        
        dpScript.OnLoad();
    },
    
    OnLoad : function() {
        // populate the episode selection drop down
        var options = '';
        for (var episode in dammapada_episode) {
            var lo = dammapada_episode[episode][0];
            var hi = dammapada_episode[episode][1];
            
            if(dammapada_verses.hasOwnProperty(lo)) {
                options += '<option value="' + episode + '">' + 
                episode + ' (' + lo + ' - ' + hi + ')' +
                '</option>';
            }
        }
        
        if(options.length > 0) {
            var element = document.getElementById("select-episode");
            element.innerHTML = options;
            element.onchange = dpScript.EpisodeSelectionChange;
        }
        
        // go to a verse
        dpScript.StartVerse();
    },
    
    StartVerse : function() {
        
        // URL parameter parse
        var params = window.location.search.substring(1).split('&');
        if(params.length>0) {
            for(var i = 0; i < params.length; i++) {
                var param = params[i].split('=');
                
                for(var j = 0; j < param.length; j+=2) {
                    if(param[j] == "v") {
                        var verse = param[j+1];
                        if(verse>0 && verse<= Object.keys(dammapada_verses).length){
                            dpScript.SetVerse(verse);
                            return;
                        }
                    }
                }
            }
        }
        
        dpScript.Random();
    },
    
    UrlDump : function() {
        var url = window.location.href;
        
        var i = url.indexOf('?');
        if(i>0) {
            url = url.substring(0,i);
        }
        
        url = url + "?v=" + dpScript._currentVerse;
        
        document.getElementById("txtUrl").innerHTML = url;
    },
    
    EpisodeSelectionChange : function() {
        var element = document.getElementById("select-episode");
        var episode = element.value;
        var verse = dammapada_episode[episode][0];
        dpScript.SetVerse(verse);
    },
    
    Next : function() {
        var verses = Object.keys(dammapada_verses).length;
        var current = dpScript._currentVerse + 1;
        current = Math.min(verses, current);
        
        dpScript.SetVerse(current);
    },
    
    Previous : function() {
        var current = dpScript._currentVerse - 1;
        current = Math.max(1, current);
        
        dpScript.SetVerse(current);
    },
    
    Random : function() {
        var verses = Object.keys(dammapada_verses).length;
        
        do {
            var num = 1 + Math.floor(Math.random() * verses);
        } while(num == dpScript._currentVerse);
        
        if( num > 0 ) {
            dpScript.SetVerse(num);
        }
    },
    
    SetVerse : function(num) {
        if( num === dpScript._currentVerse) {
            return;
        }
        
        var text = dammapada_verses[num];

        if(text.length > 0 ) {
            dpScript._currentVerse = num;
            document.getElementById("dp-verse-number").innerHTML = num.toString();
            document.getElementById("dp-passage").innerHTML = text;
            
            dpScript.UpdateEpisode();
        }
    },
    
    UpdateEpisode : function() {
        for (var episode in dammapada_episode) {
            var lower = dammapada_episode[episode][0];
            var upper = dammapada_episode[episode][1];
            
            if(dpScript._currentVerse >= lower && dpScript._currentVerse <= upper ) {
                document.getElementById("dp-episode").innerHTML = episode;
                break;
            }
        }
    },    
    
    _currentVerse : -1
};
