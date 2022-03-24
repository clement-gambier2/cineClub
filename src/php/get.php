<?php

require_once 'Conf.php';
require_once 'Model.php';

switch ($_GET['q'] ?? null) {
    case 'all':
        $membres = Model::get_membres();
        $films = Model::get_films();
        $notes = Model::get_notes();
        echo json_encode(array(
            "membres" => $membres, 
            "films" => $films,
            "notes" => $notes
        ));
        break;
    case 'notes':
        $id_membre = $_GET['membre'] ?? null;
        $id_film = $_GET['film'] ?? null;
        if ($id_membre != null) {
            echo json_encode(Model::get_notes_membre($id_membre));
        } else if ($id_film != null) {
            echo json_encode(Model::get_notes_film($id_film));
        }
        break;
    case 'film':
        $films = Model::get_films();
        echo json_encode(array(
            "films" => $films,
        ));
        break;
    case 'membre':
        $membres = Model::get_membres();
         echo json_encode(array(
            "membres" => $membres,
        ));
        break;
}