<?php

require_once 'Conf.php';
require_once 'Model.php';

$action = $_POST['action'] ?? null;
switch ($action) {
    case 'delete':
        $id_membre = $_POST['membre'] ?? null;
        $id_film = $_POST['film'] ?? null;
        if ($id_membre != null) {
            echo json_encode(Model::delete_membre($id_membre));
        } else if ($id_film != null) {
            echo json_encode(Model::delete_film($id_film));
        }
        break;

    case 'add':
        $nom = $_POST['nom'] ?? null;
        $titre = $_POST['titre'] ?? null;
        if ($nom != null) {
            echo json_encode(Model::add_membre($nom));
        } else if ($titre != null) {
            echo json_encode(Model::add_film($titre));
        }
        break;

    case 'update':
        $id_membre = $_POST['membre'] ?? null;
        $id_film = $_POST['film'] ?? null;
        $note = $_POST['note'] ?? null;
        if ($id_membre != null && $id_film != null && $note != null) {
            echo json_encode(Model::set_note($id_membre, $id_film, $note));
        }
        break;
}
