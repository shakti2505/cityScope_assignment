import express from "express";
import creatorProfileModal from "../../models/creatorsProfile.js";
import offeringModal from "../../models/offeringModal.js";
import { authorization } from "../../middleware/authMiddleWare.js";

const router = express.Router();

//add creators
router.post("/addcreators", async (req, res) => {
  const { name, aboutMe, bio, bookings, rating, profilePic } = req.body;
  const newCreators = new creatorProfileModal({
    name,
    aboutMe,
    bio,
    bookings,
    rating,
    profilePic,
  });
  const saved = await newCreators.save();
  return res.status(201).json(saved);
});

router.post("/addoffering", async (req, res) => {
  const { title, ratings, price, duration, courseDetails, slots, creator } =
    req.body;
  const newOffering = new offeringModal({
    title,
    ratings,
    price,
    duration,
    courseDetails,
    slots,
    creator,
  });
  const saved = await newOffering.save();
  return res.status(201).json(saved);
});



router.get(
  "/searchByCreatornameOrLanguage/:nameOrLanguage",
  async (req, res) => {
    const { nameOrLanguage } = req.params;

    try {
      if (nameOrLanguage) {
        // Find by creator name
        const creatorByName = await creatorProfileModal.find({});
        const matchingCreator = creatorByName.filter(
          (user) => user.name.toLowerCase() === nameOrLanguage.toLowerCase()
        );
        if (matchingCreator.length > 0) {
          return res.status(200).json(matchingCreator);
        }

        // Find by language using text search
        const creatorByLanguage = await creatorProfileModal.find({
          $text: { $search: nameOrLanguage },
        });

        if (creatorByLanguage.length > 0) {
          return res.status(200).json(creatorByLanguage);
        }

        // If no creators found
        return res.status(404).json({ message: "No creators found" });
      } else {
        return res
          .status(400)
          .json({ message: "No search parameter provided" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);
// get creator by ID
router.get("/getCraetorById/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const creator = await creatorProfileModal.findById(id);
    if (!creator) {
      return res.status(400).json({ message: "No creator found" });
    } else {
      return res.status(200).json(creator);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getallcreator", authorization, async (req, res) => {
  try {
    const allCreator = await creatorProfileModal.find({});
    if (!allCreator) {
      return res.status(400).json({ message: "No creator found" });
    } else {
      return res.status(200).json(allCreator);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getOfferingByCreatorId/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;

    const [offering, creatorDetails] = await Promise.all([
      offeringModal.find({ creator: id }),
      creatorProfileModal.findById(id)
    ]);

    if (offering.length > 0 && creatorDetails) {
      const offeringWithCreatorDetails = {
        offering,
        creatorDetails: creatorDetails.toObject()
      };
      return res.status(200).json(offeringWithCreatorDetails);
    } else {
      return res.status(404).json({ message: "No offering or creator details found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/getOfferingByid/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const offering = await offeringModal.findById(id);
    const creatorDetails = await creatorProfileModal.findById(offering.creator);

    if (offering && creatorDetails) {
      const offeringWithCreatorDetails = {
        ...offering.toObject(),
        creatorDetails: creatorDetails.toObject(),
      };
      return res.status(200).json(offeringWithCreatorDetails);
    } else {
      return res.status(400).json({ message: "No offering found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get all creator
router.get("/getallcretorForHome", async (req, res) => {
  try {
    const allCreators = await creatorProfileModal
      .find({})
      .select("name profilePic aboutMe");

    if (allCreators.length > 0) {
      return res.status(200).json(allCreators);
    } else {
      return res.status(404).json({ message: "No creators found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
