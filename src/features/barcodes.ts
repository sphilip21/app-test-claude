/**
 * For information about the cut list format, see the /doc/architecture/02-hardware-support
 */
export function generateBarcodes(selected: any) {
  const barcodes = selected
    .filter((item: any) => item.material.startsWith('20-') || item.material.startsWith('15-'))
    .sort((a: any, b: any) => {
      return (a.profile < b.profile) ? -1 : 1;
    })
    .map((item: any) => ({
      profile: item.profile,
      magMchNo: item.workflow.magMchNo,
      offset: item.workflow.loadOffset,
      longCount: 2 * item.quantity,
      shortCount: (item.dimensions.nSides - 2) * item.quantity,
      longLength: item.dimensions.length,
      shortLength: item.dimensions.width,
      ref: item.order?.ref,
      code: item.order?.code,
      desc: item.description,
      item: item,
      order: item.order,
    }));

  return barcodes.map(addFormattedStringToBarcodes);
}


function addFormattedStringToBarcodes(i: any) {
  // Per RAC docs this is the:
  // "length that magnet should be shorter than gasket ... Each unit represents 1/8 inch"
  const offset = formatOffset(i.offset);
  const longCount = formatCount(i.longCount);
  const shortCount = formatCount(i.shortCount);

  // Lengths and length adjustments
  let longLength = Number(i.longLength);
  let shortLength = Number(i.shortLength);
  const d2dOffset: number = i.item.workflow?.d2dLoadOffset || 0.0;
  console.log(`Pre-Computation: Long length: ${longLength}, short length: ${shortLength}`);
  if (i.item.dimensions.dart2dart && i.item.dimensions.nSides === 4) {
    longLength +=  Number(d2dOffset);
    shortLength += Number(d2dOffset);
    console.log(`Post-Computation01: Long length: ${longLength}, short length: ${shortLength}`);
  }
  else if (i.item.dimensions.dart2dart && i.item.dimensions.nSides === 3) {
    longLength += Number(d2dOffset) / 2;
    shortLength += Number(d2dOffset);
    console.log(`Post-Computation02: Long length: ${longLength}, short length: ${shortLength}`);
  }


  // Per Judy: All 3-sided gaskets, no matter how they were measured, should then have 1/4"
  // deducted from the total on the length pieces only.
  if (i.item.dimensions.nSides === 3) {
    longLength = Number(longLength) - 0.25;
  }

  // Format the lengths per barcode format spec
  const longLen = formatLength(longLength);
  const shortLen = formatLength(shortLength);
  console.log(`Long length: ${longLength}, short length: ${shortLength}`);

  // Format the barcode
  const fmt = formatBarcode(i.profile, i.magMchNo, offset, longCount, longLen, shortCount, shortLen)
  i.formatted = fmt;
  return i;
}

function formatBarcode(
  profile: string, magMchNo: string, offset: string,
  longCount: string, longLen: string, shortCount: string, shortLen: string
) {
  // Debug
  console.log(profile, magMchNo, offset, longCount, longLen, shortCount, shortLen)

  if (profile.length !== 3) {
    console.error(`Profile ${profile} is incorrect.  Should be 3 digits.`)
  }
  if (magMchNo.length !== 1) {
    console.error(`MagMchNo ${magMchNo} is incorrect.  Should be 1 digit.`)
  }
  if (offset.length !== 2) {
    console.error(`Offset ${offset} is incorrect.  Should be 2 digits.`)
  }
  if (longCount.length !== 2) {
    console.error(`Long count ${longCount} is incorrect.  Should be 2 digits.`)
  }
  if (longLen.length !== 3) {
    console.error(`Long length ${longLen} is incorrect.  Should be 3 digits.`)
  }
  if (shortCount.length !== 2) {
    console.error(`Short count ${shortCount} is incorrect.  Should be 2 digits.`)
  }
  if (shortLen.length !== 3) {
    console.error(`Short length ${shortLen} is incorrect.  Should be 3 digits.`)
  }

  const fmt = `${profile}${magMchNo}${offset}${longCount}${longLen}${shortCount}${shortLen}`;
  return fmt;
}


function formatOffset(offset: number) {
  const eigths = offset / (1/8);
  const formatted = Math.floor(eigths).toFixed(0).padStart(2, '0');
  if (formatted.length !== 2) {
    console.error(`Offset length ${formatted} is incorrect.  Should be 2 digits.`)
  }
  return formatted;

}

/**
 * Returns the given number as a 2-digit string.
 *
 * Special Case: For barcode item counts >99, TRG wants the count to be 0 so
 * that it can be manually adjusted at the machine.
 */
function formatCount(count: number) {
  // Special case
  if (count > 99) {
    return '00';
  }
  const formatted = `${Math.floor(count).toFixed(0).padStart(2, '0')}`;
  if (formatted.length !== 2) {
    console.error(`Count ${formatted} is incorrect.  Should be 2 digits.`)
  }
  return formatted;
}

/**
 * Lengths used in barcodes are 3 digit numbers. The first two digits represent the whole number
 * length in inches. The last digit represents the fractional length in increments of 1/8".
 * All measurements with 16ths should round down to the next 8th.
 */
function formatLength(length: number) {
  console.log('in: ', length, typeof(length));
  const root = `${Math.floor(length).toFixed(0).padStart(2, '0')}`;
  const eighths = `${Math.floor((length - Math.floor(length)) / (1/8)).toFixed(0)}`;
  if (root.length !== 2) {
    console.error(`Length root ${root} is incorrect.  Should be 2 digits.`)
  }
  if (eighths.length !== 1) {
    console.error(`Length eigths ${eighths} is incorrect.  Should be 1 digit.`)
  }

  return `${root}${eighths}`;

}


const exportObject = {
  generateBarcodes
};

export default exportObject;
