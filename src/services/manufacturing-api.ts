// import config from '../config';
import { isContentTypeJson } from '../utils/http-utils';
import logger from './logger';

const log = logger('manufacturing');

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
const useProd = true;
const config = {
  MFG_API_URL: useProd ? 'https://api.trgsoftware.net' : 'http://localhost:5000'
}

/**
 * Retrieves global configuration
 */
export async function getConfiguration(token: string) {
  let url = `${config.MFG_API_URL}/configuration`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });
  if (response.status === 200) {
    const body = await response.json();
    return body;
  }
  // unexpected error
  const responseText = JSON.stringify(response.text(), null, 4);
  log.error(`HTTP Error ${response.status}: ${responseText}`);
  return { status: response.status, error: responseText };
}

/**
 * Put a new configuration 
 */
export async function putConfiguration(data: any, token: string) {
  const response = await fetch(`${config.MFG_API_URL}/configuration`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 200) {
    const responseText = JSON.stringify(response.text(), null, 4);
    log.error(`HTTP Error ${response.status}: ${responseText}`);
    return { status: response.status, error: responseText };
  }
  log.info(`PUT Configuration Response: ${JSON.stringify(response, null, 4)}`);
  const body = response.json();
  log.info(`PUT Configuration Response Body: ${JSON.stringify(body, null, 4)}`);
  return body;
}

/**
 * Reset configuration 
 */
export async function resetConfiguration(token: string) {
  const response = await fetch(`${config.MFG_API_URL}/configuration/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: '',
  });
  if (response.status !== 200) {
    const responseText = JSON.stringify(response.text(), null, 4);
    log.error(`HTTP Error ${response.status}: ${responseText}`);
    return { status: response.status, error: responseText };
  }
  log.info(`POST ResetConfiguration Response: ${JSON.stringify(response, null, 4)}`);
  const body = response.json();
  return body;
}


/**
 * Retrieves all orders
 */
export async function getOrders(token: string, station: string | undefined = undefined) {
  let url = `${config.MFG_API_URL}/orders`;
  if (station) {
    url += `?station=${station}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });
  if (response.status === 200) {
    const body = await response.json();
    if (body.length >= 1) {
      return body;
    }
    else {  // no orders found
      return [];
    }
  }
  // unexpected error
  const responseText = JSON.stringify(response.text(), null, 4);
  log.error(`HTTP Error ${response.status}: ${responseText}`);
  return { status: response.status, error: responseText };
}

/**
 * Retrieves an order record from the API
 * @param orderId Deprecated Order ID to lookup
 * @returns The order record from the API; undefined if it doesn't exist
 */
export async function getOrderById(orderId: string, token: string) {
  const response = await fetch(`${config.MFG_API_URL}/orders?ref=${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });
  if (response.status === 200) {
    const body = await response.json();
    if (body.length >= 1) {
      return body[0];
    }
    else {  // no order found
      return {};
    }
  }
  // unexpected error
  const responseText = JSON.stringify(response.text(), null, 4);
  log.error(`HTTP Error ${response.status}: ${responseText}`);
  return { status: response.status, error: responseText };
}

export async function putOrder(data: any, token: string) {
  const response = await fetch(`${config.MFG_API_URL}/orders`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 200) {
    const responseText = JSON.stringify(response.text(), null, 4);
    log.error(`HTTP Error ${response.status}: ${responseText}`);
    return { status: response.status, error: responseText };
  }
  log.info(`PUT Order Response: ${JSON.stringify(response, null, 4)}`);
  const body = response.json();
  log.info(`PUT Order Response Body: ${JSON.stringify(body, null, 4)}`);
  return body;
}

export async function releaseItem(data: any, token: string) {
  const response = await fetch(`${config.MFG_API_URL}/orders/actions/release`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 200) {
    const responseText = JSON.stringify(response.text(), null, 4);
    log.error(`HTTP Error ${response.status}: ${responseText}`);
    return { status: response.status, error: responseText };
  }
  log.info(`POST release Item Response: ${JSON.stringify(response, null, 4)}`);
  const body = response.json();
  log.info(`POST release Item Response Body: ${JSON.stringify(body, null, 4)}`);
  return body;
}

export async function releaseMany(data: any, token: string) {
  const response = await fetch(`${config.MFG_API_URL}/orders/actions/releaseMany`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 200 && isContentTypeJson(response)) {
      const body = await response.json();
      const responseBody = JSON.stringify(body, null, 4);
      log.error(`HTTP Error ${response.status}: ${responseBody}`);
      return { status: response.status, error: body };
  }
  else if (response.status !== 200) {
    const text = await response.text();
    const responseText = JSON.stringify(text, null, 4);
    log.error(`HTTP Error ${response.status}: ${responseText}`);
    return { status: response.status, error: responseText };
  }
  log.info(`POST release multiple items Response: ${JSON.stringify(response, null, 4)}`);
  const body = response.json();
  log.info(`POST release multiple items Response Body: ${JSON.stringify(body, null, 4)}`);
  return body;
}
