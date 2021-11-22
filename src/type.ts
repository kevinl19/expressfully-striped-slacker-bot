import { Request } from 'express';
import { Stripe } from 'stripe';
import EventValidator from './classes/eventValidator';
import EventNotifier from './classes/eventNotifier';
import { StripeEventType } from './enum';

interface RouteDependencies {
  eventValidator: EventValidator,
  eventNotifier: EventNotifier
}

interface ModifiedRequest extends Request {
  rawBody?: string,
}

type StripeObject =
  Stripe.Event
  | Stripe.SubscriptionItem
  | Stripe.BalanceTransaction
  | Stripe.Balance
  | Stripe.Subscription
  | Stripe.Customer
  | Stripe.PaymentIntent
  | Stripe.Account

interface StripeEvent extends Stripe.Event {
  type: StripeEventType,
  data: {
    object: StripeObject,
    previous_attributes?: {
      status?: Stripe.Subscription.Status
    };
  },
}

export {
  RouteDependencies,
  ModifiedRequest,
  StripeEvent,
  StripeObject,
};
