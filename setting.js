
function pengaturan() {
 app.CloseDrawer("left");
 var Modal = app.CreateDialog("Pengaturan");
 Modal.SetSize(1, 1);
 layDlg = app.CreateLayout("linear", "vertical,top,fillxy");
 layDlg.SetBackColor("");
 layDlg.SetPadding(0.03,0.05,0.03,0.01);
 Modal.AddLayout(layDlg);
 chBox = app.CreateCheckBox("Tetap simpan saat tidak terhubung printer",0.8,0.2);
 chBox.SetChecked(true);
 chBox.SetOnTouch(function(canCreateDiscussions) {
   if (canCreateDiscussions) {
     app.SaveBoolean("SimpanTanpaPrint", true);
   } else {
     app.SaveBoolean("SimpanTanpaPrint", false);
   }
   Modal.Dismiss();
 });
 layDlg.AddChild(chBox);
 if (app.LoadBoolean("SimpanTanpaPrint", false)) {
   chBox.SetChecked(true);
 } else {
   chBox.SetChecked(false);
 }
 btnSandi = app.CreateButton("Atur sandi saat edit stok",0.8,0.1, "custom");
 layDlg.AddChild(btnSandi);
 btnSandi.SetOnTouch(showSettingSandi);
 btnHeaderWarna = app.CreateButton("Header color",0.8,0.1, "custom");
 layDlg.AddChild(btnHeaderWarna);
 btnHeaderWarna.SetOnTouch(function() {
   picker.SetOnOk(gantiHeader);
   picker.SetTitle(app.LoadText("HeaderBack", ""));
   picker.Show();
 });
 btnBackWarna = app.CreateButton("Body color",0.8,0.1, "custom");
 layDlg.AddChild(btnBackWarna);
 btnBackWarna.SetOnTouch(function() {
   picker.SetOnOk(gantiBackground);
   picker.SetTitle(app.LoadText("layBack", ""));
   picker.Show();
 });
 btnTombolWarna = app.CreateButton("Warna tombol aplikasi",0.8,0.1, "custom");
 layDlg.AddChild(btnTombolWarna);
 btnTombolWarna.SetOnTouch(function() {
   picker.SetOnOk(gantiTombol);
   picker.SetTitle(app.LoadText("TombolBack", ""));
   picker.Show();
 });
 btnResetDB = app.CreateButton("Reset product",0.8,0.1, "custom");
 layDlg.AddChild(btnResetDB);
 btnResetDB.SetOnTouch(function() {
   conf = confirm("Anda yakin akan menghapus semua data produk?");
   if (1 == conf) {
     app.ShowProgress("Menghapus..");
     db.ExecuteSql("delete from produk");
     app.HideProgress();
     app.ShowPopup("Data berhasil dihapus");
   }
 });
 Modal.Show();
}
function gantiBackground(val, max, min) {
 var fn = picker.RGBtoHex(val, max, min);
 lay.SetBackColor(fn);
 layTengah1.SetBackColor(fn);
 layTengah2.SetBackColor(fn);
 layBawah.SetBackColor(fn);
 app.SaveText("layBack", fn);
 app.SaveText("layTengahBack", fn);
 app.SaveText("layBawahBack", fn);
}
function gantiTombol(val, format, type) {
 var value = picker.RGBtoHex(val, format, type);
 btnAddToStruk.SetBackColor(value);
 btnEditStruk.SetBackColor(value);
 btnBayar.SetBackColor(value);
 btnCari.SetBackColor(value);
 btnSend.SetBackColor(value);
 app.SaveText("TombolBack", value);
}
function gantiHeader(val, format, type) {
 var value = picker.RGBtoHex(val, format, type);
 layBar.SetBackColor(value);
 btnHelp.SetBackColor(value);
 btnMenu.SetBackColor(value);
 app.SaveText("HeaderBack", value);
}