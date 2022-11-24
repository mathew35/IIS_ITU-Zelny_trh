<table>
    <?php
    require "services.php";
    class ProductDetail
    {
        private $id;
        private $db;

        public function __construct($id) {
            $this->id = $id;
            $this->db = new AccountService();
        }

        public function getName(){
            $getname = $this->db->get("SPECIFIC_CROP","CROP_NAME","CROPID=" . $this->id);
            $name = $getname->fetch();
            echo $name[0] . "<br>";
        }

        // pridat puvod
        // pridat farmare

        public function getDescript(){
            $gettext = $this->db->get("SPECIFIC_CROP","DESCRIPTION","CROPID=" . $this->id);
            $text = $gettext->fetch();
            echo "Popis: " . $text[0] . "<br>";
        }

        public function getPrice(){
            $getprice = $this->db->get("SPECIFIC_CROP","PRICE","CROPID=" . $this->id);
            $price = $getprice->fetch();
            echo $price[0] . " Kč<br>";
        }

        public function getAvgRatings(){
            
            $getstars = $this->db->get("RATING","STARS","CROP=" . $this->id);
            $stars = $getstars->fetch();
            $count = $getstars->rowCount();
            $sum = 0;
            for ($i = 0; $i < $count; $i++) {
                $sum += $stars[0];
                $stars = $getstars->fetch();
            }
            $avg =  $sum / $count;
            echo round($avg, 0) . "/5 <br>";
        }

        public function getRatings(){

            $getstars = $this->db->get("RATING","STARS","CROP=" . $this->id);
            $stars = $getstars->fetch();
            $gettext= $this->db->get("RATING","DESCRIPTION","CROP=" . $this->id);
            $text = $gettext->fetch();
            for ($i = 0; $i < $getstars->rowCount(); $i++) {
                echo $stars[0] . " Hvězdiček <br>";
                echo "Hodnocení: " . $text[0] . " <br>";
                $stars = $getstars->fetch();
                $text = $gettext->fetch();
            }
        }


    }
    $product = new ProductDetail(1);
    $product->getName();
    $product->getDescript();
    $product->getPrice();
    $product->getAvgRatings();
    $product->getRatings();
    ?>
    
</table>