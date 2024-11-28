import { utils, writeFile, read } from "xlsx";

interface Columns {
  key: string;
  title: string;
}

interface DataItem {
  readonly id: string;
  [propName: string]: string;
}

function buildTitle(xlsxTemp: Array<Columns>) {
  const res: string[][] = [];
  const titleList: string[] = [];
  xlsxTemp.forEach((column: Columns) => {
    titleList.push(column.title);
  });
  res.push(titleList);
  return res;
}

function writeXlsxFile(res: string[][], xlsxName: string, sheetName: string) {
  const workSheet = utils.aoa_to_sheet(res);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, sheetName);
  writeFile(workBook, `${xlsxName}.xlsx`);
}

export function buildExcelTemp(
  xlsxTemp: Array<Columns>,
  xlsxName: string,
  sheetName: string
) {
  // 设置标题
  const res: string[][] = buildTitle(xlsxTemp);
  writeXlsxFile(res, xlsxName, sheetName);
}

export function exportExcelData(
  xlsxTemp: Array<Columns>,
  exportData: Array<any>,
  xlsxName: string,
  sheetName: string
) {
  const res: string[][] = buildTitle(xlsxTemp);
  // handle Data
  exportData.map((item: DataItem) => {
    const arr = [];
    xlsxTemp.forEach((column: Columns) => {
      arr.push(item[column.key]);
    });
    res.push(arr);
  });
  writeXlsxFile(res, xlsxName, sheetName);
}

export async function readExcelData(
  excelTemp: Array<Columns>,
  file?: Blob
): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const excelData = await utils.sheet_to_json(worksheet);
        const result = [];
        // title 转化为 字段
        excelData.map((item: DataItem) => {
          const newItem = {};
          excelTemp.forEach((column: Columns) => {
            newItem[column.key] = item[column.title];
          });
          result.push(newItem);
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = error => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
}
