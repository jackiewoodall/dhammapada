document.getElementById("dp-body").onload = function(){ dpScript.Ready(); };

dpScript = {
    Ready : function() {
        // register button handlers
        document.getElementById("btn-random").onclick = this.Random;
        document.getElementById("btn-next").onclick = this.Next;
        document.getElementById("btn-previous").onclick = this.Previous;
        
        this.Random();
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
        
        var num = 1 + Math.floor(Math.random() * verses);
        
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
