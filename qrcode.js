function showQRCodeMaker(mysqlDate) {
 var krusovice = app.CreateDialog("Buat QR Code");
 krusovice.SetSize(1, 1);
 var parent = app.CreateLayout("Linear", "VCenter,fillXY");
 krusovice.AddLayout(parent);
 teks = sup.CreateTextEdit(mysqlDate || "",0.9, null, "floating");
 teks.SetHint("Data teks yang akan dimasukan QR Code");
 teks.SetTextColor("black");
 parent.AddChild(teks);
 btnBuat = app.CreateButton("Buat QRCode",0.6,0.08, "custom");
 btnBuat.SetOnTouch(buatQR);
 parent.AddChild(btnBuat);
 webQr = app.CreateButton(0.9,0.5, "IgnoreErrors progress");
 webQr.LoadUrl("c-qrcode.html");
 parent.AddChild(webQr);
 btnSimpan = app.CreateButton("Simpan",0.3,0.08, "custom");
 btnSimpan.SetOnTouch(saveQR);
 parent.AddChild(btnSimpan);
 btn = app.CreateButton("Print",0.3,0.08, "custom");
 btn.SetOnTouch(printQR);
 parent.AddChild(btn);
 krusovice.Show();
}
function buatQR() {
 sup.PlayAnim(this, "Bounce");
 var t = {};
 t.teks = teks.GetText();
 var e = 'document.querySelector("#NIS").innerHTML="' + t.teks + '";';
 webQr.Execute('jQuery(function(){jQuery("#output").qrcode(\'' + teks.GetText() + "');});" + e, null);
}
function saveQR() {
 sup.PlayAnim(this, "Bounce");
 webQr.Capture(baseFolder + "/" + teks.GetText() + ".png");
 app.SendText("QR Code  tersimpan pada folder kasir Net", "Bottom");
 webQr.LoadUrl("c-qrcode.html");
}
function printQR() {
 sup.PlayAnim(this, "Bounce");
 webQr.Print();
}
;