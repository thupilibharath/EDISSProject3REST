/**
 * Created by Bharath on 9/10/15.
 */
exports.search = function(req,res){
    try{
    var sess = req.session;
    console.log('Remaining Time'+sess.cookie.maxAge);

    //console.log(req.query.searchtexta);
    //if(sess.username)
    //res.render('searchitems',{id:'1',name:'Fan', desc:'Ceiling Fan'})
    //
    // else

    var id = req.query.productId;
    var categories = req.query.category;
    var title = req.query.keyword;

    console.log('id is'+id);

    if(typeof id=='undefined')
        id='\'\%\'';
    else
        id='\'\%'+id+'\%\'';
    if(typeof categories=='undefined')
        categories='\'\%\'';
    else
        categories='\'\%'+categories+'\%\'';
    if(typeof title=='undefined')
        title='\'\%\'';
    else
        title='\'\%'+title+'\%\'';



    console.log(id+categories+title);
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'db1.cev9f9km5ing.us-east-1.rds.amazonaws.com',
        user     : 'root',
        password : 'Pop123465.',
        database : 'Project2'
    });


    connection.connect(function(err){
        if(!err) {
            console.log("Database1 is connected ... \n\n");
            connection.query('SELECT id, ASIN, title, groups from product_details where id like '+id+' and categories like '+categories+' and title like '+title+' order by id', function(err, rows) {
                    if (rows.length == 0)
                        res.send(JSON.stringify({product_list:rows}));
                    else if(!err && rows.length > 0){
                        console.log('displaying results');
                        res.send(JSON.stringify({product_list:rows}));

                    }



                }
            );
        } else {
            console.log("Error connecting database1 trying database 2 ... \n\n");
            var connection1 = mysql.createConnection({
                host     : 'db2.cev9f9km5ing.us-east-1.rds.amazonaws.com',
                user     : 'root',
                password : 'Pop123465.',
                database : 'Project2'
            });


            connection1.connect(function(err){
                if(!err) {
                    console.log("Database2 is connected ... \n\n");
                    connection1.query('SELECT id, ASIN, title, groups from product_details where id like '+id+' and categories like '+categories+' and title like '+title+' order by id', function(err, rows) {
                            if (rows.length == 0)
                                res.send(JSON.stringify({product_list:rows}));
                            else if(!err && rows.length > 0){
                                console.log('displaying results');
                                res.send(JSON.stringify({product_list:rows}));

                            }



                        }
                    );
                }});
            }
    });




    }
    catch(ex){
        res.send(JSON.stringify({message: 'Error Occured'}));
    }

        };