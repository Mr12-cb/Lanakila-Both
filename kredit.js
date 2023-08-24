function showListNasabah() {
 db.ExecuteSql("select *  from nasabah order by nama asc limit 50", [], function(rslt) {
   dlgTxt = app.CreateDialog("Nasabah");
   dlgTxt.SetBackColor("white");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetPadding(0.02,0.01,0.02,0.01);
   layDlg.SetBackColor("white");
   dlgTxt.AddLayout(layDlg);
   txt = app.CreateTextEdit("", 1,0.08);
   txt.SetHint("Cari nasabah");
   txt.SetTextColor("Black");
   txt.SetOnChange(function() {
     db.ExecuteSql("select * from nasabah where nama like '" + this.GetText() + "%' order by nama;", [], function(rslt) {
       var selectId = "";
       var l = rslt.rows.length;
       var i = 0;
       for (; i < l ;i++) 
       {
         var option = rslt.rows.item(i);
         selectId = selectId + (option.id + ":") + option.nama + "," + option.alamat + ":null#";
       }
       lstStok.SetList(selectId, "#");
     });
   });
   layDlg.AddChild(txt);
   lstStok = app.CreateList("", 1,0.7, "MonoSpaced");
   lstStok.SetBackColor("black");
   lstStok.SetTextSize(18);
   lstStok.SetTextSize2(14);
   lstStok.SetPadding(0.01,0.03,0.01,0.02);
   lstStok.SetOnTouch(function(tooltip, canCreateDiscussions, isSlidingUp, dontForceConstraints) {
     lstPilihan = app.CreateListDialog("Aksi", "Lihat,Data Angsuran,Bayar,Hapus");
     lstPilihan.SetBackColor("black");
     lstPilihan.item = tooltip;
     lstPilihan.SetOnTouch(function(a) {
       if ("Lihat" == a) {
         lihatNasabah(lstPilihan.item);
       }
       if ("Data Angsuran" == a) {
         showListAngsuran(lstPilihan.item);
       }
       if ("Bayar" == a) {
         bayarNasabah(lstPilihan.item);
       }
       if ("Hapus" == a) {
         hapusNasabah(lstPilihan.item);
       }
       dlgTxt.Dismiss();
     });
     lstPilihan.Show();
   });
   layDlg.AddChild(lstStok);
   var selectId = "";
   var l = rslt.rows.length;
   var i = 0;
   for (; i < l; i++) {
     var option = rslt.rows.item(i);
     selectId = selectId + (option.id + ":") + option.nama + "," + option.alamat + ":null#";
   }
   lstStok.SetList(selectId, "#");
   btn = app.CreateButton("Tambah Nasabah",0.5,0.1);
   btn.SetOnTouch(function() {
     dlgTxt.Dismiss();
     tambahNasabah();
   });
   layDlg.AddChild(btn);
   dlgTxt.Show();
 });
}
function tambahNasabah() {
 app.CloseDrawer("left");
 var Modal = app.CreateDialog("Masukan data nasabah");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.03,0.05,0.03,0.01);
 Modal.AddLayout(layDlg);
 nama = sup.CreateTextEdit("",0.8, null, "floating,singleline");
 nama.SetHint("Nama");
 nama.SetTextColor("black");
 layDlg.AddChild(nama);
 alamat = sup.CreateTextEdit("",0.8, null, "floating,multiline");
 alamat.SetHint("Alamat");
 alamat.SetTextColor("black");
 layDlg.AddChild(alamat);
 kredit = sup.CreateTextEdit("",0.8, null, "Number,floating,multiline");
 kredit.SetHint("Total kredit");
 kredit.SetTextColor("black");
 layDlg.AddChild(kredit);
 btn = app.CreateButton("Simpan",0.8,0.1, "custom");
 btn.SetOnTouch(function() {
   n = nama.GetText();
   a = alamat.GetText();
   k = kredit.GetText();
   db.ExecuteSql("INSERT INTO nasabah(nama,alamat,kredit) VALUES (?,?,?)", [n, a, k], null, OnError);
   app.ShowPopup("Nasabah tersimpan");
   Modal.Dismiss();
   showListNasabah();
 });
 layDlg.AddChild(btn);
 Modal.Show();
}
function lihatNasabah(canCreateDiscussions) {
 db.ExecuteSql("select * from nasabah where id=" + canCreateDiscussions + ";", [], function(rslt) {
   var d = rslt.rows.item(0);
   var Modal = app.CreateDialog("Detail nasabah");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetPadding(0.03,0.05,0.03,0.01);
   Modal.AddLayout(layDlg);
   nama = sup.CreateTextEdit(d.nama,0.8, null, "floating,singleline");
   nama.SetHint("Nama");
   nama.SetTextColor("black");
   layDlg.AddChild(nama);
   alamat = sup.CreateTextEdit(d.alamat,0.8, null, "floating,multiline");
   alamat.SetHint("Alamat");
   alamat.SetTextColor("black");
   layDlg.AddChild(alamat);
   kredit = sup.CreateTextEdit(d.kredit,0.8, null, "Number,floating,multiline");
   kredit.SetHint("Total kredit");
   kredit.SetTextColor("black");
   layDlg.AddChild(kredit);
   btn = app.CreateButton("Simpan",0.8,0.1, "custom");
   btn.SetOnTouch(function() {
     n = nama.GetText();
     a = alamat.GetText();
     k = kredit.GetText();
     db.ExecuteSql("Update nasabah set nama='" + n + "',alamat='" + a + "',kredit='" + k + "' where id=" + canCreateDiscussions + ";", [], null, OnError);
     app.ShowPopup("Berhasil memperbarui");
     Modal.Dismiss();
     showListNasabah();
   });
   layDlg.AddChild(btn);
   Modal.Show();
 });
}
function bayarNasabah(a) {
 nas = a;
 tgl = tanggalSekarang() + "," + jamSekarang();
 var Modal = app.CreateDialog("Pembayaran kredit");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.03,0.05,0.03,0.01);
 Modal.AddLayout(layDlg);
 nominal = sup.CreateTextEdit("",0.8, null, "Number,floating,singleline");
 nominal.SetHint("Nominal");
 nominal.SetTextColor("black");
 layDlg.AddChild(nominal);
 metode = app.CreateSpinner("Cash,Transfer",0.8,0.1);
 layDlg.AddChild(metode);
 btn = app.CreateButton("Simpan",0.8,0.1, "custom");
 btn.SetOnTouch(function() {
   nom = nominal.GetText();
   met = metode.GetText();
   db.ExecuteSql("INSERT INTO setoran (nasabah, tanggal, jumlah, metode) VALUES (?,?,?,?)", [nas, tgl, nom, met], function() {
     Modal.Dismiss();
     app.ShowPopup("Pembayaran disimpan");
   }, OnError);
 });
 layDlg.AddChild(btn);
 Modal.Show();
}
function hapusNasabah(a) {
 if (1 == confirm("Anda akan menghapus nasabah ini?")) {
   db.ExecuteSql("delete from nasabah where id=" + a + ";", [], function(a) {
     app.ShowPopup("Nasabah dihapus");
     showListNasabah();
   });
 } else {
   showListNasabah();
 }
}
function showListAngsuran(a) {
 db.ExecuteSql("select setoran.*,nasabah.kredit from setoran INNER JOIN nasabah ON setoran.nasabah=nasabah.id where setoran.nasabah=" + a + ";", [], function(rslt) {
   dlgTxt = app.CreateDialog("Angsuran");
   dlgTxt.SetBackColor("white");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetPadding(0.02,0.01,0.02,0.01);
   layDlg.SetBackColor("white");
   dlgTxt.AddLayout(layDlg);
   lst = app.CreateList("", 1,0.7, "MonoSpaced");
   lst.SetBackColor("black");
   lst.SetTextSize(16);
   lst.SetPadding(0.01,0.03,0.01,0.02);
   lst.SetOnTouch(function(tooltip, canCreateDiscussions, isSlidingUp, dontForceConstraints) {
     lstPilihan = app.CreateListDialog("Aksi", "Lihat,Hapus");
     lstPilihan.SetBackColor("black");
     lstPilihan.item = tooltip;
     lstPilihan.SetOnTouch(function(a) {
       if ("Lihat" == a) {
         lihatAngsuran(lstPilihan.item);
       }
       if ("Hapus" == a) {
         hapusAngsuran(lstPilihan.item);
       }
       dlgTxt.Dismiss();
     });
     lstPilihan.Show();
   });
   layDlg.AddChild(lst);
   var loading = "";
   var imagesLen = rslt.rows.length;
   if (imagesLen < 1) {
     return app.ShowPopup("Belum ada setoran"), false;
   }
   totalSetor = 0;
   var j = 0;
   for (; j < imagesLen; j++) {
     var file = rslt.rows.item(j);
     totalSetor = totalSetor + file.jumlah;
     loading = loading + (file.id + ":") + file.tanggal.replace(/:/g, "^c^") + "= Rp " + file.jumlah.toLocaleString() + ":null#";
   }
   lst.SetList(loading, "#");
   var cssIncrement = "Total kredit =Rp " + file.kredit.toLocaleString() + ".\nSudah setor " + j + " kali. \nTotal sudah disetor= Rp " + totalSetor.toLocaleString() + "\nMasih kurang = Rp " + (file.kredit - totalSetor).toLocaleString();
   teks = app.CreateText(cssIncrement,0.9,0.3, "multiline,left");
   teks.SetTextColor("black");
   layDlg.AddChild(teks);
   dlgTxt.Show();
 }, OnError);
}
function lihatAngsuran(a) {
 db.ExecuteSql("select setoran.*,nasabah.nama, nasabah.alamat from setoran INNER JOIN nasabah ON setoran.nasabah=nasabah.id where setoran.id=" + a + ";", [], function(rslt) {
   dlgTxt = app.CreateDialog("Detail angsuran");
   dlgTxt.SetBackColor("white");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetPadding(0.02,0.01,0.02,0.01);
   layDlg.SetBackColor("white");
   dlgTxt.AddLayout(layDlg);
   rslt.rows.length;
   var b = rslt.rows.item(0);
   var cssIncrement = b.tanggal + ".\n\n\nDari     : " + b.nama + " \nAlamat   : " + b.alamat + " \nJumlah   : Rp " + b.jumlah.toLocaleString() + " \nMetode   : " + b.metode + "\n";
   teks = app.CreateText(cssIncrement,0.9,0.6, "multiline,left,MonoSpaced");
   teks.SetTextColor("black");
   layDlg.AddChild(teks);
   dlgTxt.Show();
 }, OnError);
}
function hapusAngsuran(a) {
 if (1 == confirm("Anda akan menghapus data  ini?")) {
   db.ExecuteSql("delete from setoran where id=" + a + ";", [], function(a) {
     app.ShowPopup("Berhasil dihapus");
     qaqlqqaqaaqao;
   });
 }
}