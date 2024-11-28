import { utils, writeFile } from "xlsx";

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

export function readExcelData() {}
