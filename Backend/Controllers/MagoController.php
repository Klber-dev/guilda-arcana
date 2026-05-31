<?php

class MagoController extends BaseController {
    private $magoModel;

    public function __construct(MagoModel $magoModel) {
        $this->magoModel = $magoModel;
    }

    public function criarMago(){
        $data = $this->getJsonInput();
    
        if(!isset($data['nome']) || !isset($data['nivel']) || !isset($data['guilda_id'])){
            $this->sendErrorResponse('Dados incompletos');
            return;
        }

        $mago = new Mago(null, $data['nome'], $data['nivel'], $data['guilda_id']);

    }

}