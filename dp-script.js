document.getElementById("dp-body").onload = function(){ dpScript.Ready(); };

dpScript = {
    Ready : function() {
        // register button handlers
        document.getElementById("btn-random").onclick = this.Random;
        document.getElementById("btn-next").onclick = this.Next;
        document.getElementById("btn-previous").onclick = this.Previous;
        
        dpScript.OnLoad();
    },
    
    OnLoad : function() {
        // populate the episode selection drop down
        var options = '';
        for (var episode in dammapada_episode) {
            options += '<option value="' + episode + '">' + episode + '</option>';
        }
        
        if(options.length > 0) {
            var element = document.getElementById("select-episode");
            element.innerHTML = options;
            element.onchange = dpScript.EpisodeSelectionChange;
        }
        
        // go to a random verse
        dpScript.Random();
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
