import { load, hashComponents, type GetResult } from '@fingerprintjs/fingerprintjs';
import { browser } from "$app/environment";

let fingerprintjsStateResolve: (value: GetResult) => void;

const fingerprintjsState = $state<Promise<GetResult>>(new Promise<GetResult>((resolve) => {
  fingerprintjsStateResolve = resolve;
}));

let deviceIdStateResolve: (value: string) => void;

const deviceIdState = $state<Promise<string>>(new Promise<string>((resolve) => {
  deviceIdStateResolve = resolve;
}));

export const fingerprintjs = {
  get value() {
    return fingerprintjsState;
  },
  get deviceId() {
    return deviceIdState;
  }
};

export async function getDeviceId() {
  return await deviceIdState;
}

if (browser) {
  load()
    .then((fingerprintJS) => fingerprintJS.get())
    .then((result) => {
      const {
        // fonts: _getFonts,
        // domBlockers: _getDomBlockers,
        // fontPreferences: _getFontPreferences,
        // audio: _getAudioFingerprint,
        screenFrame: _getScreenFrame,
        // canvas: _getCanvasFingerprint,
        // osCpu: _getOsCpu,
        // languages: _getLanguages,
        // colorDepth: _getColorDepth,
        // deviceMemory: _getDeviceMemory,
        screenResolution: _getScreenResolution,
        // hardwareConcurrency: _getHardwareConcurrency,
        // timezone: _getTimezone,
        sessionStorage: _getSessionStorage,
        localStorage: _getLocalStorage,
        indexedDB: _getIndexedDB,
        openDatabase: _getOpenDatabase,
        // cpuClass: _getCpuClass,
        // platform: _getPlatform,
        plugins: _getPlugins,
        // touchSupport: _getTouchSupport,
        // vendor: _getVendor,
        // vendorFlavors: _getVendorFlavors,
        cookiesEnabled: _areCookiesEnabled,
        colorGamut: _getColorGamut,
        // invertedColors: _areColorsInverted,
        // forcedColors: _areColorsForced,
        // monochrome: _getMonochromeDepth,
        // contrast: _getContrastPreference,
        // reducedMotion: _isMotionReduced,
        // reducedTransparency: _isTransparencyReduced,
        // hdr: _isHDR,
        // math: _getMathFingerprint,
        // pdfViewerEnabled: _isPdfViewerEnabled,
        // architecture: _getArchitecture,
        // applePay: _getApplePayState,
        // privateClickMeasurement: _getPrivateClickMeasurement,
        // audioBaseLatency: _getAudioContextBaseLatency,
        // dateTimeLocale: _getDateTimeLocale,
        // webGlBasics: _getWebGlBasics,
        // webGlExtensions: _getWebGlExtensions,
        ...components
      } = result.components;
      const deviceId = hashComponents(components);
      deviceIdStateResolve(deviceId);
      fingerprintjsStateResolve(result);
    });
}