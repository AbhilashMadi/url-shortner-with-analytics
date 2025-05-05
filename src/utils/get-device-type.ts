import DeviceType from "@/utils/device-types.js";

export function getDeviceType(userAgent: string) {
  const browser = getBrowser(userAgent);
  const os = getOS(userAgent);
  const deviceType = getDevice(userAgent);

  return { browser, os, deviceType };
}

function getBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Unknown';
}

function getOS(userAgent: string): string {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS X')) return 'Mac OS X';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iPhone')) return 'iOS';
  return 'Unknown';
}

function getDevice(userAgent: string): DeviceType {
  if (userAgent.includes('Mobile')) return DeviceType.MOBILE;
  if (userAgent.includes('Tablet')) return DeviceType.TABLET;
  return DeviceType.DESKTOP;
}
