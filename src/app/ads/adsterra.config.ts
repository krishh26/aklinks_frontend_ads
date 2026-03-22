/**
 * Adsterra: adding units under Websites only registers them in Adsterra.
 * Each format needs its own code on your site (this file + templates).
 *
 * Open GET CODE for each active unit and copy values here:
 * - Banner / Native Banner: long "key" string + script host + width/height (NOT the numeric unit ID).
 * - Smartlink: the full tracking URL only.
 * - Popunder: the `src="..."` URL from the script tag (one per site; inactive in dashboard = no delivery).
 */
export interface AdsterraPlacement {
  readonly key: string;
  readonly width: number;
  readonly height: number;
  /** Host only, no protocol (must match GET CODE exactly). */
  readonly scriptHost: string;
  readonly enabled?: boolean;
}

export const ADSTERRA_PLACEMENTS = {
  /** Banner 160×600 — dashboard unit 28855890 */
  banner160: {
    key: '83b04f794755e1649ff671e166377927',
    width: 160,
    height: 600,
    scriptHost: 'progressmagnify.com',
  },
  /** Banner 160×300 — Progress Magnify */
  banner160x300: {
    key: '18acd2892012e10f2e2f388a0edc2cac',
    width: 160,
    height: 300,
    scriptHost: 'progressmagnify.com',
  },
  /**
   * Native Banner — dashboard unit 29045735.
   * Paste key + host + dimensions from GET CODE (leave key '' until pasted — slot stays hidden).
   */
  nativeBanner: {
    key: '',
    width: 300,
    height: 250,
    scriptHost: 'www.highperformformat.com',
  },
} as const satisfies Record<string, AdsterraPlacement>;

export type AdsterraPlacementKey = keyof typeof ADSTERRA_PLACEMENTS;

/** Smartlink — dashboard unit 28819791: paste full URL from GET CODE. */
export const ADSTERRA_SMARTLINK_URL = '';

/**
 * Popunder — dashboard unit 28761990: paste only the script `src` URL.
 * Keep empty while status is Inactive / until you resubmit and approve.
 */
export const ADSTERRA_POPUNDER_SCRIPT_SRC = '';

export function getAdsterraPlacement(key: AdsterraPlacementKey): AdsterraPlacement | null {
  const p = ADSTERRA_PLACEMENTS[key] as AdsterraPlacement;
  if (p.enabled === false) {
    return null;
  }
  if (!p.key?.trim()) {
    return null;
  }
  return p;
}

export function adsterraSmartlinkActive(): boolean {
  return Boolean(ADSTERRA_SMARTLINK_URL?.trim());
}
