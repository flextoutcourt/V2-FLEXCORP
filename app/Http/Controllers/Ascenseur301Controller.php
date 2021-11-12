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
        // echo self::generate_for_user();

        $this->generate(9999);

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
        $this->generate(9999);
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
        $lastCardEntered = Cards::orderBy('number', 'desc')->first() ? Cards::orderBy('number', 'desc')->first()->i : 0;
        $start = 5355;
        
        for($i = $lastCardEntered; $i <= ($lastCardEntered + $max); $i++){
            $numero = $start.str_pad($i, 12, '0', STR_PAD_LEFT);
            if($this->verify($numero)){
                $card = Cards::firstOrCreate(['number' => $numero, 'i' => $i]);
                $card->number = $numero;
                $card->i = $i;
                $card->save();
            }
        }
    }

    /**
     * Genère une carte aléatoire
     *
     * @return string $card
     */
    public static function generate_for_user():string
    {
        $starters = ["5355", "4979", "4973", "0667", "3765", "4519"];
        $start = $starters[array_rand($starters)];
        $card = (new self)->generate_random($start);
        $card = preg_replace('/(?<=\d)(?=(\d{4})+$)/', ' ', $start."".$card);
        return $card;
        
    }

    /**
     * Genere une carte aléatoire selon le choix de type de carte
     *
     * @param string $start ['mastercard', 'visa', 'custom'] etc...
     * @return string card number
     */
    public function generate_random(string $start):string
    {
        $card = "";
        $iterator = $start[0] == "3" ? $iterator = 11 : $iterator = 12;
        do{
            $card = "";
            for($i = 0; $i < $iterator; $i++){
                $card .= "".(string) rand(0, 9)."";
            }
        }while(!(new self)->verify($start.$card));
        return $card;
    }
}