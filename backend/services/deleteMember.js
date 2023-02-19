const db = require("../models");
const Member = db.members;

const deleteMember = async (req, res) => {
    const { id, parentId } = req.body
    let num = 0;
    try {
        num = await Member.update({
            active: 0
        }, { where: { id: id } });

        num = await Member.update({
            parentId: parentId
        }, { where: { parentId: id } });
        console.log("gaurccc---------------------------", num);

        res.send({
            success: true,
            message: "Member was deleted successfully."
        });

    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: "Error in deleting Member."
        });
    }
}


module.exports = deleteMember;