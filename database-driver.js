/* 
This file has dependencies on;
    - _sequelize (npm install --save _sequelize)
    - mariadb (npm install --save mariadb)

This file establishes database access for the eHealthy database and its 53 stored procedures.

Note: Best practise would be to not include the username/host/password in the file and has been 
      included to allow ease of use.

How to use this file:
 - OpenConnection() MUST be called.
 - When closing the server, you MUST call CloseConnection();
 - It is expected that parameters prepended with;
           - int, are whole numbers
           - str, are strings. no longer than 255 characters
           - bool, are either the numerical value 0 or 1
           - date, are SQL compatable date strings eg. (2009-10-04 22:23:00) or yyyy-MM-dd hh:mm:ss
 - All methods return a promise, it is expected that the .then() and .catch()
   handlers are added within the business logic.
*/

const Sequelize = require('sequelize');

module.exports = {

HasEstablishedConnection: false,
_sequelize: new Sequelize('ehealthy', 'spUser', 'StDYTY997$$$', {
    host: '34.77.128.244',
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}),

// Returns a promise after creating the connection to the database
OpenConnection: function() {
    if(HasEstablishedConnection) {
        console.log('Attempt to open connection aborted because connection has already been made')
        return;
    }

    return _sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
},

CloseConnection: function() {
    this._sequelize.close()
},

ArchiveHealthNotification: function(int_updateID) {
    return this._sequelize.query(`CALL ArchiveHealthNotification (${int_updateID})`);
},
AssignPatientToGP: function(int_patientID, int_gpID) {
    return _sequelize.query(`CALL AssignPatientToGP (${int_patientID}, ${int_gpID})`);
},
ComparePassword: function(str_hash, str_email) {
    return _sequelize.query(`CALL ComparePassword ('${str_hash}', '${str_email}')`);
},
DeleteAccount: function(int_deleteID) {
    return _sequelize.query(`CALL DeleteAccount (${int_deleteID})`);
},
DeleteAccountRoles: function(int_deleteAccountID, int_deleteRolesID) {
    return _sequelize.query(`CALL DeleteAccountRoles (${int_deleteAccountID}, ${int_deleteRolesID})`);
},
DeleteGPRoleFromAccount: function(int_accountID) {
    return _sequelize.query(`CALL DeleteGPRoleFromAccount (${int_accountID})`);
},
DeleteGraph: function(int_deleteID) {
    return _sequelize.query(`CALL DeleteGraph (${int_deleteID})`);
},
DeleteGraphType: function(int_deleteID) {
    return _sequelize.query(`CALL DeleteGraphType (${int_deleteID})`);
},
DeleteHealthNotification: function(int_deleteID) {
    return _sequelize.query(`CALL DeleteHealthNotification (${int_deleteID})`);
},
DeleteMeasurementType: function(int_deleteID) {
    return _sequelize.query(`CALL DeleteMeasurementType (${int_deleteID})`);
},
DeleteMeasurements: function(int_deleteID) {
    return _sequelize.query(`CALL DeleteMeasurements (${int_deleteID})`);
},
DeletePassword: function(int_deleteID) {
    return _sequelize.query(`CALL DeletePassword (${int_deleteID})`);
},
DeletePatientRoleFromAccount: function(int_accountID) {
    return _sequelize.query(`CALL DeletePatientRoleFromAccount (${int_accountID})`);
},
DeleteRoles: function(int_deleteID) {
    return _sequelize.query(`CALL DeleteRoles (${int_deleteID})`);
},
DeleteScheduler: function(int_deleteID) {
    return _sequelize.query(`CALL DeleteScheduler (${int_deleteID})`);
},
InsertAccount: function(str_insertHash, str_insertEmail, str_insertName, date_insertDob, str_insertAddress, str_insertPhone) {
    return _sequelize.query(`CALL InsertAccount ('${str_insertHash}', '${str_insertEmail}', '${str_insertName}', '${date_insertDob}', '${str_insertAddress}', '${str_insertPhone}')`);
},
InsertGraph: function(str_insertTitle, int_insertGraphTypeID, int_insertHealthNotificationID) {
    return _sequelize.query(`CALL InsertGraph ('${str_insertTitle}', ${int_insertGraphTypeID}, ${int_insertHealthNotificationID})`);
},
InsertGraphType: function(str_insertType) {
    return _sequelize.query(`CALL InsertGraphType ('${str_insertType}')`);
},
InsertHealthNotification: function(int_accountID, date_startDatetime, date_endDatetime, int_measurementTypeID) {
    return _sequelize.query(`CALL InsertHealthNotification (${int_accountID}, '${date_startDatetime}', '${date_endDatetime}', ${int_measurementTypeID})`);
},
InsertMeasurementType: function(str_insertType) {
    return _sequelize.query(`CALL InsertMeasurementType ('${str_insertType}')`);
},
InsertMeasurements: function(int_accountID, str_reading, int_measurementType) {
    return _sequelize.query(`CALL InsertMeasurements (${int_accountID}, '${str_reading}', ${int_measurementType})`);
},
InsertRoles: function(str_insertRoleType) {
    return _sequelize.query(`CALL InsertRoles ('${str_insertRoleType}')`);
},
InsertScheduler: function(date_insertPredictionTimePeriodtime, date_insertSyncTimePeriodtime) {
    return _sequelize.query(`CALL InsertScheduler ('${date_insertPredictionTimePeriodtime}', '${date_insertSyncTimePeriodtime}')`);
},
MarkHealthNotificationRead: function(int_updateID) {
    return _sequelize.query(`CALL MarkHealthNotificationRead (${int_updateID})`);
},
SelectAccountByEmailAndPassword: function(str_accountEmail, str_accountPasswordHash) {
    return this._sequelize.query(`CALL SelectAccountByEmailAndPassword ('${str_accountEmail}', '${str_accountPasswordHash}')`);
},
SelectAccountByID: function(int_accountID) {
    return _sequelize.query(`CALL SelectAccountByID (${int_accountID})`);
},
SelectGPOfPatientByID: function(int_accountID) {
    return _sequelize.query(`CALL SelectGPOfPatientByID (${int_accountID})`);
},
SelectGraphByAccountID: function(int_patientID) {
    return _sequelize.query(`CALL SelectGraphByAccountID (${int_patientID})`);
},
SelectGraphByHealthNotificationID: function(int_healthNotificationID) {
    return _sequelize.query(`CALL SelectGraphByHealthNotificationID (${int_healthNotificationID})`);
},
SelectGraphByID: function(int_graphID) {
    return _sequelize.query(`CALL SelectGraphByID (${int_graphID})`);
},
SelectGraphTypeByID: function(int_graphTypeID) {
    return _sequelize.query(`CALL SelectGraphTypeByID (${int_graphTypeID})`);
},
SelectHealthNotificationByAccountID: function(int_accountID, bool_archived, bool_notificationRead) {
    return _sequelize.query(`CALL SelectHealthNotificationByAccountID (${int_accountID}, ${bool_archived}, ${bool_notificationRead})`);
},
SelectHealthNotificationByID: function(int_notificationID) {
    return _sequelize.query(`CALL SelectHealthNotificationByID (${int_notificationID})`);
},
SelectMeasurementTypeByID: function(int_measurementTypeID) {
    return _sequelize.query(`CALL SelectMeasurementTypeByID (${int_measurementTypeID})`);
},
SelectMeasurementsByAccountID: function(int_accountID) {
    return _sequelize.query(`CALL SelectMeasurementsByAccountID (${int_accountID})`);
},
SelectMeasurementsByAccountIDBetweenDates: function(int_accountID, date_startDatetime, date_endDatetime) {
    return _sequelize.query(`CALL SelectMeasurementsByAccountIDBetweenDates (${int_accountID}, '${date_startDatetime}', '${date_endDatetime}')`);
},
SelectMeasurementsByID: function(int_measurementID) {
    return _sequelize.query(`CALL SelectMeasurementsByID (${int_measurementID})`);
},
SelectMeasurementsForHealthNotification: function(int_healthNotificationID) {
    return _sequelize.query(`CALL SelectMeasurementsForHealthNotification (${int_healthNotificationID})`);
},
SelectPatientsOfGPbyID: function(int_accountID) {
    return _sequelize.query(`CALL SelectPatientsOfGPbyID (${int_accountID})`);
},
SelectRoleByAccountID: function(int_accountID) {
    return _sequelize.query(`CALL SelectRoleByAccountID (${int_accountID})`);
},
SelectRoleByID: function(int_roleID) {
    return _sequelize.query(`CALL SelectRoleByID (${int_roleID})`);
},
SelectSchedulerByID: function(int_schedulerID) {
    return _sequelize.query(`CALL SelectSchedulerByID (${int_schedulerID})`);
},
SelectSchedulers: function() {
    return _sequelize.query(`CALL SelectSchedulers ()`);
},
SelectUnreadHealthNotificationByAccountID: function(int_accountID) {
    return _sequelize.query(`CALL SelectUnreadHealthNotificationByAccountID (${int_accountID})`);
},
UpdateAccount: function(int_updateId, str_updateEmail, str_updateName, date_updateDob, str_updateAddress, str_updatePhone) {
    return _sequelize.query(`CALL UpdateAccount (${int_updateId}, '${str_updateEmail}', '${str_updateName}', '${date_updateDob}', '${str_updateAddress}', '${str_updatePhone}')`);
},
UpdateGraph: function(int_updateID, str_updateTitle) {
    return _sequelize.query(`CALL UpdateGraph (${int_updateID}, '${str_updateTitle}')`);
},
UpdateGraphType: function(int_updateID, str_updateType) {
    return _sequelize.query(`CALL UpdateGraphType (${int_updateID}, '${str_updateType}')`);
},
UpdateHealthNotification: function(int_updateID, date_updateStartDatetime, date_updateEndDatetime) {
    return _sequelize.query(`CALL UpdateHealthNotification (${int_updateID}, '${date_updateStartDatetime}', '${date_updateEndDatetime}')`);
},
UpdateMeasurementType: function(int_updateID, str_updateType) {
    return _sequelize.query(`CALL UpdateMeasurementType (${int_updateID}, '${str_updateType}')`);
},
UpdateMeasurements: function(int_updateID, int_updateReading) {
    return _sequelize.query(`CALL UpdateMeasurements (${int_updateID}, ${int_updateReading})`);
},
UpdatePassword: function(int_updateID, str_updateHash) {
    return _sequelize.query(`CALL UpdatePassword (${int_updateID}, '${str_updateHash}')`);
},
UpdateRoles: function(int_updateID, str_updateRolesType) {
    return _sequelize.query(`CALL UpdateRoles (${int_updateID}, '${str_updateRolesType}')`);
},
UpdateScheduler: function(int_updateID, date_updatePredictionTimePeriodtime, date_updateSyncTimePeriodtime) {
    return _sequelize.query(`CALL UpdateScheduler (${int_updateID}, '${date_updatePredictionTimePeriodtime}', '${date_updateSyncTimePeriodtime}')`);
}
}