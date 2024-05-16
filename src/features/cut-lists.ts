/**
 * For information about the cut list format, see the /doc/architecture/02-hardware-support/cut-lists.md
 */

import { roundDownToNearestEigth } from "../utils/math-helpers";

export function generateCutLists(selected: any) {
  console.log('generateCutLists called ...');
  console.log(selected);

  const ts = new Date();
  const dt = ts.toISOString().split('T')[0];
  const fileName = `CutLists_${dt}.cmr`;
  let fileContents = '';

  // Add data to file contents
  fileContents += `LineItem\n`;
  fileContents += `ReferenceNo\n`;
  fileContents += `Code\n`;
  fileContents += `Profile\n`;
  fileContents += `Color\n`;
  fileContents += `WarnOperator\n`;
  fileContents += `NumSides\n`;
  fileContents += `Qty\n`;
  fileContents += `Width\n`;
  fileContents += `Length\n`;
  fileContents += `Special Inst.\n`;
  fileContents += `CutMethod\n`;

  let ctr = 0;

  // console.log('selected: ', selected);
  selected = selected.sort((a: any, b: any) => {
    return (a.material < b.material) ? -1 : 1;
  })
  .sort((a: any, b: any) => {
    return (a.profile < b.profile) ? -1 : 1;
  });
  // console.log('sorted: ', selected);

  // Generate each cut file
  selected.forEach((item: any) => {
    // skip non-gaskets
    if (!item.material.startsWith('20-') && !item.material.startsWith('15-')) {
      return;
    }

    const profile = item.profile; // TODO: lookup profile # from material
    const color = 'gray';
    const warnOperator = 'false';
    const cutProcess = item.workflow?.cutMethod || 1;

    // Increment line counter
    ctr++;

    // Adjusted dimensions
    console.log(item.workflow?.cutOffset, item.workflow?.d2dCutOffset);
    let width: number = Number(item.dimensions?.width) + Number(item.workflow?.cutOffset);
    let length: number = Number(item.dimensions?.length) + Number(item.workflow?.cutOffset);
    if (item.dimensions.dart2dart && Number(item.dimensions.nSides) === 4) {
      width += Number(item.workflow?.d2dCutOffset);
      length += Number(item.workflow?.d2dCutOffset);
    }
    else if (item.dimensions.dart2dart && Number(item.dimensions.nSides) === 3) {
      width += Number(item.workflow?.d2dCutOffset);
      length += Number(item.workflow?.d2dCutOffset) / 2;
    }

    // Round dimensions down to nearest 1/8"
    width = roundDownToNearestEigth(width);
    length = roundDownToNearestEigth(length);

    // Add data to file contents
    fileContents += `${ctr}\n`;
    fileContents += `${item.order.ref}-${item.id}\n`;
    fileContents += `${item.order.code}\n`;
    fileContents += `${profile}\n`;
    fileContents += `${color}\n`;
    fileContents += `${warnOperator}\n`;
    fileContents += `${item.dimensions?.nSides}\n`;
    fileContents += `${item.quantity}\n`;
    fileContents += `${width}\n`;
    fileContents += `${length}\n`;
    fileContents += `${item.specialInstructions}\n`;
    fileContents += `${cutProcess}\n`;
  });

  // download
  const blob = new Blob([fileContents], {type: "text/plain"});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.setAttribute('download', fileName);
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}


const exportObject = {
  generateCutLists
};

export default exportObject;
