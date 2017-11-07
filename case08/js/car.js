angular.module("myApp",[])
    .controller("myCon",["$scope","$filter",function($s,$f){
        var data = [
            {
                id:100,
                name:"三亚行",
                price:66,
                num:20,
            },{
                id:101,
                name:"厦门行",
                price:99,
                num:30,
            },{
                id:102,
                name:"西藏行",
                price:129,
                num:42,
            }
        ]
        $s.books = data;
//          计算总数量
        $s.allNum = function(){
            var sum = 0;
            angular.forEach($s.books,function(v,i){
                sum += v.num;
            })
            return sum;
        }
//            数量递减
        $s.sub = function(id){
            angular.forEach($s.books,function(v,i){
                if(v.id == id){
                    if(v.num>0){
                        v.num--;
                    }
                }

            })
        }
//            数量递增
        $s.add = function(id){
            angular.forEach($s.books,function(v,i){
                if(v.id == id){
                    v.num++;
                }
            })
        }
        var orderBy = $f("orderBy");
        $s.order = function(predicate, reverse) {
            $s.books = orderBy($s.books, predicate, reverse);
        };
        $s.order('id',true);


        $s.$watch("books",function(newV,oldV){
            angular.forEach($s.books,function(v,i){
                if(v.num <= 0){
                    v.num = 0;
                }
            })
        },true)

//            计算总价格
        $s.allPrice = function(){
            var sumP = 0;
            angular.forEach($s.books,function(v,i){
                sumP += v.price * v.num;
            })
            return sumP;
        }


//            删除本行
        $s.del = function(id){
            if(confirm("确定删除本商品?")){
                var index = -1;
                angular.forEach($s.books,function(v,i){
                    if(v.id == id){
                        index = i;
                    }
                })
                $s.books.splice(index,1);
            }
        }
//            全部删除
        $s.delAll = function(){
            if(confirm("确定删除全部商品?")){
                var len = $s.books.length;
                $s.books.splice(0,len);
            }
        }
        $s.tempStyle ={
            width:"800px",
            height:"400px",

        }
        $s.tdStyle = {
            width:"600px",
        }

        $s.show = function(){
            $s.myShow = !$s.myShow;

        }

        $s.addCar = function(){
            $s.books.push({
                id:$s.newid,
                name:$s.newname,
                price:$s.newprice,
                num:$s.newnum
            })
            $s.myShow = false;
            $s.newid = "";
            $s.newname = "";
            $s.newprice = "";
            $s.newnum = "";
        }
    }])
