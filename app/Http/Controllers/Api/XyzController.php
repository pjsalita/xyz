<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\XyzRequest;
use Illuminate\Support\Facades\Log;

class XyzController extends Controller
{
    private $input, $output;
    private $size = 3;
    private $direction = 'horizontal';

    public function index(XyzRequest $request, $input)
    {
        $this->input = $input;
        $this->size = $request->size ?? $this->size;
        $this->direction = $request->direction ?? $this->direction;

        $this->createFiglet();

        Log::channel('xyz')->info(PHP_EOL . $this->output);

        $response = [
            'message' => 'Log file created',
            'output' => $this->output
        ];

        return response($response, 200);
    }

    private function createFiglet()
    {
        $split_input = str_split($this->input);

        if($this->direction == 'horizontal') {
            for($row = 0; $row < $this->size; $row++) {
                foreach ($split_input as $letter) {
                    for($column = 0; $column <= $this->size; $column++) {
                        $this->createLetter($row, $column, $letter);
                    }
                }

                $this->output .= "\n";
            }

            $this->output .= "\n";
        }else {
            foreach($split_input as $letter) {
                for($row = 0; $row < $this->size; $row++) {
                    for($column = 0; $column <= $this->size; $column++) {
                        $this->createLetter($row, $column, $letter);
                    }

                    $this->output .= "\n";
                }

                $this->output .= "\n";
            }
        }
    }

    private function createLetter($row, $column, $letter)
    {
        $character = 'O';

        switch ($letter) {
            case 'X':
                if ($column == $row || ($column == $this->size-1 - $row))
                    $this->output .= $character;
                else
                    $this->output .= " ";
                break;

            case 'Y':
                if ($row <= $this->size/2 && ($row == $column || $row + $column == $this->size-1) || ($row > $this->size/2 && $column == $this->size/2) || (($column == floor($this->size/2)) and $row > floor($this->size/2)))
                    $this->output .= $character;
                else
                    $this->output .= " ";
                break;

            case 'Z':
                if ((($row == 0 or $row == $this->size-1) and $column >= 0 and $column <= $this->size-1) or $row + $column == $this->size-1)
                    $this->output .= $character;
                else
                    $this->output .= " ";
                break;

            default:
                break;
        }
    }
}
