export interface ConnectivityChangedEvent {
  online: boolean;
}

const connectivityChangedEventName = "openmrs:connectivity-changed";

export function dispatchConnectivityChanged(online: boolean) {
  window.dispatchEvent(
    new CustomEvent(connectivityChangedEventName, { detail: { online } })
  );
}

/** @category Offline */
export function subscribeConnectivityChanged(
  cb: (ev: ConnectivityChangedEvent) => void
) {
  const handler = (ev: CustomEvent) => cb(ev.detail);
  window.addEventListener(connectivityChangedEventName, handler);
  return () =>
    window.removeEventListener(connectivityChangedEventName, handler);
}

/** @category Offline */
export function subscribeConnectivity(
  cb: (ev: ConnectivityChangedEvent) => void
) {
  cb({ online: navigator.onLine });
  return subscribeConnectivityChanged(cb);
}

export interface PrecacheStaticDependenciesEvent {}

const precacheStaticDependenciesEventName =
  "openmrs:precache-static-dependencies";

export function dispatchPrecacheStaticDependencies(
  data: PrecacheStaticDependenciesEvent = {}
) {
  window.dispatchEvent(
    new CustomEvent(precacheStaticDependenciesEventName, { detail: data })
  );
}

/** @category Offline */
export function subscribePrecacheStaticDependencies(
  cb: (data: PrecacheStaticDependenciesEvent) => void
) {
  const handler = (ev: CustomEvent) => cb(ev.detail);
  window.addEventListener(precacheStaticDependenciesEventName, handler);
  return () =>
    window.removeEventListener(precacheStaticDependenciesEventName, handler);
}

/** @category UI */
export interface ShowNotificationEvent {
  description: any;
  kind?:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";
  title?: string;
  action?: any;
  millis?: number;
}

export interface ShowActionableNotificationEvent {
  subtitle: any;
  kind?:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";
  title?: string;
  actionButtonLabel: string | any;
  onActionButtonClick: () => void;
  progressActionLabel?: string;
}

/** @category UI */
export interface ShowToastEvent {
  description: any;
  kind?:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";
  title?: string;
  millis?: number;
}

const notificationShownName = "openmrs:notification-shown";
const actionableNotificationShownName = "openmrs:actionable-notification-shown";
const toastShownName = "openmrs:toast-shown";

export function dispatchNotificationShown(data: ShowNotificationEvent) {
  window.dispatchEvent(
    new CustomEvent(notificationShownName, { detail: data })
  );
}

export function dispatchActionableNotificationShown(
  data: ShowActionableNotificationEvent
) {
  window.dispatchEvent(
    new CustomEvent(actionableNotificationShownName, { detail: data })
  );
}

/** @category UI */
export function subscribeNotificationShown(
  cb: (data: ShowNotificationEvent) => void
) {
  const handler = (ev: CustomEvent) => cb(ev.detail);
  window.addEventListener(notificationShownName, handler);
  return () => window.removeEventListener(notificationShownName, handler);
}

/** @category UI */
export function subscribeActionableNotificationShown(
  cb: (data: ShowActionableNotificationEvent) => void
) {
  const handler = (ev: CustomEvent) => cb(ev.detail);
  window.addEventListener(actionableNotificationShownName, handler);
  return () =>
    window.removeEventListener(actionableNotificationShownName, handler);
}

/** @category UI */
export function subscribeToastShown(cb: (data: ShowToastEvent) => void) {
  const handler = (ev: CustomEvent) => cb(ev.detail);
  window.addEventListener(toastShownName, handler);
  return () => window.removeEventListener(toastShownName, handler);
}

// This part of code is present to record the origin page when navigating to the patient chart.
export function handleRouteChange(evt) {
  const prevUrl = evt?.detail?.oldUrl;
  const newUrl = evt?.detail?.newUrl;

  const patientChartURLRegex = /\/patient\/([a-zA-Z0-9\-]+)\/chart\/?/;

  if (
    !patientChartURLRegex.test(prevUrl) &&
    patientChartURLRegex.test(newUrl)
  ) {
    const originPage = prevUrl.split(window.spaBase)?.[1];
    return originPage;
  }
}
