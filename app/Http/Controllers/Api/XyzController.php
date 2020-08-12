<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\XyzRequest;
use Laminas\Text\Figlet\Figlet;
use Illuminate\Support\Facades\Log;

class XyzController extends Controller
{
    private $input;
    private $size = 3;
    private $direction = 'horizontal';

    public function index(XyzRequest $request, $input)
    {
        $this->input = $input;
        $this->size = $request->size ?? $this->size;
        $this->direction = $request->direction ?? $this->direction;

        $output = $this->createFiglet();

        Log::channel('xyz')->info(PHP_EOL . $output);

        $response = [
            'output' => $output,
            'message' => 'Log file created'
        ];

        return response($response, 200);
    }

    protected function createFiglet()
    {
        $figlet = '';

        if($this->direction == 'horizontal') {
            $figlet = $this->figletHorizontal();
        }else {
            $split_input = str_split($this->input);

            foreach($split_input as $letter) {
                $figlet .= $this->figletVertical($letter);
            }
        }

        return $figlet;
    }

    protected function figletHorizontal()
    {
        $figlet = '';
        $split_input = str_split($this->input);

        for($row = 0; $row < $this->size; $row++) {
            foreach ($split_input as $letter) {
                switch ($letter) {
                    case 'X':
                        for($column = 0; $column <= $this->size; $column++) {
                            if ($column == $row || ($column == $this->size-1 - $row))
                                $figlet .= "o";
                            else
                                $figlet .= " ";
                        }
                        break;

                    case 'Y':
                        for($column = 0; $column <= $this->size; $column++) {
                            if ($row <= $this->size/2 && ($row == $column || $row + $column == $this->size-1) || ($row > $this->size/2 && $column == $this->size/2) || (($column == floor($this->size/2)) and $row > floor($this->size/2)))
                                $figlet .= "o";
                            else
                                $figlet .= " ";
                        }
                        break;

                    case 'Z':
                        for($column = 0; $column <= $this->size; $column++) {
                            if ( ( ($row == 0 or $row == $this->size-1) and $column >= 0 and $column <= $this->size-1) or $row + $column == $this->size-1)
                                $figlet .= "o";
                            else
                            $figlet .= " ";
                        }
                        break;

                    default:
                        # code...
                        break;
                }
            }

            $figlet .= "\n";
        }

        $figlet .= "\n";

        return $figlet;
    }

    protected function figletVertical($letter)
    {
        $figlet = '';

        for($row = 0; $row < $this->size; $row++) {
            for($column = 0; $column <= $this->size; $column++) {
                switch ($letter) {
                    case 'X':
                        if ($column == $row || ($column == $this->size-1 - $row))
                            $figlet .= "o";
                        else
                            $figlet .= " ";
                        break;

                    case 'Y':
                        if ($row <= $this->size/2 && ($row == $column || $row + $column == $this->size-1) || ($row > $this->size/2 && $column == $this->size/2) || (($column == floor($this->size/2)) and $row > floor($this->size/2)))
                            $figlet .= "o";
                        else
                            $figlet .= " ";
                        break;

                    case 'Z':
                        if ( ( ($row == 0 or $row == $this->size-1) and $column >= 0 and $column <= $this->size-1) or $row + $column == $this->size-1)
                            $figlet .= "o";
                        else
                        $figlet .= " ";
                        break;

                    default:
                        break;
                }
            }

            $figlet .= "\n";
        }

        $figlet .= "\n";

        return $figlet;
    }
}
