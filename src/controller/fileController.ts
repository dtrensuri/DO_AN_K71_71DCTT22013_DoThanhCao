const { timeSheetDetail } = require("./sheet/attendanceSummarySheet.ts");
const ExcelJS = require("exceljs");
import { saveAs } from "file-saver";

const makeNameFile = (name: string) => {
  const now = new Date();
  const newName = name + "_" + now.getTime();
  return newName;
};

const exportDetailsTimeSheet = async (data: JSON) => {
  console.log(data);
  const workbook = new ExcelJS.Workbook();
  workbook.calcProperties.fullCalcOnLoad = true;
  const name: string = "Chi tiết tháng 7";
  await timeSheetDetail(data, name, workbook);
  const buf = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${makeNameFile("cham_cong")}.xlsx`);
};

const exportFileExcel = async (data: JSON) => {};

module.exports = {
  exportFileExcel,
  exportDetailsTimeSheet,
};
