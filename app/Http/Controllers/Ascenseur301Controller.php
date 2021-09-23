<?php

namespace App\Http\Controllers;

use App\Models\Cards;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Ascenseur301Controller extends Controller
{
    public function verify_card()
    {
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
            "4513325199993100",
        ];

        foreach($numerosATester as $key => $item){
            echo $item.' est '. ($this->verify($item) ? 'valide' : 'invalide');
            echo '<br/>';
        }
        // echo $this->generate(9999);
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

    public function generate($max){
        //generer un numéro de carte bleu valide
        $start = 5355 ;
        for($i = 0; $i <= $max; $i++){
            $numero = $start.str_pad($i, 12, '0', STR_PAD_LEFT);
            if($this->verify($numero)){
                $card = Cards::firstOrCreate(['number' => $numero]);
                $card->number = $numero;
                $card->save();
            }
        }
    }
}
