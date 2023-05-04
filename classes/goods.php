<?php

require_once ('tableModule.php');

class Goods extends TableModule
{
    protected function getTableName() : string
    {
        return "goods";

    }


    public function readAll()
    {
        $sql = "SELECT goods.id, goods.name, goods.id_material, goods.description, goods.cost, materials.name as materialname
        FROM `goods` 
        INNER JOIN materials ON goods.id_material = materials.id 
        WHERE 1
       ";
        $query = Db::prepare($sql);
        $query->execute();
        $result = array();
        while ($slice = $query->fetch()) {
            $result[] = $slice;
        }
        if($query->errorInfo()[0] !== '00000') {
            throw new Exception($query->errorInfo()[2]);
        }
        return $result;




    }

}