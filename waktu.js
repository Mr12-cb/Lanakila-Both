
function tanggalSekarang() {
 return d = new Date
  myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
   nowDay = myDays[d.getDay()]
   tglSekarang = nowDay + ", " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    tglSekarang;
}
function jamSekarang() {
 var startDatetime = new Date;
 var m = startDatetime.getHours();
 var h = startDatetime.getMinutes();
 var s = startDatetime.getSeconds();
 return 0 == m && (m = 12), (m = checkTime(m)) + ":" + (h = checkTime(h)) + ":" + (s = checkTime(s));
}
function checkTime(i) {
 return i < 10 && (i = "0" + i), i;
}
function cekExpired(lanName) {
 var a = Number(lanName.split("-")[0]);
 var month = Number(lanName.split("-")[1]) - 1;
 var dayNumber = Number(lanName.split("-")[2]);
 var r = (new Date(a, month, dayNumber)).getTime() - (new Date).getTime();
 var candidatesWidth = Math.round(r / 1000/ 60 / 60);
 return {
   SisaWaktu : Math.floor(candidatesWidth / 24) + " hari, " + (candidatesWidth % 24 + 24) % 24 + " jam",
   SisaJam : candidatesWidth
 }
}
function nowAddDays(gearTypeId) {
 var a = new Date;
 var t = a.getDate();
 var value = a.getMonth() + 1;
 var x = a.getFullYear();
 t = t + gearTypeId;
 for (; t > 30; ) {
   t = t - 30;
   if ((value = value + 1) > 11) {
     x = x + 1;
     value = value - 12;
   }
 }
 return x + "-" + value + "-" + t;
}