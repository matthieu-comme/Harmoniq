$(document).ready(() => {
    // touches du clavier correspondant à celles du piano
    const keyArray = ['q','z','s','e','d','f','t','g','y','h','u','j']; 
    const touches = $('.touche').toArray(); // tableau de div, les touches du piano
    var activeNote = []; // notes jouées
    var time = 0;
    var score = 0;
    const Notes = {
        DO: 0,
        REb: 1,
        RE: 2,
        MIb: 3,
        MI: 4,
        FA: 5,
        SOLb: 6,
        SOL: 7,
        LAb: 8,
        LA: 9,
        SIb: 10,
        SI: 11
    };
    const gammeMajeure = [0, 2, 4, 5, 7, 9, 11];
   // affichage du nom des notes sur les touches 
   $('.value').hide();
   var isVisibleNote = false;
   $('#btnValue').click(function() {
        if (isVisibleNote) {
            $('.value').hide();
            isVisibleNote = false;
        }
        else {
            $('.value').show();
                isVisibleNote = true;
        }
   })

   // affiche les notes pressées
   function displayNotes() {
        $('#displayPressedNote').text(activeNote.toString());
   }
   // retourne vrai si l'accord saisi est l'accord demandé, faux sinon
   function isValidAccord() {
        if(activeNote.length != accord.length)
            return false;
        var res = true;
        activeNote.forEach(note => {
            if(!accord.includes(note))
                res = false;
        });
        return res;
    }
   // affiche si l'accord est correct ou non
   function displayValidAccord() {
    if(isValidAccord()) {
        var string = 'OUI';
        updateScore();
        $('#btnAccord').trigger("click");
    }
    else 
        var string = 'NON';
    $('#validAccord').text(string);
   }
   // affiche tout
   function displayHUD() {
                displayNotes();  
                displayValidAccord();  
   }   

   // colore la touche jouée et l'ajoute au tableau
   $(document).keydown(function(event) { 
        var key = event.key;
        if(keyArray.includes(key)) {
            var index = keyArray.indexOf(key);
            var pressedTouche = touches[index];
            var note = getNote(pressedTouche);            
            $(pressedTouche).addClass('pressedNote');  
            if(!activeNote.includes(note)) {
                activeNote.push(note);
                displayHUD();        
            }
        //var audio = new Audio('sons/' + note + '.mp3');
        //audio.play();
        }
    })

    // décolore la touche relachée et la retire du tableau
    $(document).keyup(function(event) { 
        var key = event.key;
        if(keyArray.includes(key)) {
            var index = keyArray.indexOf(key);
            $(touches[index]).removeClass('pressedNote');
            var note = getNote(touches[index]);
            var i = activeNote.indexOf(note);
            activeNote.splice(i,1);
            displayHUD();
        }       
    })

    // retourne le nom de la note
  function getNote(touche) {
    return $(touche).data('note');
  } 
  var accord = ['', '', '']

  function getAccordMajeur() {
    var i = parseInt(Math.random() * 12);
    var j = (i + 4) % 12;
    var k = (i + 7) % 12;
    accord[0] = getNote(touches[i]);
    accord[1] = getNote(touches[j]);
    accord[2] = getNote(touches[k]);
    var question = "Accord Majeur " + getNote(touches[i]);
    var reponse = accord.toString();
    $('#questionAccord').text(question);
    $('#reponseAccord').text(reponse);
  }
  $('#btnAccord').click(function() {
        getAccordMajeur();
  })

  function updateTimer() {
    time++;
    $('#timer').text("Temps : " + time + " sec");
  }
  function updateScore() {
        score++;
        $('#score').text("Score : " + score);
  }

  window.setInterval(updateTimer, 1000);
  });