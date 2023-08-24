
function pilihPrinter() {
 if (sup.PlayAnim(this, "Bounce"), app.ShowProgress(), 1 == app.IsBluetoothOn()) {
   app.HideProgress();
   var group = app.CreateDialog("Pilih Printer");
   group.SetBackColor("white");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetPadding(0.01, 0,0.01,0.01);
   layDlg.SetBackColor("white");
   group.AddLayout(layDlg);
   lst = app.CreateList("",0.9,0.4);
   lst.SetBackColor("black");
   lst.SetOnTouch(lst_OnTouch);
   layDlg.AddChild(lst);
   var arr = app.GetPairedBTDevices();
   for (;d in arr;) {
     lst.AddItem(arr[d].name, arr[d].address);
   }
   txt = "Diatas adalah daftar perangkat bluetooth yang sudah dipasangkan dengan hp ini, Jika printer bluetooth Anda tidak tampak pada daftar diatas maka silahkan pasangkan terlebih dulu. Caranya :  Masuk setting HP, bluetooth -> segarkan -> pasangkan printer. ";
   txtH = app.CreateText(txt,0.9,0.4, "multiline,left,bold");
   txtH.SetPadding(0.05,0.03,0.04,0.04);
   layDlg.AddChild(txtH);
   group.Show();
 } else {
   if ( 0 == app.IsBluetoothOn()) {
     if (app.SetBluetoothEnabled(true), 1 == app.IsBluetoothOn()) {
       for (d in app.HideProgress(), (group = app.CreateDialog("Pilih Printer")).SetBackColor("white"), layDlg = app.CreateLayout("linear", "vertical,fillxy,left"), layDlg.SetPadding(0.01, 0,0.01,0.01), layDlg.SetBackColor("white"), group.AddLayout(layDlg), lst = app.CreateList("",0.9,0.4), lst.SetBackColor("black"), lst.SetOnTouch(lst_OnTouch), layDlg.AddChild(lst), arr = app.WifiConnect()) {
         lst.AddItem(arr[d].name, arr[d].address);
       }
       txt = "Diatas adalah daftar perangkat bluetooth yang sudah dipasangkan dengan hp ini, Jika printer bluetooth Anda tidak nampak pada daftar diatas maka silahkan pasangkan lebih dulu. Caranya :  Masuk setting hp, bluetooth -> segarkan -> pasangkan printer";
       txtH = app.CreateText(txt,0.9,0.4, "multiline,left,bold");
       txtH.SetPadding(0.05,0.03,0.04,0.04);
       layDlg.AddChild(txtH);
       group.Show();
     }
   }
 }
 setTimeout("app.HideProgress();", 5e3);
}
function lst_OnTouch(useThisHtml, html, bNoPrepare, sendmsg) {
 app.ShowProgress("Menyambungkan...");
 bt.Connect(html);
 lst.SelectItemByIndex(sendmsg);
}
function bt_OnConnect(a) {
 app.HideProgress();
 if (a) {
   app.SendText("Terhubung");
 } else {
   app.SendText("Gagal Menyambungkan");
   lst.SelectItemByIndex(-1);
 }
}
function btnSend_OnTouch() {
 if (sup.PlayAnim(this, "Bounce"), "" == bodi) {
   return app.SendText("Belum ada pembelian"), false;
 }
 if (0 == app.LoadBoolean("Dibayar", false)) {

    db.ExecuteSql("INSERT INTO " + dbSekarang + " (data_struk,total,profit) VALUES (?,?,?)", [edt.GetText(), Tot, strukProfit], null, OnError);
 db.ExecuteSql("DELETE FROM penjualan");
 buatStruk("...", 0);
 app.ShowPopup("Data penjualan berhasil dikirim ke kasir");
 app.SaveBoolean("Dibayar", false);
 
 } else {
   if (0 == bt.IsConnected() && 0 == app.LoadBoolean("SimpanTanpaPrint", false)) {
     return app.SendText("Tidak ada  printer yang terhubung. Masuk pengaturan untuk tetap menyimpan saat tidak terhubung printer.", "long"), false;
   }
   bt.Write(edt.GetText());
 }
 db.ExecuteSql("INSERT INTO " + dbSekarang + " (data_struk,total,profit) VALUES (?,?,?)", [edt.GetText(), Tot, strukProfit], null, OnError);
 db.ExecuteSql("DELETE FROM penjualan");
 buatStruk("...", 0);
 app.ShowPopup("Data penjualan berhasil dikirim ke kasir");
 app.SaveBoolean("Dibayar", false);
}
function bt_OnReceive(cssIncrement) {
 app.SendText(cssIncrement);
}
function printBiasa() {
 app.CloseDrawer("left");
 dlgTxt = app.CreateDialog("Masukan Teks");
 layDlg = app.CreateLayout("linear", "vertical,fillxy");
 layDlg.SetPadding(0.02, 0,0.01,0.01);
 dlgTxt.AddLayout(layDlg);
 teks = app.CreateTextEdit(app.LoadText("TeksPrintBiasa", "Teks yang akan diprint"), 1,0.8, "multiline,monospace");
 teks.SetHint("Teks yang akan di print");
 layDlg.AddChild(teks);
 layH = app.CreateLayout("Linear", "Horizontal");
 layDlg.AddChild(layH);
 btnCtk = app.CreateButton("Cetak",0.4,0.08, "custom");
 btnCtk.SetOnTouch(function() {
   if (sup.PlayAnim(this, "Bounce"), "" == teks.GetText()) {
     return app.ShowPopup("Masukan teks"), false;
   }
   if (null != usb && usb.IsConnected()) {
     usb.Write(teks.GetText() + "\n");
   } else {
     if (0 == bt.IsConnected()) {
       app.ShowPopup("Tidak ada  printer yang terhubung", "long");
     } else {
       bt.Write(teks.GetText());
     }
   }
   app.SaveText("TeksPrintBiasa", teks.GetText());
 });
 layH.AddChild(btnCtk);
 btnPilihTemplate = app.CreateButton("Pilih Format",0.4,0.08, "custom");
 btnPilihTemplate.SetOnTouch(function() {
   sup.PlayAnim(this, "Bounce");
   dlgTxt = app.CreateDialog("Pilih template");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetPadding(0.02,0.01,0.02,0.01);
   dlgTxt.AddLayout(layDlg);
   lst = app.CreateList("",0.8,0.6);
   lst.SetOnTouch(function(a, canCreateDiscussions, isSlidingUp, dontForceConstraints) {
     db.ExecuteSql("select * from template where id='" + a + "';", [], function(rslt) {
       var c = rslt.rows.item(0);
       teks.SetText(c.format);
       dlgTxt.Dismiss();
     }, OnError);
   });
   lst.SetOnLongTouch(function(a, canCreateDiscussions, isSlidingUp, dontForceConstraints) {
     db.ExecuteSql("delete from template where id='" + a + "';", [], function(a) {
       app.ShowPopup("Berhasil dihapus");
       dlgTxt.Dismiss();
     }, OnError);
   });
   layDlg.AddChild(lst);
   db.ExecuteSql("select * from template order by id asc limit 50", [], function(rslt) {
     var i = "";
     var ind = 0;
     for (; ind < rslt.rows.length; ind++) 
     {
       var d = rslt.rows.item(ind);
       i = i + (d.id + ":") + d.nama + ":null#";
       lst.SetList(i, "#");
     }
     var umgRoot = app.CreateButton("Tambah Template",0.8,0.08, "Custom");
     umgRoot.SetOnTouch(addTemplate);
     layDlg.AddChild(umgRoot);
     dlgTxt.Show();
  },OnError);
 });
 
 layH.AddChild(btnPilihTemplate);
 dlgTxt.Show();

}
function addTemplate() {
 sup.PlayAnim(this, "Bounce");
 dlgTxt = app.CreateDialog("Tambah template");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.02,0.01,0.02,0.01);
 dlgTxt.AddLayout(layDlg);
 titleTemplate = app.CreateTextEdit("", 1,0.08, "multiline,monospace");
 titleTemplate.SetHint("Nama");
 layDlg.AddChild(titleTemplate);
 teksTemplate = app.CreateTextEdit("", 1,0.7, "multiline,monospace");
 teksTemplate.SetHint("Teks yang akan dicetak");
 layDlg.AddChild(teksTemplate);
 btnSave = app.CreateButton("Simpan",0.4,0.08, "custom");
 btnSave.SetOnTouch(function() {
   sup.PlayAnim(this, "Bounce");
   db.ExecuteSql("INSERT INTO template (nama, format) VALUES (?,?)", [titleTemplate.GetText(), teksTemplate.GetText()], null, OnError);
   app.ShowPopup("Berhasil ditambahkan");
 });
 layDlg.AddChild(btnSave);
 dlgTxt.Show();
}