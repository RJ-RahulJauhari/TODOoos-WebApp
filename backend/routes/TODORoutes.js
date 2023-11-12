const { Router } = require("express");
const { getTODOS, saveTODOS, deleteTODO, updateTODO, addManyTODOS, search, clearAll, remakeTODOS } = require("../controller/TODOCOntroller");
const router = Router();


router.get("/get", getTODOS);
router.get("/search/:q", search);
router.post("/save", saveTODOS);
router.delete("/delete", deleteTODO);
router.delete('/clear', clearAll);
router.patch('/update', updateTODO);

// Development Routes
router.post("/dev/addMany", addManyTODOS);
router.post("/dev/remake", remakeTODOS);

module.exports = router;