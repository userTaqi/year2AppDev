<?php
class Claim
{
    public $ID;	
    public $KIDSDRIV;
    public $BIRTH;	
    public $AGE;	
    public $HOMEKIDS;	
    public $YOJ;	
    public $INCOME;	
    public $PARENT1;	
    public $HOME_VAL;	
    public $MSTATUS;
    public $GENDER;	
    public $EDUCATION;	
    public $OCCUPATION;	
    public $TRAVTIME;	
    public $CAR_USE;	
    public $BLUEBOOK;	
    public $TIF;	
    public $CAR_TYPE;
    public $RED_CAR;	
    public $OLDCLAIM;	
    public $CLM_FREQ;	
    public $REVOKED;	
    public $MVR_PTS;	
    public $CLM_AMT;	
    public $CAR_AGE;	
    public $CLAIM_FLAG;	
    public $URBANICITY;


    public function __construct($ID, $KIDSDRIV,$BIRTH,$AGE,$HOMEKIDS,$YOJ,$INCOME,$PARENT1,$HOME_VAL,$MSTATUS,$GENDER,$EDUCATION,$OCCUPATION,
    $TRAVTIME,$CAR_USE,$BLUEBOOK,$TIF,$CAR_TYPE,$RED_CAR,$OLDCLAIM,$CLM_FREQ,$REVOKED,$MVR_PTS,$CLM_AMT,$CAR_AGE,$CLAIM_FLAG,$URBANICITY)
    {
        $this->ID = $ID;
        $this->KIDSDRIV = $KIDSDRIV;
        $this->BIRTH = $BIRTH;
        $this->AGE = $AGE;
        $this->HOMEKIDS = $HOMEKIDS;
        $this->YOJ = $YOJ;
        $this->INCOME = $INCOME;
        $this->PARENT1 = $PARENT1;
        $this->HOME_VAL = $HOME_VAL;
        $this->MSTATUS = $MSTATUS;
        $this->GENDER = $GENDER;
        $this->EDUCATION = $EDUCATION;
        $this->OCCUPATION = $OCCUPATION;
        $this->TRAVTIME = $TRAVTIME;
        $this->CAR_USE = $CAR_USE;
        $this->BLUEBOOK = $BLUEBOOK;
        $this->TIF = $TIF;
        $this->CAR_TYPE = $CAR_TYPE;
        $this->RED_CAR = $RED_CAR;
        $this->OLDCLAIM = $OLDCLAIM;
        $this->CLM_FREQ = $CLM_FREQ;
        $this->REVOKED = $REVOKED;
        $this->MVR_PTS = $MVR_PTS;
        $this->CLM_AMT = $CLM_AMT;
        $this->CAR_AGE = $CAR_AGE;
        $this->CLAIM_FLAG = $CLAIM_FLAG;
        $this->URBANICITY = $URBANICITY;
    }

    public function getID()
    {
        return $this->ID;
    }

    public function getKIDSDRIV()
    {
        return $this->KIDSDRIV;
    }

    public function getBIRTH()
    {
        return $this->BIRTH;
    }

    public function getAGE()
    {
        return $this->AGE;
    }

    public function getHOMEKIDS()
    {
        return $this->HOMEKIDS;
    }

    public function getYOJ()
    {
        return $this->YOJ;
    }

    public function getINCOME()
    {
        return $this->INCOME;
    }

    public function getPARENT1()
    {
        return $this->PARENT1;
    }

    public function getHOME_VAL()
    {
        return $this->HOME_VAL;
    }

    public function getMSTATUS()
    {
        return $this->MSTATUS;
    }

    public function getGENDER()
    {
        return $this->GENDER;
    }

    public function getEDUCATION()
    {
        return $this->EDUCATION;
    }

    public function getOCCUPATION()
    {
        return $this->OCCUPATION;
    }

    public function getTRAVTIME()
    {
        return $this->TRAVTIME;
    }

    public function getCAR_USE()
    {
        return $this->CAR_USE;
    }

    public function getBLUEBOOK()
    {
        return $this->BLUEBOOK;
    }

    public function getTIF()
    {
        return $this->TIF;
    }

    public function getCAR_TYPE()
    {
        return $this->CAR_TYPE;
    }

    public function getRED_CAR()
    {
        return $this->RED_CAR;
    }

    public function getOLDCLAIM()
    {
        return $this->OLDCLAIM;
    }

    public function getCLM_FREQ()
    {
        return $this->CLM_FREQ;
    }

    public function getREVOKED()
    {
        return $this->REVOKED;
    }

    public function getMVR_PTS()
    {
        return $this->MVR_PTS;
    }

    public function getCLM_AMT()
    {
        return $this->CLM_AMT;
    }

    public function getCAR_AGE()
    {
        return $this->CAR_AGE;
    }

    public function getCLAIM_FLAG()
    {
        return $this->CLAIM_FLAG;
    }

    public function getURBANICITY()
    {
        return $this->URBANICITY;
    }
}
?>
