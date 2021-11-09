<?php

namespace App\Http\Controllers;

use App\Models\Cards;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Ascenseur301Controller extends Controller
{
    /**
     * verify if a card's array can exist
     *
     * @return void
     */
    public function verify_card(array $cards = []):void
    {
        echo $this->generate(9999);
        // foreach($cards as $key => $item){
        //     echo $item.' est '. ($this->verify($item) ? 'valide' : 'invalide');
        //     echo '<br/>';
        // }
    }

    /**
     * generate cards that complies with th ecard validation rules
     *
     * @return void
     */
    public function card_generator():void
    {
        echo $this->generate(9999);
    }

    /**
     * Return if the card number is valid
     *
     * @param int $number
     * @return bool
     */
    private function verify($number):bool
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

    /**
     * Generate random cards within the last created card and the limit fixed
     *
     * @param integer $max
     * @return void
     */
    public function generate(int $max = 9999):void
    {
        $lastCardEntered = Cards::orderBy('number', 'desc')->first()->number;
        $lastCardEntered = (int) str_replace(5355, '', $lastCardEntered);
        $start = 5355;
        
        for($i = $lastCardEntered; $i <= ($lastCardEntered + $max); $i++){
            $numero = $start.str_pad($i, 12, '0', STR_PAD_LEFT);
            if($this->verify($numero)){
                $card = Cards::firstOrCreate(['number' => $numero]);
                $card->number = $numero;
                $card->i = $i;
                $card->save();
                echo $card.'<br />';
            }
        }
    }
}
