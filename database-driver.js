/* 
This file has dependencies on;
    - sequelize (npm install --save sequelize)
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


let HasEstablishedConnection = false;
const Sequelize = require('sequelize');
const sequelize = new Sequelize('ehealthy', 'spUser', 'StDYTY997$$$', {
    host: '34.77.128.244',
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// Returns a promise after creating the connection to the database
function OpenConnection() {
    if(HasEstablishedConnection) {
        console.log('Attempt to open connection aborted because connection has already been made')
        return;
    };

    return sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};

function CloseConnection() {
    sequelize.close()
};

function ArchiveHealthNotification(int_updateID) {
    return sequelize.query(`CALL ArchiveHealthNotification (${int_updateID})`);
};
function AssignPatientToGP(int_patientID, int_gpID) {
    return sequelize.query(`CALL AssignPatientToGP (${int_patientID}, ${int_gpID})`);
};
function ComparePassword(str_hash, str_email) {
    return sequelize.query(`CALL ComparePassword (${str_hash}, ${str_email})`);
};
function DeleteAccount(int_deleteID) {
    return sequelize.query(`CALL DeleteAccount (${int_deleteID})`);
};
function DeleteAccountRoles(int_deleteAccountID, int_deleteRolesID) {
    return sequelize.query(`CALL DeleteAccountRoles (${int_deleteAccountID}, ${int_deleteRolesID})`);
};
function DeleteGPRoleFromAccount(int_accountID) {
    return sequelize.query(`CALL DeleteGPRoleFromAccount (${int_accountID})`);
};
function DeleteGraph(int_deleteID) {
    return sequelize.query(`CALL DeleteGraph (${int_deleteID})`);
};
function DeleteGraphType(int_deleteID) {
    return sequelize.query(`CALL DeleteGraphType (${int_deleteID})`);
};
function DeleteHealthNotification(int_deleteID) {
    return sequelize.query(`CALL DeleteHealthNotification (${int_deleteID})`);
};
function DeleteMeasurementType(int_deleteID) {
    return sequelize.query(`CALL DeleteMeasurementType (${int_deleteID})`);
};
function DeleteMeasurements(int_deleteID) {
    return sequelize.query(`CALL DeleteMeasurements (${int_deleteID})`);
};
function DeletePassword(int_deleteID) {
    return sequelize.query(`CALL DeletePassword (${int_deleteID})`);
};
function DeletePatientRoleFromAccount(int_accountID) {
    return sequelize.query(`CALL DeletePatientRoleFromAccount (${int_accountID})`);
};
function DeleteRoles(int_deleteID) {
    return sequelize.query(`CALL DeleteRoles (${int_deleteID})`);
};
function DeleteScheduler(int_deleteID) {
    return sequelize.query(`CALL DeleteScheduler (${int_deleteID})`);
};
function InsertAccount(str_insertHash, str_insertEmail, str_insertName, date_insertDob, str_insertAddress, str_insertPhone) {
    return sequelize.query(`CALL InsertAccount (${str_insertHash}, ${str_insertEmail}, ${str_insertName}, ${date_insertDob}, ${str_insertAddress}, ${str_insertPhone})`);
};
function InsertGraph(str_insertTitle, int_insertGraphTypeID, int_insertHealthNotificationID) {
    return sequelize.query(`CALL InsertGraph (${str_insertTitle}, ${int_insertGraphTypeID}, ${int_insertHealthNotificationID})`);
};
function InsertGraphType(str_insertType) {
    return sequelize.query(`CALL InsertGraphType (${str_insertType})`);
};
function InsertHealthNotification(int_accountID, date_startDatetime, date_endDatetime, int_measurementTypeID) {
    return sequelize.query(`CALL InsertHealthNotification (${int_accountID}, ${date_startDatetime}, ${date_endDatetime}, ${int_measurementTypeID})`);
};
function InsertMeasurementType(str_insertType) {
    return sequelize.query(`CALL InsertMeasurementType (${str_insertType})`);
};
function InsertMeasurements(int_accountID, str_reading, int_measurementType) {
    return sequelize.query(`CALL InsertMeasurements (${int_accountID}, ${str_reading}, ${int_measurementType})`);
};
function InsertRoles(str_insertRoleType) {
    return sequelize.query(`CALL InsertRoles (${str_insertRoleType})`);
};
function InsertScheduler(date_insertPredictionTimePeriodtime, date_insertSyncTimePeriodtime) {
    return sequelize.query(`CALL InsertScheduler (${date_insertPredictionTimePeriodtime}, ${date_insertSyncTimePeriodtime})`);
};
function MarkHealthNotificationRead(int_updateID) {
    return sequelize.query(`CALL MarkHealthNotificationRead (${int_updateID})`);
};
function SelectAccountByEmailAndPassword(str_accountEmail, str_accountPasswordHash) {
    return sequelize.query(`CALL SelectAccountByEmailAndPassword (${str_accountEmail}, ${str_accountPasswordHash})`);
};
function SelectAccountByID(int_accountID) {
    return sequelize.query(`CALL SelectAccountByID (${int_accountID})`);
};
function SelectGPOfPatientByID(int_accountID) {
    return sequelize.query(`CALL SelectGPOfPatientByID (${int_accountID})`);
};
function SelectGraphByAccountID(int_patientID) {
    return sequelize.query(`CALL SelectGraphByAccountID (${int_patientID})`);
};
function SelectGraphByHealthNotificationID(int_healthNotificationID) {
    return sequelize.query(`CALL SelectGraphByHealthNotificationID (${int_healthNotificationID})`);
};
function SelectGraphByID(int_graphID) {
    return sequelize.query(`CALL SelectGraphByID (${int_graphID})`);
};
function SelectGraphTypeByID(int_graphTypeID) {
    return sequelize.query(`CALL SelectGraphTypeByID (${int_graphTypeID})`);
};
function SelectHealthNotificationByAccountID(int_accountID, bool_archived, bool_notificationRead) {
    return sequelize.query(`CALL SelectHealthNotificationByAccountID (${int_accountID}, ${bool_archived}, ${bool_notificationRead})`);
};
function SelectHealthNotificationByID(int_notificationID) {
    return sequelize.query(`CALL SelectHealthNotificationByID (${int_notificationID})`);
};
function SelectMeasurementTypeByID(int_measurementTypeID) {
    return sequelize.query(`CALL SelectMeasurementTypeByID (${int_measurementTypeID})`);
};
function SelectMeasurementsByAccountID(int_accountID) {
    return sequelize.query(`CALL SelectMeasurementsByAccountID (${int_accountID})`);
};
function SelectMeasurementsByAccountIDBetweenDates(int_accountID, date_startDatetime, date_endDatetime) {
    return sequelize.query(`CALL SelectMeasurementsByAccountIDBetweenDates (${int_accountID}, ${date_startDatetime}, ${date_endDatetime})`);
};
function SelectMeasurementsByID(int_measurementID) {
    return sequelize.query(`CALL SelectMeasurementsByID (${int_measurementID})`);
};
function SelectMeasurementsForHealthNotification(int_healthNotificationID) {
    return sequelize.query(`CALL SelectMeasurementsForHealthNotification (${int_healthNotificationID})`);
};
function SelectPatientsOfGPbyID(int_accountID) {
    return sequelize.query(`CALL SelectPatientsOfGPbyID (${int_accountID})`);
};
function SelectRoleByAccountID(int_accountID) {
    return sequelize.query(`CALL SelectRoleByAccountID (${int_accountID})`);
};
function SelectRoleByID(int_roleID) {
    return sequelize.query(`CALL SelectRoleByID (${int_roleID})`);
};
function SelectSchedulerByID(int_schedulerID) {
    return sequelize.query(`CALL SelectSchedulerByID (${int_schedulerID})`);
};
function SelectSchedulers() {
    return sequelize.query(`CALL SelectSchedulers ()`);
};
function SelectUnreadHealthNotificationByAccountID(int_accountID) {
    return sequelize.query(`CALL SelectUnreadHealthNotificationByAccountID (${int_accountID})`);
};
function UpdateAccount(int_updateId, str_updateEmail, str_updateName, date_updateDob, str_updateAddress, str_updatePhone) {
    return sequelize.query(`CALL UpdateAccount (${int_updateId}, ${str_updateEmail}, ${str_updateName}, ${date_updateDob}, ${str_updateAddress}, ${str_updatePhone})`);
};
function UpdateGraph(int_updateID, str_updateTitle) {
    return sequelize.query(`CALL UpdateGraph (${int_updateID}, ${str_updateTitle})`);
};
function UpdateGraphType(int_updateID, str_updateType) {
    return sequelize.query(`CALL UpdateGraphType (${int_updateID}, ${str_updateType})`);
};
function UpdateHealthNotification(int_updateID, date_updateStartDatetime, date_updateEndDatetime) {
    return sequelize.query(`CALL UpdateHealthNotification (${int_updateID}, ${date_updateStartDatetime}, ${date_updateEndDatetime})`);
};
function UpdateMeasurementType(int_updateID, str_updateType) {
    return sequelize.query(`CALL UpdateMeasurementType (${int_updateID}, ${str_updateType})`);
};
function UpdateMeasurements(int_updateID, int_updateReading) {
    return sequelize.query(`CALL UpdateMeasurements (${int_updateID}, ${int_updateReading})`);
};
function UpdatePassword(int_updateID, str_updateHash) {
    return sequelize.query(`CALL UpdatePassword (${int_updateID}, ${str_updateHash})`);
};
function UpdateRoles(int_updateID, str_updateRolesType) {
    return sequelize.query(`CALL UpdateRoles (${int_updateID}, ${str_updateRolesType})`);
};
function UpdateScheduler(int_updateID, date_updatePredictionTimePeriodtime, date_updateSyncTimePeriodtime) {
    return sequelize.query(`CALL UpdateScheduler (${int_updateID}, ${date_updatePredictionTimePeriodtime}, ${date_updateSyncTimePeriodtime})`);
};