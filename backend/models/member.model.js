module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("member", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        country : {
            type: Sequelize.STRING
        },
        pincode : {
            type: Sequelize.STRING
        },
        parentId : {
            type: Sequelize.INTEGER
        },
        level : {
            type: Sequelize.INTEGER
        },
        active : {
            type: Sequelize.INTEGER
        }
    });
    return Member;
};