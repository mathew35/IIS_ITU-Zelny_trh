<?php 
    require "services.php";
    function buyitem($amount, $pid){
        session_start();
        $db = new AccountService();
        $user = $_SESSION['user'];
        $cid = $_SESSION['cartid'];

        $basketin = $db->get("CART_CROP", "AMOUNT", "CROPID='" . $pid . "' AND CARTID='" . $cid . "'");

        if ($basketin->rowCount() != 0){
            $basket = $basketin->fetch();
            $amount = $amount + $basket[0];
            $db->update("CART_CROP", "AMOUNT='".$amount. "'", "CARTID='".$cid."'"); 
        }
        else{
            $db->add("CART_CROP", "('".$cid."','".$pid."','".$amount."')"); 
        }
        echo "Uživatel " . $user . " má v košíku " . $amount . " kusů produktu " . $pid;
    }

    if ($_POST['paramount'] == NULL){
        echo "Není zadáno množství";
    }
    if (isset($_POST['paramount'])) {
        buyitem($_POST['paramount'], $_POST['parpid']);
    }
?>
