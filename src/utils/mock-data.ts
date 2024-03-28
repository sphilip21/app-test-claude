export function getMockOrder() {
  // get unix timestamp
  const ts = Math.round((new Date()).getTime() / 1000);
  const order = {
    "ref": `DEV-TEST-${ts}`,
    "code": "DEV-TEST",
    "promisedBy": 1673499600000,
    "items": [
      {
        "id": "TEST-ITEM-1",
        "description": "20-6449     24 3/4 X 22 1/4 MAG 4SC",
        "shipping": {
            "shipType": "Drop Ship",
            "method": "GROUND",
            "address": {
                "attn": "RECEIVINGS DEPT",
                "company": "REDACTED",
                "country": "USA",
                "city": "ORLANDO",
                "state": "FL",
                "postalCode": "12345",
                "note": ""
            }
        },
        "quantity": 4,
        "stations": {
            "cut": 0,
            "load": 0,
            "make": 0,
            "trim": 0,
            "preproduction": 4
        },
        "material": "15-6449-8",
        "magnet": true,
        "cutMethod": "unknown",
        "dimensions": {
            "length": "24.75",
            "width": "22.25",
            "nSides": "4",
            "roundedFeet": "8"
        },
        "specialInstructions": "",
        "legacy": {
            "InvoiceLineType": null,
            "InvoiceLineSeqNo": null,
            "InvoiceLineTxnLineID": null,
            "InvoiceLineItemRefListID": null,
            "InvoiceLineItemRefFullName": "15-6449-8 - 20-6449",
            "InvoiceLineDesc": "20-6449     24 3/4 X 22 1/4 MAG 4SC",
            "InvoiceLineQuantity": 4,
            "InvoiceLineQuantityShipped": 4,
            "InvoiceLineQuantityBackOrdered": 0,
            "InvoiceLineUnitOfMeasure": null,
            "InvoiceLineOverrideUOMSetRefListID": null,
            "InvoiceLineOverrideUOMSetRefFullName": null,
            "InvoiceLineRate": 16.94,
            "InvoiceLineRatePercent": 0,
            "InvoiceLinePriceLevelRefListID": null,
            "InvoiceLinePriceLevelRefFullName": null,
            "InvoiceLineClassRefListID": null,
            "InvoiceLineClassRefFullName": null,
            "InvoiceLineAmount": 67.76,
            "InvoiceLineServiceDate": null,
            "InvoiceLineSalesTaxCodeRefListID": null,
            "InvoiceLineSalesTaxCodeRefFullName": "",
            "InvoiceLineOverrideItemAccountRefListID": null,
            "InvoiceLineOverrideItemAccountRefFullName": null,
            "CustomFieldInvoiceLineOther1": "7.83",
            "CustomFieldInvoiceLineOther2": "",
            "CustomField1": null,
            "CustomField2": "22.25",
            "CustomField3": "24.75",
            "CustomField4": "4",
            "CustomField5": "8",
            "CustomField6": null,
            "CustomField7": null,
            "CustomField8": null,
            "CustomField9": null,
            "CustomField10": null,
            "InvoiceLineComment": "",
            "SpecialInstructions": "",
            "Dart2Dart_YN": false,
            "Added2Production": true,
            "SpecialOrderItem_YN": false,
            "IsReady_YN": null,
            "IsTrimmed_YN": true,
            "IsShipped_YN": true,
            "IsReady_Date": null,
            "IsTrimmed_Date": "2023-12-14T11:33:13.380Z",
            "IsShipped_Date": "2023-12-14T13:39:25.000Z",
            "IsReady_By": null,
            "IsTrimmed_By": "REDACTED",
            "IsShipped_By": "REDACTED",
            "ItemID": 2060
        },
        "name": "15-6449-8 - 20-6449",
        "profile": "449",
        "workflow": {
            "cutMethod": "1",
            "cutOffset": 0,
            "magnetId": "1240",
            "magMchNo": "2",
            "loadOffset": 0.5,
            "d2dCutOffset": 0,
            "d2dLoadOffset": 0
        }
    },
    ]
  };
  return order;
}
