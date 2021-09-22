<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Ascenseur301Controller extends Controller
{
    public function verify_card()
    {

        /*
        6   5   7   8   7   6   8   4   3 
        6   10  7   16  7   12  8   8   3
        6   1   7   7   7   3   8   8   3 == 50
        */
        $numerosATester = [
            "348678756",
            "348678757",
            "834094922",
            "451001077",
            "451001078",
            "531976157",
            "34867875600068",
            "53197615700010",
            "53197615700011",
            "80508223700019",
            "83409492200012",
            "83409592200012",
            "89092299000019",
            "89092290900019",
        ];

        foreach($numerosATester as $key => $item){
            echo $item.' est '. ($this->verify($item) ? 'valide' : 'invalide');
            echo '<br/>';
        }
        echo '<pre style="background: black; color: white"><code>';
        echo '      private function verify($number)
        {
            $number = strrev($number);
            $limit = strlen($number);
            $total = 0;
            for($i = 0; $i < $limit; $i++){
                if($i%2){
                    $chiffre = ($number[$i] * 2);
                    if($chiffre > 9){
                        $chiffre -= 9;
                    }
                    $total += $chiffre;
                }else{
                    $total += $number[$i];
                }
            }
            return ($total % 10 == 0) ? true: false;
        }';
        echo '</code></pre>';
    }

    private function verify($number)
    {
        $number = strrev($number);
        $limit = strlen($number);
        $total = 0;
        for($i = 0; $i < $limit; $i++){
            if($i%2){
                $chiffre = ($number[$i] * 2);
                if($chiffre > 9){
                    $chiffre -= 9;
                }
                $total += $chiffre;
            }else{
                $total += $number[$i];
            }
        }
        return ($total % 10 == 0) ? true: false;
    }
}
