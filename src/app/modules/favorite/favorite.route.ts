import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { FavoriteControllers } from "./favorite.controller";
import { FavoriteValidations } from "./favorite.validation";

const router = Router();

router.post(
  "/create-favorite",
  validateRequest(FavoriteValidations.createFavoriteSchema),
  FavoriteControllers.createFavorite
);

router.delete("/", FavoriteControllers.deleteFavorite);

router.get("/", FavoriteControllers.getAllFavorite);
router.get('/:id',)

export const FavoriteRoutes = router;
