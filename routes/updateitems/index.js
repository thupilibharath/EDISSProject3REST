/**
 * Created by Bharath on 9/11/15.
 */
exports.updateitems=function(req,res){

    try{
    var sess = req.session;
    var id = '\''+req.body.productId+'\'';
    var groups = '\''+req.body.productDescription+'\'';
    var title = '\''+req.body.productTitle+'\'';
    var mysql = require('mysql');

    var success = false;
        var success1 = false;
    console.log('id is '+id);

    var connection = mysql.createConnection({
        host     : 'db1.cev9f9km5ing.us-east-1.rds.amazonaws.com',
        user     : 'root',
        password : 'Pop123465.',
        database : 'Project2'
    });

        var connection1 = mysql.createConnection({
            host     : 'db2.cev9f9km5ing.us-east-1.rds.amazonaws.com',
            user     : 'root',
            password : 'Pop123465.',
            database : 'Project2'
        });

        connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting database ... \n\n");
        }
    });


    if(id=='\'\''&&sess.role=='admin'||groups=='\'\''&&sess.role=='admin'||title=='\'\''&&sess.role=='admin'){
        res.send(JSON.stringify({message:'There was a problem with this action'}));
    }
    else if(sess.username&&sess.role=='admin') {
        connection.query('update product_details set description=' + groups + ',title=' + title + 'where id=' + id, function (err, rows) {
            if(err){
                connection1.query('update product_details set description=' + groups + ',title=' + title + 'where id=' + id, function (err, rows) {
                    if(err){
                        if(success==true||success1==true){
                            res.send(JSON.stringify({message:'The product information has been updated'}));
                        }

                        else if(success==false&&success1==false){
                            res.send(JSON.stringify({message:'There was a problem with this action'}));
                        }
                    }
                    if (!err) {


                        success1=true;

                        console.log('updated items');
                        //res.send(JSON.stringify({message:'The product information has been updated'}));
                    }
                    else {
                        //res.send(JSON.stringify({message:'There was a problem with this action'}));

                    }


                    if(success==true||success1==true){
                        res.send(JSON.stringify({message:'Your account has been registered'}));
                    }

                    else if(success==false&&success1==false){
                        res.send(JSON.stringify({message:'There was a problem with this action'}));
                    }


                });
            }
            if (!err) {

                success = true;
                connection1.connect(function(err){
                    if(!err) {
                        console.log("Database is connected ... \n\n");
                    } else {
                        console.log("Error connecting database ... \n\n");
                    }
                });


                if(id=='\'\''&&sess.role=='admin'||groups=='\'\''&&sess.role=='admin'||title=='\'\''&&sess.role=='admin'){
                    res.send(JSON.stringify({message:'There was a problem with this action'}));
                }
                else if(sess.username&&sess.role=='admin') {
                    connection1.query('update product_details set description=' + groups + ',title=' + title + 'where id=' + id, function (err, rows) {
                       if(err){
                           if(success==true||success1==true){
                               res.send(JSON.stringify({message:'The product information has been updated'}));
                           }

                           else if(success==false&&success1==false){
                               res.send(JSON.stringify({message:'There was a problem with this action'}));
                           }
                       }
                        if (!err) {


                            success1=true;

                            console.log('updated items');
                            //res.send(JSON.stringify({message:'The product information has been updated'}));

                            if(success==true||success1==true){
                                res.send(JSON.stringify({message:'The product information has been updated'}));
                            }

                            else if(success==false&&success1==false){
                                res.send(JSON.stringify({message:'There was a problem with this action'}));
                            }


                        }
                        else {
                            //res.send(JSON.stringify({message:'There was a problem with this action'}));

                        }




                    });
                }


                console.log('updated items');
                //res.send(JSON.stringify({message:'The product information has been updated'}));
            }
            else {
               // res.send(JSON.stringify({message:'There was a problem with this action'}));

            }
        });
    }

    else{
        //res.send(JSON.stringify({message:'There was a problem with this action'}));

    }}
    catch(ex){
       // res.send(JSON.stringify({message: 'Error ccured'}));
    }
};