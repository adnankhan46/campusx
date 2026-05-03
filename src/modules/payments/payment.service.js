import Opportunity from '../opportunity/opportunity.model.js';
import { ApiErrors } from '../../shared/utils/index.js';
import { client } from '../../shared/utils/paymentConfig.js';
import config from '../../config/index.js';
import logger from '../../shared/utils/logger.js';

/**
 * Payment Service - Business logic layer
 * Handles payment operations for company/provider
 *
 * paymentLevel: 1 -> for 1st payment (default)
 *               2 -> for 2nd payment
 */

export const paymentService = {
  /**
   * Create a payment link for an opportunity
   * @param {string} oppId - Opportunity ID
   * @returns {Promise<Object>} Payment link and details
   */
  async makePayment(oppId) {
    const opportunity = await Opportunity.findById(oppId).populate('createdBy.id').exec();

    if (!opportunity) {
      throw ApiErrors.notFound('Opportunity not found');
    }

    if (!opportunity.isPaid) {
      throw ApiErrors.unauthorized('FREEE'); // Not Paid Opp
    }

    // MUST: Converting Mongoose Obj to Plain Obj
    const plainObject = opportunity.toObject();
    logger.info(`[PAYMENT]: FirstPayment status: ${Boolean(plainObject.paymentStatus.firstPayment.status)}`);

    let paymentLevel = '1'; // by default level is 1 for 1st payment

    if ((plainObject.paymentStatus.firstPayment.status)) {
      paymentLevel = '2'; // if 1st payment true, then it is for second payment
    }

    const paymentAmount = opportunity.amount;

    // company information
    const companyEmail = opportunity.createdBy.id.email || 'email';
    const companyName = opportunity.createdBy.id.username || 'Comp Name';

    // Treat This Specific Opportunity as the 'Product'
    const productCart = [
      {
        product_id: config.PRODUCT_ID,
        product_name: 'Cx_op',
        quantity: 1,
        amount: paymentAmount * 0.5 * 100, // 50% upfront
      },
    ];

    const payment_order = await client.payments.create({
      payment_link: true,
      billing: {
        city: 'SampleCity',
        country: 'IN',
        state: 'SampleState',
        street: 'Sample Street',
        zipcode: '123456',
      },
      customer: { email: companyEmail, name: companyName },
      currency: 'INR',
      metadata: {
        type: `First Payment [${companyName}]`,
        msg: 'First Payment has been done',
        oppId: String(opportunity._id),
        paymentLevel: String(paymentLevel),
      },
      notes: {
        type: `First Payment [${companyName}]`,
        msg: 'Payment has been done',
      },
      product_cart: productCart,
    });

    return {
      link: payment_order.payment_link,
      company: companyName,
      message: `Payment Link is sent, kindly make your ${paymentLevel === '1' ? 'first' : 'second'} payment`,
      paymentLevel,
    };
  },
};
