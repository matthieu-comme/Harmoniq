<!DOCTYPE html>
<html>
    <head>
        <title>LE PIANO</title>
        <link rel="stylesheet" href="style.css">
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
	    <script src="script.js"></script>
    </head>

    <body>
        <main>
            <p id="validAccord">ceci est un piano</p>
            <p id="displayPressedNote">Note pressée</p>
            <p id="questionAccord">Question</p>
            <p id="reponseAccord">Réponse</p>
            <button id="btnValue">Affichage Notes</button>
            <button id="btnAccord">Nouvel Accord</button>
            <div id="piano">
            <?php
            $notes = array("do","do#","ré", "ré#", "mi", "fa", "fa#","sol", "sol#", "la", "la#", "si");
            foreach($notes as $note) {
                $class = (str_contains($note, '#'))?'noire':'blanche';
                echo '<div class="touche '.$class.'"" data-note="'.$note.'"><p class="value">'.$note.'</p></div>';
            }
            ?>
            </div>
        </main>
    </body>
</html>