/**
 * Created by Bharath on 9/4/15.
 */

exports.updatedetails = function(req, res){

    //var data = body.number;
    //console.log('Received Data is'+ data);
    var sess = req.session;
    data = '';
    var squel = require("squel");
    var mysql = require('mysql');

    var success = false;
    var success1 = false;


    //data = data+' '+email+' '+fname+' '+lname+' '+address+' '+city+' '+state+' '+zip+' '+uname+' '+pwd;
    //console.log(data);

    var connection1 = mysql.createConnection({
        host     : 'db1.cev9f9km5ing.us-east-1.rds.amazonaws.com',
        user     : 'root',
        password : 'Pop123465.',
        database : 'Project2'
    });

    var connection3 = mysql.createConnection({
        host     : 'db2.cev9f9km5ing.us-east-1.rds.amazonaws.com',
        user     : 'root',
        password : 'Pop123465.',
        database : 'Project2'
    });


    connection1.connect(function(err){

        if(err){
            //Update DB2 if DB1 fails


            connection3.connect(function(err){
                if(!err) {
                    console.log("Database2 is connected ... \n\n");
                    //Prepare update statement

                    if(!sess.username){
                        console.log('Unauthorized user');
                        res.send(JSON.stringify({message:'Session not available'}));
                    }

                    else {
                        var temp = '\''+sess.username+'\'';
                        connection3.query('select email, fname, lname, address, city, state, zip, uname, pwd from user_details where uname = '+temp, function(err, rows) {
                            if(!err){
                                var email = rows[0].email;
                                var fname = rows[0].fname;
                                var lname = rows[0].lname;
                                var address = rows[0].address;
                                var city = rows[0].city;
                                var state = rows[0].state;
                                var zip = rows[0].zip;
                                var uname = rows[0].uname;
                                var pwd = rows[0].pwd;

                                //Update content based on existing details
                                var connection2 = mysql.createConnection({
                                    host     : 'db2.cev9f9km5ing.us-east-1.rds.amazonaws.com',
                                    user     : 'root',
                                    password : 'Pop123465.',
                                    database : 'Project2'
                                });


                                connection2.connect(function(err){
                                    if(!err) {
                                        console.log("Database2 is connected ... \n\n");
                                        if(!sess.username){
                                            console.log('Unauthorized user');
                                            res.send(JSON.stringify({message:'Session not avaiable'}))
                                        }

                                        else {

                                            if(typeof req.body.email!='undefined')
                                                email = req.body.email;
                                            if(typeof req.body.fname!='undefined')
                                                fname = req.body.fname;
                                            if(typeof req.body.lname!='undefined')
                                                lname = req.body.lname;
                                            if(typeof req.body.address!='undefined')
                                                address = req.body.address;
                                            if(typeof req.body.city!='undefined')
                                                city = req.body.city;
                                            if(typeof req.body.state!='undefined')
                                                state = req.body.state;
                                            if(typeof req.body.zip!='undefined')
                                                zip = req.body.zip;
                                            if(typeof req.body.username!='undefined')
                                                uname = req.body.username;
                                            if(typeof req.body.password!='undefined')
                                                pwd = req.body.password;


                                            var upd = squel.update();
                                            upd.table('user_details').set('email', email).set('fname', fname).set('lname', lname).set('address', address)
                                                .set('city', city).set('state', state).set('zip', zip).set('uname', uname).set('pwd', pwd).set('role', 'normal').where('uname =' + '\'' + sess.username + '\'');
                                            console.log(upd.toString());

                                            connection2.query(upd.toString(), function(err, rows) {
                                                if(!err){
                                                    console.log('Update Success');
                                                    // res.send(JSON.stringify({message:'Your information has been updated'}));
                                                    success1=true;
                                                }
                                                else
                                                    console.log('false');

                                                if(success==true||success1==true){
                                                    res.send(JSON.stringify({message:'Your details have been updated'}));
                                                }

                                                else if(success==false&&success1==false){
                                                    res.send(JSON.stringify({message:'There was a problem with this action'}));
                                                }


                                            });


                                        }

                                        connection2.end();
                                        sess.username = uname;

                                    } else {
                                        console.log("Error connecting to database2 ... \n\n");
                                    }
                                });

                                //Prepare update statement



                            }
                            else
                                console.log('Error while fetching existing records');
                        });


                    }

                    connection3.end();

                } else {
                    console.log("Error connecting to database2 ... \n\n");
                }
            });


        }
        if(!err) {
            console.log("Database1 is connected ... \n\n");
            //Prepare update statement

            if(!sess.username){
                console.log('Unauthorized user');
                res.send(JSON.stringify({message:'Session not available'}));
            }

            else {
                var temp = '\''+sess.username+'\'';
                console.log('User is '+sess.username);
                connection1.query('select email, fname, lname, address, city, state, zip, uname, pwd from user_details where uname = '+temp, function(err, rows) {
                    if(!err){
                        var email = rows[0].email;
                        var fname = rows[0].fname;
                        var lname = rows[0].lname;
                        var address = rows[0].address;
                        var city = rows[0].city;
                        var state = rows[0].state;
                        var zip = rows[0].zip;
                        var uname = rows[0].uname;
                        var pwd = rows[0].pwd;

                        //Update content based on existing details
                        var connection = mysql.createConnection({
                            host     : 'db1.cev9f9km5ing.us-east-1.rds.amazonaws.com',
                            user     : 'root',
                            password : 'Pop123465.',
                            database : 'Project2'
                        });


                        connection.connect(function(err){
                            if(!err) {
                                console.log("Database1 is connected ... \n\n");
                                if(!sess.username){
                                    console.log('Unauthorized user');
                                    res.send(JSON.stringify({message:'Session not avaiable'}))
                                }

                                else {

                                    if(typeof req.body.email!='undefined')
                                        email = req.body.email;
                                    if(typeof req.body.fname!='undefined')
                                        fname = req.body.fname;
                                    if(typeof req.body.lname!='undefined')
                                        lname = req.body.lname;
                                    if(typeof req.body.address!='undefined')
                                        address = req.body.address;
                                    if(typeof req.body.city!='undefined')
                                        city = req.body.city;
                                    if(typeof req.body.state!='undefined')
                                        state = req.body.state;
                                    if(typeof req.body.zip!='undefined')
                                        zip = req.body.zip;
                                    if(typeof req.body.username!='undefined')
                                        uname = req.body.username;
                                    if(typeof req.body.password!='undefined')
                                        pwd = req.body.password;


                                    var upd = squel.update();
                                    upd.table('user_details').set('email', email).set('fname', fname).set('lname', lname).set('address', address)
                                        .set('city', city).set('state', state).set('zip', zip).set('uname', uname).set('pwd', pwd).set('role', 'normal').where('uname =' + '\'' + sess.username + '\'');
                                    console.log(upd.toString());

                                    connection.query(upd.toString(), function(err, rows) {
                                        if(!err){
                                            console.log('Update Success');
                                            success=true;
                                            //res.send(JSON.stringify({message:'Your information has been updated'}));
                                        }

                                        //Database 2






                                        connection3.connect(function(err){

                                            if(err){
                                                if(success==true||success1==true){
                                                    res.send(JSON.stringify({message:'Your details have been updated'}));
                                                }

                                                else if(success==false&&success1==false){
                                                    res.send(JSON.stringify({message:'There was a problem with this action'}));
                                                }

                                            }
                                            if(!err) {
                                                console.log("Database2 is connected ... \n\n");
                                                //Prepare update statement

                                                if(!sess.username){
                                                    console.log('Unauthorized user');
                                                    res.send(JSON.stringify({message:'Session not available'}));
                                                }

                                                else {
                                                    var temp = '\''+sess.username+'\'';
                                                    connection3.query('select email, fname, lname, address, city, state, zip, uname, pwd from user_details where uname = '+temp, function(err, rows) {
                                                        if(!err){
                                                            var email = rows[0].email;
                                                            var fname = rows[0].fname;
                                                            var lname = rows[0].lname;
                                                            var address = rows[0].address;
                                                            var city = rows[0].city;
                                                            var state = rows[0].state;
                                                            var zip = rows[0].zip;
                                                            var uname = rows[0].uname;
                                                            var pwd = rows[0].pwd;

                                                            //Update content based on existing details
                                                            var connection2 = mysql.createConnection({
                                                                host     : 'db2.cev9f9km5ing.us-east-1.rds.amazonaws.com',
                                                                user     : 'root',
                                                                password : 'Pop123465.',
                                                                database : 'Project2'
                                                            });


                                                            connection2.connect(function(err){
                                                                if(!err) {
                                                                    console.log("Database2 is connected ... \n\n");
                                                                    if(!sess.username){
                                                                        console.log('Unauthorized user');
                                                                        res.send(JSON.stringify({message:'Session not avaiable'}))
                                                                    }

                                                                    else {

                                                                        if(typeof req.body.email!='undefined')
                                                                            email = req.body.email;
                                                                        if(typeof req.body.fname!='undefined')
                                                                            fname = req.body.fname;
                                                                        if(typeof req.body.lname!='undefined')
                                                                            lname = req.body.lname;
                                                                        if(typeof req.body.address!='undefined')
                                                                            address = req.body.address;
                                                                        if(typeof req.body.city!='undefined')
                                                                            city = req.body.city;
                                                                        if(typeof req.body.state!='undefined')
                                                                            state = req.body.state;
                                                                        if(typeof req.body.zip!='undefined')
                                                                            zip = req.body.zip;
                                                                        if(typeof req.body.username!='undefined')
                                                                            uname = req.body.username;
                                                                        if(typeof req.body.password!='undefined')
                                                                            pwd = req.body.password;


                                                                        var upd = squel.update();
                                                                        upd.table('user_details').set('email', email).set('fname', fname).set('lname', lname).set('address', address)
                                                                            .set('city', city).set('state', state).set('zip', zip).set('uname', uname).set('pwd', pwd).set('role', 'normal').where('uname =' + '\'' + sess.username + '\'');
                                                                        console.log(upd.toString());

                                                                        connection2.query(upd.toString(), function(err, rows) {
                                                                            if(!err){
                                                                                console.log('Update Success');
                                                                               //res.send(JSON.stringify({message:'Your information has been updated'}));
                                                                                success1=true;
                                                                            }
                                                                            else
                                                                            console.log('false');

                                                                            if(success==true||success1==true){
                                                                                res.send(JSON.stringify({message:'Your details have been updated'}));
                                                                            }

                                                                            else if(success==false&&success1==false){
                                                                                res.send(JSON.stringify({message:'There was a problem with this action'}));
                                                                            }


                                                                        });


                                                                    }

                                                                    connection2.end();
                                                                    sess.username = uname;

                                                                } else {
                                                                    console.log("Error connecting to database2 ... \n\n");
                                                                }
                                                            });

                                                            //Prepare update statement



                                                        }
                                                        else
                                                            console.log('Error while fetching existing records');
                                                    });


                                                }

                                                connection3.end();

                                            } else {
                                                console.log("Error connecting to database2 ... \n\n");
                                            }
                                        });










                                    });


                                }

                                connection.end();
                                sess.username = uname;

                            } else {
                                console.log("Error connecting to database ... \n\n");
                            }
                        });

                        //Prepare update statement



                    }
                    else
                        console.log('Error while fetching existing records');
                });


            }

            connection1.end();

        } else {
            console.log("Error connecting to database ... \n\n");
        }
    });




};


