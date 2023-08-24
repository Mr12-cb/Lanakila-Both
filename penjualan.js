function lihatDataPenjualan() {
 app.CloseDrawer("left");
 db.ExecuteSql("SELECT name FROM sqlite_master WHERE type ='table' AND name!='android_metadata' AND name!= 'produk' AND name!='penjualan' AND name!='template';", [], function(l) {
   var Modal = app.CreateDialog("Pilih data penjualan");
   Modal.SetBackColor("white");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetPadding(0.02,0.03,0.02,0.01);
   layDlg.SetBackColor("white");
   Modal.AddLayout(layDlg);
   lstTabel = app.CreateList("", 1,0.75);
   lstTabel.SetBackColor("");
   lstTabel.SetTextSize(18);
   lstTabel.SetOnTouch(lihatPenjualan);
   lstTabel.SetOnLongTouch(function(lbit_id) {
     if (1 == confirm("Hapus data penjualan tanggal ini?")) {
       db.ExecuteSql("DROP TABLE " + lbit_id);
       app.ShowPopup("Data berhasil dihapus");
       Modal.Dismiss();
     }
   });
   layDlg.AddChild(lstTabel);
   var str = "";
   var e = l.rows.length;
   var c = 0;
   for (; c < e; c++) {
     item = l.rows.item(c);
     str = str + (item.name + "#");
   }
   lstTabel.SetList(str, "#");
   teks = app.CreateText("Sentuh untuk melihat rincian, sentuh yang lama untuk menghapus",0.8,0.15, "multiline");
   layDlg.AddChild(teks);
   teks.SetTextColor("black");
   Modal.Show();
 });
}
function lihatPenjualan(schedule) {
 tgl = schedule;
 db.ExecuteSql("SELECT * FROM " + schedule + " order by id asc;", [], function(t) {
   var strToolTip = "";
   var changedFeatureCount = 0;
   var value = 0;
   var z = t.rows.length;
   var name = 0;
   for (; name < z; name++) {
     strToolTip = strToolTip + "Struk ke " + (schedule = t.rows.item(name)).id + " =  Rp " + schedule.total.toLocaleString() + "#";
     changedFeatureCount = changedFeatureCount + schedule.total;
     value = value + (schedule.profit || 0);
   }
   var group = app.CreateDialog(tgl.replace(/_/g, "/"));
   group.SetBackColor("white");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetPadding(0.02,0.03,0.02,0.01);
   layDlg.SetBackColor("white");
   group.AddLayout(layDlg);
   var Engine = app.CreateText(name + " struk, omset Rp " + changedFeatureCount.toLocaleString() + ",Profit= " + value.toLocaleString(),0.9,0.1);
   Engine.SetTextColor("black");
   layDlg.AddChild(Engine);
   lstPenjualan = app.CreateList("",0.9,0.7);
   lstPenjualan.SetBackColor("");
   lstPenjualan.SetTextSize(18);
   lstPenjualan.SetOnTouch(lihatDetailStruk);
   layDlg.AddChild(lstPenjualan);
   lstPenjualan.SetList(strToolTip, "#");
   group.Show();
 });
}
function lihatDetailStruk(l) {
 var t = l.split(" ")[2];
 db.ExecuteSql("SELECT profit,data_struk FROM " + tgl + " where id=" + t + ";", [], function(pgrid) {
   detailStruk = pgrid.rows.item(0).data_struk;
   var group = app.CreateDialog("Detail Struk ke  " + t + ", Profit :" + pgrid.rows.item(0).profit.toLocaleString());
   group.SetBackColor("white");
   layDlg = app.CreateLayout("linear", "VCenter,fillxy,");
   layDlg.SetPadding(0.02,0.03,0.02,0.01);
   layDlg.SetBackColor("white");
   group.AddLayout(layDlg);
   scroll = app.CreateScroller(0.9,0.7);
   layDlg.AddChild(scroll);
   layScroll = app.CreateLayout("Linear", "VCenter,fillXY");
   layScroll.SetBackColor("silver");
   scroll.AddChild(layScroll);
   var c = app.CreateTextEdit(detailStruk,0.9, 3, "multiline,left,NoSpell");
   c.SetEnabled(false);
   c.SetTextColor("black");
   c.SetTextSize(14);
   layScroll.AddChild(c);
   btnCtk = app.CreateButton("Cetak",0.8,0.1, "custom");
   btnCtk.SetOnTouch(function() {
     if (null != usb && usb.IsConnected()) {
       usb.Write(c.GetText() + "\n");
     } else {
       if (0 == bt.IsConnected()) {
         app.ShowPopup("Tidak ada  printer yang terhubung", "long");
       } else {
         bt.Write(c.GetText());
       }
     }
   });
   layDlg.AddChild(btnCtk);
   group.Show();
 });
}