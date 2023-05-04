<?php

header('Access-Control-Allow-Origin: http://localhost:8080');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Max-Age: 86400');



if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}


require_once '../vendor/autoload.php';
require_once "../classes/goods.php";
require_once "../classes/materials.php";

$app = new Silex\Application();













//для брендов:
$app->get('/materials/list.json', function () use ($app) {
    $material = new Materials;
    $list = $material->read();
    return $app->json($list);
});
$app->post('/materials/add-item', function () use ($app) {

    $data = json_decode(file_get_contents('php://input'),true);
    if ($data !== null && isset($data['name'])) {
        $name = $data['name'];
        if (strlen($name)) {
            $material = new Materials;
            try {
                $material->create(array("name" => $name));
                $lastid = $material->lastID();
                return $app->json(array("create-material" => "yes", "create-id" => $lastid));
            } catch (PDOException $e) {
                return $app->json(array("error" => $e->getMessage(), "create-material" => "no"));
            }
        } else {
            return $app->json(array("create-material" => "no"));
        }
    } else {
        return $app->json(array("create-material" => "no"));
    }

});

$app->post('/materials/update-item', function () use ($app) {
    $data = json_decode(file_get_contents('php://input'),true);
    $material = new Materials;
    $id = intval($data["id"]);
    $name = $data["name"];
    if ($material->exists($id) && strlen($name)) {
        try {
            $material->update(array("id" => $id, "name" => $name));
            return $app->json(array("name" => $name, "id" => $id));
        } catch (PDOException $e) {
            return $app->json(array("error" => $e->getMessage(),  "update-material" => "no"));
        }
    } else {
        return $app->json(array("update-material" => "no"));
    }
});

$app->post('/materials/delete-item', function () use ($app) {
    $data = json_decode(file_get_contents('php://input'),true);
    $material = new Materials;
    $id = intval($data["id"]);
    if ($material->exists($id)) {
        try {
            $material->delete($id);
            return $app->json(array("delete-material" => "yes", "id_delete" => $id));
        } catch (PDOException $e) {
            return $app->json(array("error" => $e->getMessage(), "delete-material" => "no"));
        }
    } else {
        return $app->json(array("delete-material" => "no"));
    }
});

//для студентов:

$app->get('/goods/list.json', function () use ($app) {
    $good = new Goods;
    $list = $good->readAll();
    return $app->json($list);
});
$app->post('/goods/add-item', function () use ($app) {
    $data = json_decode(file_get_contents('php://input'),true);
    $name = $data["name"];
    $id_material = intval($data["id_material"]);
    $description = ($data["description"]);
    $cost = intval(($data["cost"]));
    if (strlen($name)) {
        $good = new Goods;
        try {
            $good->create(array('name' => $name, "id_material" => $id_material, "description" => $description, "cost" => $cost));
            return $app->json(array("create-product" => $name, "id_material" => $id_material, "description" => $description, "cost" => $cost));
        } catch (PDOException $e) {
            return $app->json(array("error" => $e->getMessage(), "create-product" => "no"));
        }
    } else {
        return $app->json(array("create-product" => "no"));
    }
});
$app->post('/goods/update-item', function () use ($app) {

    $data = json_decode(file_get_contents('php://input'),true);

    $id = intval($data["id"]);
    $name = $data["name"];
    $id_material  = intval($data["id_material"]);
    $description = ($data["description"]);
    $cost = intval(($data["cost"]));
    $good = new Goods;
    if ($good->exists($id) && strlen($name)) {
        try {
            $good->update(array("id" => $id, "name" => $name, "description" => $description, "cost" => $cost, "id_material" => $id_material));
            return $app->json(array("name" => $name, "id" => $id, "description" => $description, "cost" =>$cost, "id_material" =>$id_material));
        } catch (PDOException $e) {
            return $app->json(array("error" => $e->getMessage(), "update-product" => "no"));
        }
    } else {
        return $app->json(array("update-product" => "no"));
    }
});

$app->post('/goods/delete-item', function () use ($app) {

    $data = json_decode(file_get_contents('php://input'),true);

    $id = intval($data["id"]);
    $good = new Goods;
    if ($good->exists($id)) {
        try {
            $good->delete($id);
            return $app->json(array("delete-product" => "yes", "id_delete" => $id));
        } catch (PDOException $e) {
            return $app->json(array("error" => $e->getMessage(), "delete-product" => "no"));
        }
    } else {
        return $app->json(array("delete-product" => "no"));
    }
});


$app->run();