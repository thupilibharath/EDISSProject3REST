/**
 * Created by Bharath on 9/10/15.
 */

exports.register = function(req,res){
    var body = req.body;
    var data = body.number;
    //console.log('Received Data is'+ data);
    data = '';
    var squel = require("squel");
    var mysql      = require('mysql');

    var success = false;
    var success1 = false;

    var email = req.body.email;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var uname = req.body.username;
    var pwd = req.body.password;

    console.log(email);
    console.log(fname);
    console.log(lname);
    console.log(address);
    console.log(city);
    console.log(state);
    console.log(zip);
    console.log(uname);
    console.log(pwd);


    var error=false;

    var regex = require("regex");

    var emailvalidator = new regex(/\S+@\S+\.\S+/);
    var zipvalidator = new regex(/(^\d{5}$)|(^\d{5}-\d{4}$)/);





    //VALIDATION
    try{

    if(email==''||emailvalidator.test(email)==true) {
        error=true;
        console.log('email error');
        console.log(emailvalidator.test(email));
    }

    if(fname==''||fname.length<2) {
        error=true;
        console.log('fname error');

    }

    if(lname==''||lname.length<2) {
        error=true;
        console.log('lname error');

    }

    if(address==''||address.length<4) {
        error=true;
        console.log('address error');

    }

    if(city==''||city.length<2) {
        error=true;
        console.log('city error');

    }

    if(zip==''||zipvalidator.test(zip)==true) {
        error=true;
        console.log('zip error');

    }

    if(uname=='') {
        error=true;
        console.log('uname error');

    }
    if(pwd=='') {
        error=true;
        console.log('pwd error');

    }

    if(error==true){
        res.send(JSON.stringify({message:'there was a problem with your registration'}));
    }


    data = data+' '+email+' '+fname+' '+lname+' '+address+' '+city+' '+state+' '+zip+' '+uname+' '+pwd;
    console.log(data);


    //Check if user already exists
    if(error==false)
    {

        var connection = mysql.createConnection({
            host: 'db1.cev9f9km5ing.us-east-1.rds.amazonaws.com',
            user: 'root',
            password: 'Pop123465.',
            database: 'Project2'
        });

        var connection2 = mysql.createConnection({
            host: 'db2.cev9f9km5ing.us-east-1.rds.amazonaws.co',
            user: 'root',
            password: 'Pop123465.',
            database: 'Project2'
        });

        connection.connect(function (err) {
            if (!err) {
                console.log("Database1 is connected ... \n\n");
            } else {
                console.log("Error connecting database 1 ... \n\n");
            }
        });


        connection.query('select * from user_details where uname = '+'\' + uname + \'', function (err, rows) {
            var exists = false;
            if(err){
                console.log(err);
                connection2.connect(function (err) {
                    if (!err) {
                        console.log("Database2 is connected  ... \n\n");
                    } else {
                        console.log("Error connecting database 2 ... \n\n");
                    }
                });


                connection2.query('select * from user_details where uname = '+'\' + uname + \'', function (err, rows) {
                    var exists = false;
                    if(err)
                        console.log(err);
                    else  {
                        console.log('No error');
                    }
                    if (!err && rows.length > 0) {
                        exists = true;
                        console.log('User Exists');
                    }

                    if (!err && exists == false && rows.length == 0) {
                        //Create SQL query;
                        var ins = squel.insert();
                        ins.into('user_details').set('email', email).set('fname', fname).set('lname', lname).set('address', address)
                            .set('city', city).set('state', state).set('zip', zip).set('uname', uname).set('pwd', pwd).set('role', 'normal');
                        console.log(ins.toString());

                        //Connect to Database

                        var connection3 = mysql.createConnection({
                            host: 'db2.cev9f9km5ing.us-east-1.rds.amazonaws.com',
                            user: 'root',
                            password: 'Pop123465.',
                            database: 'Project2'
                        });

                        connection3.connect(function (err) {
                            if (!err) {
                                console.log("Database2 is connected again... \n\n");
                                connection3.query(ins.toString(), function (err, rows) {
                                    if (!err) {
                                        console.log('Insert Success');
                                        success1=true;


                                    }


                                    else {
                                        console.log('Error while performing Insert' + err);
                                        success1=false;
                                    }
                                    console.log('success1 is'+success1);

                                    if(success==true||success1==true){
                                        res.send(JSON.stringify({message:'Your account has been registered'}));
                                    }

                                    else if(success==false&&success1==false){
                                        res.send(JSON.stringify({message:'There was a problem with this action'}));
                                    }


                                });

                                //res.render('error', {error:'Registration was  successful  !!'});

                                connection3.end();
                            } else {
                                console.log("Error connecting database ... \n\n");
                            }
                        });




                    }
                    else if (exists == true) {
                        console.log('User Already Exists');
                        success1=false;
                    }
                    else
                        success1=false;
                });

                console.log('success1 is '+success1);
                connection2.end();


            }
            else  {
                console.log('No error');
            }
            if (!err && rows.length > 0) {
                exists = true;
                console.log('User Exists');
            }

            if (!err && exists == false && rows.length == 0) {
                //Create SQL query;
                var ins = squel.insert();
                ins.into('user_details').set('email', email).set('fname', fname).set('lname', lname).set('address', address)
                    .set('city', city).set('state', state).set('zip', zip).set('uname', uname).set('pwd', pwd).set('role', 'normal');
                console.log(ins.toString());

                //Connect to Database

                var connection1 = mysql.createConnection({
                    host: 'db1.cev9f9km5ing.us-east-1.rds.amazonaws.com',
                    user: 'root',
                    password: 'Pop123465.',
                    database: 'Project2'
                });

                connection1.connect(function (err) {
                    if (!err) {
                        console.log("Database1 is connected again... \n\n");
                        connection1.query(ins.toString(), function (err, rows) {
                            if (!err) {
                                console.log('Insert Success');
                                success=true;

                            }

                            else {
                                console.log('Error while performing Insert' + err);
                                success=false;
                            }



                            console.log('success here is '+success);





                            connection2.connect(function (err) {
                                if (!err) {
                                    console.log("Database2 is connected  ... \n\n");
                                } else {
                                    console.log("Error connecting database 2 ... \n\n");
                                }
                            });


                            connection2.query('select * from user_details where uname = '+'\' + uname + \'', function (err, rows) {
                                var exists = false;
                                if(err){
                                    console.log(err);
                                    if(success==true||success1==true){
                                        res.send(JSON.stringify({message:'Your account has been registered'}));
                                    }

                                    else if(success==false&&success1==false){
                                        res.send(JSON.stringify({message:'There was a problem with this action'}));
                                    }}
                                else  {
                                    console.log('No error');
                                }
                                if (!err && rows.length > 0) {
                                    exists = true;
                                    console.log('User Exists');
                                }

                                if (!err && exists == false && rows.length == 0) {
                                    //Create SQL query;
                                    var ins = squel.insert();
                                    ins.into('user_details').set('email', email).set('fname', fname).set('lname', lname).set('address', address)
                                        .set('city', city).set('state', state).set('zip', zip).set('uname', uname).set('pwd', pwd).set('role', 'normal');
                                    console.log(ins.toString());

                                    //Connect to Database

                                    var connection3 = mysql.createConnection({
                                        host: 'db2.cev9f9km5ing.us-east-1.rds.amazonaws.com',
                                        user: 'root',
                                        password: 'Pop123465.',
                                        database: 'Project2'
                                    });

                                    connection3.connect(function (err) {
                                        if (!err) {
                                            console.log("Database2 is connected again... \n\n");
                                            connection3.query(ins.toString(), function (err, rows) {
                                                if (!err) {
                                                    console.log('Insert Success');
                                                    success1=true;


                                                }


                                                else {
                                                    console.log('Error while performing Insert' + err);
                                                    success1=false;
                                                }
                                                console.log('success1 is'+success1);

                                                if(success==true||success1==true){
                                                    res.send(JSON.stringify({message:'Your account has been registered'}));
                                                }

                                                else if(success==false&&success1==false){
                                                    res.send(JSON.stringify({message:'There was a problem with this action'}));
                                                }


                                            });

                                            //res.render('error', {error:'Registration was  successful  !!'});

                                            connection3.end();
                                        } else {
                                            console.log("Error connecting database ... \n\n");
                                        }
                                    });




                                }
                                else if (exists == true) {
                                    console.log('User Already Exists');
                                    success1=false;
                                }
                                else
                                    success1=false;
                            });

                            console.log('success1 is '+success1);
                            connection2.end();


                        });

                        //res.render('error', {error:'Registration was  successful  !!'});

                        connection1.end();
                    } else {
                        console.log("Error connecting database ... \n\n");
                    }
                });




            }
            else if (exists == true) {
                console.log('User Already Exists');
                success=false;
            }
            else
                success=false;

        });

        console.log('success is '+success);

        connection.end();

    }

    }

    catch(ex){

        res.send(JSON.stringify({message:'there was a problem with your registration'}));
        //callback(ex);

    }
        //res.render('responsesuccess');
};