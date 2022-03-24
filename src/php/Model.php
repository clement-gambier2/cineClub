<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    /**
     * Connexion à la base de données
     */
    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    /**
     * Renvoie la liste de tous les films (id, titre)
     */
    public static function get_films() {
        $sql = "SELECT * FROM film";
        $query = self::$pdo->prepare($sql);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Renvoie la liste de tous les membres (id, nom)
     */
    public static function get_membres() {
        $sql = "SELECT * FROM membre";
        $query = self::$pdo->prepare($sql);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Renvoie la liste de toutes les notes (id_membre, id_film, note)
     */
    public static function get_notes() {
        $sql = "SELECT * FROM note";
        $query = self::$pdo->prepare($sql);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Renvoie la liste de toutes les notes mises par un membre (id_film, titre, note)
     */
    public static function get_notes_membre($id) {
        $sql = "SELECT film.id, film.titre, note.valeur FROM film inner join note on film.id = note.id_film WHERE note.id_membre = $id";
        $query = self::$pdo->prepare($sql);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Renvoie la liste de toutes les notes d'un film (id_membre, nom, note)
     */
    public static function get_notes_film($id) {
        $sql = "SELECT membre.id, membre.nom, note.valeur FROM membre inner join note on membre.id = note.id_membre WHERE note.id_film = $id";
        $query = self::$pdo->prepare($sql);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Ajoute ou modifie la note d'un membre pour un film
     * S'il y a déjà une note pour ce film par le même utilisateur, la note est modifiée
     * Si la valeur est -1 (choix "-" dans le menu déroulant), la note est supprimée
     */
    public static function set_note($id_membre, $id_film, $valeur) {
        if ($valeur == "-1") {
            $sql = "DELETE FROM note WHERE id_membre = $id_membre AND id_film = $id_film";
        } else {
            $sql = "INSERT INTO note (id_membre, id_film, valeur) VALUES ($id_membre, $id_film, $valeur) ON DUPLICATE KEY UPDATE valeur = $valeur";
        }
        $query = self::$pdo->prepare($sql);
        return $query->execute();
    }

    /**
     * Ajoute un nouveau membre
     * (id est incrémenté automatiquement)
     */
    public static function add_membre($nom) {
        $sql = "INSERT INTO membre (nom) VALUES ('$nom')";
        $query = self::$pdo->prepare($sql);
        return $query->execute();
    }

    /**
     * Ajoute un nouveau film
     * (id est incrémenté automatiquement)
     */
    public static function add_film($titre) {
        $sql = "INSERT INTO film (titre) VALUES ('$titre')";
        $query = self::$pdo->prepare($sql);
        return $query->execute();
    }

    /**
     * Supprime un membre (et toutes les notes associées)
     */
    public static function delete_membre($id) {
        $sql = "DELETE FROM membre WHERE id = $id";
        $query = self::$pdo->prepare($sql);
        return $query->execute();
    }

    /**
     * Supprime un film (et toutes les notes associées)
     */
    public static function delete_film($id) {
        $sql = "DELETE FROM film WHERE id = $id";
        $query = self::$pdo->prepare($sql);
        return $query->execute();
    }
}

// on initialise la connexion $pdo
Model::init_pdo();

?>
