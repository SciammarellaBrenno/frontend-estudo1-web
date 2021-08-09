function TableToExcel(table: any, worksheet?: string) {
    const uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>{table}</body></html>'
      , base64 = function(s: string) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function(s: string, c: any) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
      
   if (!table.nodeType) {
      table = document.getElementById(table)!.querySelectorAll('div')[0];
   }

   const ctx = {worksheet: worksheet || 'Resultado', table: table.innerHTML};

   return window.location.href = uri + base64(format(template, ctx));
}

function JSONToCSVConvertor(JSONData: JSON, ReportTitle: string, ShowLabel: boolean) {
   
   var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

   var CSV = '';

   //CSV += ReportTitle + '\r\n\n';

   if (ShowLabel) {
       var row = "";

       for (var index in arrData[0]) {

           row += index + ';';
       }

       row = row.slice(0, -1);

       CSV += row + '\r\n';
   }

   //1st loop is to extract each row
   for (var i = 0; i < arrData.length; i++) {
       var row = "";

       //2nd loop will extract each column and convert it in string comma-seprated
       for (var index in arrData[i]) {
         // row += arrData[i][index] + ';';
         row += arrData[i][index] == null ? ';' : arrData[i][index] + ';';
       }

       row.slice(0, row.length - 1);

       CSV += row + '\r\n';
   }

   if (CSV == '') {
       alert("Invalid data");
       return;
   }

   var fileName = "Excel_";

   fileName += ReportTitle.replace(/ /g,"_");

   //csv or xls
   var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

   var link = document.createElement("a");
   link.href = uri;

   
   //link.style = "visibility:hidden";
   link.download = fileName + ".csv";

   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
}

function TrataDateTime(data: String) : string {
   return data.replace(/-/g, '\/').replace('T',' ');
}

function AnoMesDia(data: Date): string {
   const mm = data.getMonth() + 1;
   const dd = data.getDate();

   return isNaN(mm) ? '' : [data.getFullYear(),
           (mm>9 ? '' : '0') + mm,
           (dd>9 ? '' : '0') + dd
           ].join('-');
};

function DiaMesAno(data: Date): string {
   const mm = data.getMonth() + 1;
   const dd = data.getDate();
   
   return isNaN(mm) ? '' : [(dd>9 ? '' : '0') + dd,
           (mm>9 ? '' : '0') + mm,
           data.getFullYear()
           ].join('/');
};

function DiaMesAnoHora(data: Date) {
   const mm = data.getMonth() + 1;
   const dd = data.getDate();
   
   const novaData = isNaN(mm) ? '' : [(dd>9 ? '' : '0') + dd,
           (mm>9 ? '' : '0') + mm,
           data.getFullYear()
           ].join('/');

   const novaHora = data.toLocaleTimeString().substring(0, 5);

   return `${novaData} ${novaHora}`;
};

export { TableToExcel, TrataDateTime, AnoMesDia, DiaMesAno, DiaMesAnoHora, JSONToCSVConvertor }