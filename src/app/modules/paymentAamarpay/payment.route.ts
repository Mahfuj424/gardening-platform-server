import { Router } from "express";
import { PaymentControllers } from "./payment.controller";

const router = Router()

router.post('/create' ,PaymentControllers.createPayment)

router.post('/confirmation' ,PaymentControllers.successUrl)

export const PaymentRouters = router;   